from datetime import datetime
from typing import List, Protocol
from core.common.interfaces.repository import Repository
from core.modules.flight.entites.flight import Flight, FlightSeat
from core.modules.flight.entites.plane import Plane, Seat


class FlightRepository(Repository[Flight], Protocol): 
    def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str, date: datetime) -> List[Flight]: ...


class FlightSeatRepository(Repository[FlightSeat], Protocol):
    def get_tickets_list(self) -> List[FlightSeat]: ...


class PlaneRepository(Repository[Plane], Protocol): ...


class SeatRepository(Repository[Seat], Protocol):  ...
