from datetime import datetime, timedelta
from typing import List, Tuple
from sqlalchemy import func, select, orm
from sqlalchemy.dialects.postgresql import JSONB

from core.modules.auth.entities.user import User
from core.modules.flight.entites.city import Airport, City
from core.modules.flight.entites.flight import Flight, FlightSeat, UserFlight
from core.modules.flight.entites.plane import Plane, Seat
from infrastructure.common.database.sqlalchemy_models import AirportModel, CityModel, FlightModel, FlightSeatModel, PlaneModel, SeatModel, UserFlightModel
from infrastructure.common.impls.repository_impl import RepositoryImpl



class FlightRepositoryImpl(RepositoryImpl[FlightModel, Flight]): 
    def __init__(self, session):
        super().__init__(FlightModel, Flight, session)


    async def get_flights_by_cities(
        self, 
        departure_city_id: int | None, 
        arrival_city_id: int | None, 
        date: datetime, 
    ):
        from core.modules.flight.entites.city import Airport

        DepartureAirport = orm.aliased(AirportModel)
        ArrivalAirport = orm.aliased(AirportModel)
        
        query = (
            select(FlightModel, DepartureAirport, ArrivalAirport)
            .join(DepartureAirport, FlightModel.departure_id == DepartureAirport.id)
            .join(ArrivalAirport, FlightModel.arrival_id == ArrivalAirport.id)
            .where(
                DepartureAirport.city_id == (departure_city_id or 0),
                ArrivalAirport.city_id == (arrival_city_id or 0),
                FlightModel.departure_time >= date.date(),
                FlightModel.departure_time < date.date() + timedelta(days=1)
            )
        )
        rows = (await self.session.execute(query)).all()
        result: List[Flight] = []
        for row in rows:
            (
                flight,
                departure_aip,
                arrival_aip,
            ) = row 

            departure_aip_entity = Airport(
                id = departure_aip.id,
                name = departure_aip.name,
                created_at = departure_aip.created_at,
                code = departure_aip.code,
                city = departure_aip.city_id
            )
            arrival_aip_entity = Airport(
                id = arrival_aip.id,
                name = arrival_aip.name,
                created_at = arrival_aip.created_at,
                code = arrival_aip.code,
                city = arrival_aip.city_id
            )
            flight_entity = self._to_entity(flight)
            flight_entity.arrival = arrival_aip_entity
            flight_entity.departure = departure_aip_entity

            result.append(flight_entity)

        return result


    async def get_flight_with_seats(self, flight_id: int) -> Tuple[Flight, List[FlightSeat]]:
        DepartureAirport = orm.aliased(AirportModel)
        ArrivalAirport = orm.aliased(AirportModel)

        SQL = (
            select(
                FlightModel,
                SeatModel,
                FlightSeatModel,
                DepartureAirport, 
                ArrivalAirport,
                PlaneModel
            )
            .join(PlaneModel, PlaneModel.id == FlightModel.plane_id)
            .join(DepartureAirport, FlightModel.departure_id == DepartureAirport.id)
            .join(ArrivalAirport, FlightModel.arrival_id == ArrivalAirport.id)
            .join(FlightSeatModel, FlightModel.id == FlightSeatModel.flight_id)
            .join(SeatModel, SeatModel.id == FlightSeatModel.seat_id)
            .where(FlightModel.id == int(flight_id))
        )
        
        rows = (await self.session.execute(SQL)).all()
    
        flight = self._to_entity(rows[0][0])
        flight.arrival = self._to_custom_entity(rows[0][4], Airport)
        flight.departure = self._to_custom_entity(rows[0][3], Airport)
        flight.plane = self._to_custom_entity(rows[0][5], Plane)

        flight_seats = []
        for row in rows:
            seat_entity = self._to_custom_entity(row[1], Seat)
            flight_seat_entity = self._to_custom_entity(row[2], FlightSeat)
            flight_seat_entity.seat = seat_entity
            flight_seats.append(flight_seat_entity)

        return flight, sorted(flight_seats, key=lambda s: s.id)


    async def get_flights_with_relations(self) -> List[Flight]:
        arr_aip = orm.aliased(AirportModel)
        dep_aip = orm.aliased(AirportModel)
        arr_city = orm.aliased(CityModel)
        dep_city = orm.aliased(CityModel)

        SQL = (
            select(FlightModel, arr_aip, arr_city, dep_aip, dep_city, PlaneModel)
            .join(arr_aip, arr_aip.id == FlightModel.arrival_id)
            .join(dep_aip, dep_aip.id == FlightModel.departure_id)
            .join(arr_city, arr_city.id == arr_aip.city_id)
            .join(dep_city, dep_city.id == dep_aip.city_id)
            .join(PlaneModel, PlaneModel.id == FlightModel.plane_id)
        )

        res = (await self.session.execute(SQL)).all()
        flights: List[Flight] = []
        for row in res:
            arrival_city = self._to_custom_entity(row[2], City)
            departure_city = self._to_custom_entity(row[4], City)
            arrival_airport = self._to_custom_entity(row[1], Airport)
            departure_airport = self._to_custom_entity(row[3], Airport)
            flight = self._to_entity(row[0])
            plane = self._to_custom_entity(row[5], Plane)
            arrival_airport.city = arrival_city
            departure_airport.city = departure_city
            flight.plane = plane
            flight.departure = departure_airport
            flight.arrival = arrival_airport
            flights.append(flight)

        return flights




class FlightSeatRepositoryImpl(RepositoryImpl[FlightSeatModel, FlightSeat]):
    def __init__(self, session):
        super().__init__(FlightSeatModel, FlightSeat, session)
        

        
    
    async def get_tickets_list(self) -> List[FlightSeat]:
        # return list(await self.model.select().where(self.model.is_occupied == True).aio_execute(self.database))
        return []




class UserFlightRopositoryImpl(RepositoryImpl[UserFlightModel, UserFlight]):
    def __init__(self, session):
        super().__init__(UserFlightModel, UserFlight, session)


    async def get_paginate_revenue(self,) -> Tuple[int, int]:
        query = (
            select(func.sum(FlightSeatModel.price).label('revenue'), func.count(UserFlightModel.id).label('paginate'))
            .join(FlightSeatModel, UserFlightModel.flight_seat_id == FlightSeatModel.id)
        )

        res = (await self.session.execute(query)).one()
        return res.revenue or 0, res.paginate or 0


    async def get_user_flights(self, user_id: int | None):
        departure_al = orm.aliased(AirportModel)
        arrival_al = orm.aliased(AirportModel)

        SQL = (
            select(UserFlightModel, FlightSeatModel, FlightModel, arrival_al, departure_al, PlaneModel)
            .join(FlightSeatModel, UserFlightModel.flight_seat_id == FlightSeatModel.id)
            .join(FlightModel, FlightSeatModel.flight_id == FlightModel.id)
            .join(arrival_al, arrival_al.id == FlightModel.arrival_id)
            .join(departure_al, departure_al.id == FlightModel.departure_id)
            .join(PlaneModel, PlaneModel.id == FlightModel.plane_id)
            .where(UserFlightModel.user_id == (user_id or 0))
        )

        res = (await self.session.execute(SQL)).all()

        flights: List[UserFlight] = []

        for row in res:
            flight = self._to_custom_entity(row[2], Flight)
            flight_seat = self._to_custom_entity(row[1], FlightSeat)
            arrival = self._to_custom_entity(row[3], Airport)
            departure = self._to_custom_entity(row[4], Airport)
            plane = self._to_custom_entity(row[5], Plane)
            flight.plane = plane
            flight.arrival = arrival
            flight.departure = departure
            flight_seat.flight = flight
            user_flight = self._to_entity(row[0])
            user_flight.flight_seat = flight_seat

            flights.append(user_flight)

        return flights

