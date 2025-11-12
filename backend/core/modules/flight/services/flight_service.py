from datetime import datetime
from core.common.entities.entity import Entity
from core.common.services.service import Service
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from core.modules.flight.interfaces.airport_repository import AirportRepository
from core.modules.flight.interfaces.city_repository import CityRepository
from core.modules.flight.interfaces.flight_repository import FlightRepository, FlightSeatRepository
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
    ):
        super().__init__(user_repository)
        self.__user_init__(current_user)
        self.flight_seat = flight_seat_repo
        self.flight_repo = flight_repo
        self.city_repo = city_repo
        self.airport_repo = airport_repo
        self.user_flight_repository = user_flight_repository


    def get_cities_by_query(self, query: str):
        cities = self.city_repo.get_cities_by_query(query)
        return cities

    
    def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str, date: datetime):
        flights = self.flight_repo.get_flights_by_cities(departure_city_tag, arrival_city_tag, date)
        for flight in flights:
            self.flight_repo.add_fields(flight)
            self.airport_repo.add_fields(flight.arrival)
            self.airport_repo.add_fields(flight.departure)
            
        departure_city = self.city_repo.get_or_none(True, tag=departure_city_tag).name
        arrival_city = self.city_repo.get_or_none(True, tag = arrival_city_tag).name
        return {
            "departure": departure_city,
            "arrival": arrival_city,
            "flights": flights
        }
    
    def get_flight_with_seats(self, flight_id: int):
        flight = self.flight_repo.get_by_id(flight_id, True)
        self.flight_repo.add_fields(flight)
        
        seats = self.flight_seat.select(flight=flight)
        for seat in seats:
            self.flight_seat.add_fields(seat, exclude=['flight'])
        
        return {"flight": flight.to_dict(), "seats": [seat.to_dict(exclude=['flight', "created_at"]) for seat in seats]}
    

    def get_user_flights(self):
        user_flights = self.user_flight_repository.select(user = self.current_user)
        for uf in user_flights:
            self.user_flight_repository.add_fields(uf, exclude=['user'])
            self.flight_seat.add_fields(uf.flight_seat)
            self.flight_repo.add_fields(uf.flight_seat.flight)

        return [uf.to_dict(30) for uf in user_flights]