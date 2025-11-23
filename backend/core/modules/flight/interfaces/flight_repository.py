from datetime import datetime
from typing import List, Protocol, Tuple
from core.common.interfaces.repository import Repository
from core.modules.flight.entites.flight import Flight, FlightSeat
from core.modules.flight.entites.plane import Plane, Seat


class FlightRepository(Repository[Flight], Protocol): 
    async def get_flights_by_cities(self, departure_city_id: int | None, arrival_city_id: int | None, date: datetime) -> List[Flight]: ...

    async def get_flight_with_seats(self, flight_id: int) -> Tuple[Flight, List[FlightSeat]]: ...

    async def get_flights_with_relations(self) -> List[Flight]: ...


class FlightSeatRepository(Repository[FlightSeat], Protocol):
    async def get_tickets_list(self) -> List[FlightSeat]: ...


class PlaneRepository(Repository[Plane], Protocol): ...


class SeatRepository(Repository[Seat], Protocol):  ...
