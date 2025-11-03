from typing import List, Protocol
from core.base.interfaces.repository import Repository
from core.modules.flight.entites.flight import Flight, FlightSeat
from core.modules.flight.entites.plane import Plane, Seat


class FlightRepository(Repository[Flight], Protocol): 
    def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str) -> List[Flight]: ...


class FlightSeatRepository(Repository[FlightSeat], Protocol): ...


class PlaneRepository(Repository[Plane], Protocol): ...


class SeatRepository(Repository[Seat], Protocol):  ...
