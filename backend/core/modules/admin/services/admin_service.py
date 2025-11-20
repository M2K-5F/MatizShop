from datetime import datetime
from core.modules.auth.entities import user
from core.modules.auth.services.auth import AuthService
from core.modules.flight.entites import flight
from core.modules.flight.entites.city import City
from core.modules.flight.services.flight_service import FlightService


class AdminService():
    def __init__(
            self,
            auth_service: AuthService,
            flight_service: FlightService
    ):
        self.auth_s = auth_service
        self.flight_s = flight_service

    
    async def get_summary_info(self):
        users_count = await self.auth_s.get_users_count()
        flights_count = await self.flight_s.get_flights_count()
        tickets_list = list(map(lambda e: getattr(e, 'flight_seat'), await self.flight_s.get_tickets_list()))
        tickets_count = tickets_list.__len__()
        total_revenue = sum(map(lambda e: getattr(e, 'price'), tickets_list))

        return {
            "users_count": users_count,
            "flights_count": flights_count,
            "tickets_count": tickets_count,
            "total_revenue": total_revenue
        }
    
    
    async def get_user_info(self):
        return await self.auth_s.get_admin_list()
    

    async def get_flights_info(self):
        return [flight.to_dict(2) for flight in await self.flight_s.get_flights_info()]
    

    async def get_airports_by_city(self, city_tag: str):
        return [ap.to_dict() for ap in await self.flight_s.get_airports_by_city(city_tag)]
    

    async def create_flight(self, flight_data):
        departure_aip = await self.flight_s.airport_repo.get_by_id(flight_data.departure_airport_id, True)
        arrival_aip = await self.flight_s.airport_repo.get_by_id(flight_data.arrival_airport_id, True)
        plane = await self.flight_s.plane.get_by_id(flight_data.plane_id, True)
        created_flight = await self.flight_s.flight_repo.get_or_create(
            True, {},
            tag=flight_data.tag,
            departure=departure_aip,
            arrival = arrival_aip,
            departure_time = flight_data.departure_time,
            arrival_time = flight_data.arrival_time,
            duration = flight_data.arrival_time - flight_data.departure_time,
            min_price = flight_data.min_price,
            seats_left = plane.economy_class_count + plane.business_class_count,
            plane = plane,
            allowed_business = flight_data.allowed_business
        )

        business_seats = await self.flight_s.seat.select(
            plane=plane,
            seat_class="BUSINESS"
        )

        economy_seats = await self.flight_s.seat.select(
            plane=plane,
            seat_class="ECONOMY"
        )

        for seat in business_seats:
            await self.flight_s.flight_seat.get_or_create(
                True, {},
                seat = seat,
                flight = created_flight,
                price = int(flight_data.min_price) * 3,
                is_occupied = not flight_data.allowed_business
            )

        for seat in economy_seats:
            await self.flight_s.flight_seat.get_or_create(
                True, {},
                seat = seat,
                flight = created_flight,
                price = flight_data.min_price,
            )

        return created_flight
