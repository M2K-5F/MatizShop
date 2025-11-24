from datetime import datetime
from core.common.services.service import Service
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from core.modules.flight.entites import flight
from core.modules.flight.interfaces.airport_repository import AirportRepository
from core.modules.flight.interfaces.city_repository import CityRepository
from core.modules.flight.interfaces.flight_repository import FlightRepository, FlightSeatRepository, PlaneRepository, SeatRepository
from core.modules.flight.interfaces.user_flight_repository import UserFlightRepository


class FlightService(Service):
    def __init__(
        self,
        flight_repo: FlightRepository,
        city_repo: CityRepository,
        airport_repo: AirportRepository,
        user_flight_repository: UserFlightRepository,
        user_repository: UserRepository,
        flight_seat_repo: FlightSeatRepository,
        current_user: User,
        plane_repo: PlaneRepository,
        seat_repo: SeatRepository
    ):
        super().__init__(user_repository)
        self.__user_init__(current_user)
        self.plane = plane_repo
        self.flight_seat = flight_seat_repo
        self.flight_repo = flight_repo
        self.city_repo = city_repo
        self.airport_repo = airport_repo
        self.user_flight_repository = user_flight_repository
        self.seat = seat_repo


    async def get_cities_by_query(self, query: str):
        cities = await self.city_repo.get_cities_by_query(query)
        return cities

    
    async def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str, date: datetime):
        departure_city = await self.city_repo.get_or_none(True, tag = departure_city_tag.upper())
        arrival_city = await self.city_repo.get_or_none(True, tag = arrival_city_tag.upper())
        flights = await self.flight_repo.get_flights_by_cities(departure_city.id, arrival_city.id, date)
        return {
            "departure": departure_city,
            "arrival": arrival_city,
            "flights": flights
        }
    

    async def get_flight_with_seats(self, flight_id: int):
        flight, flight_seats = await self.flight_repo.get_flight_with_seats(flight_id)
        await self.user_repo.save(self.current_user)
        
        return {"flight": flight, "seats": flight_seats}
    

    async def get_user_flights(self):
        flights = await self.user_flight_repository.get_user_flights(self.current_user.id)

        return flights

    async def create_user_flight(self, flight_seat_id: int):
        flight_seat = await self.flight_seat.get_or_none(True, id = flight_seat_id, is_occupied = False)
        await self.flight_seat.load_relations(flight_seat, {
            'flight': self.flight_repo
        })

        user_flight = await self.user_flight_repository.get_or_create(
            True, {},
            user = self.current_user,
            flight_seat = flight_seat,
        )

        flight_seat.is_occupied = True
        await self.flight_seat.save(flight_seat)
        flight_seat.flight.seats_left -= 1
        await self.flight_repo.save(flight_seat.flight)
        return user_flight
    

    async def get_flights_count(self):
        return await self.flight_repo.count()
    

    async def get_flights_info(self):
        flights = await self.flight_repo.get_flights_with_relations()

        return flights
    

    async def get_airports_by_city(self, city_tag: str):
        airports = await self.airport_repo.get_airports_by_city_tag(city_tag)

        return airports