from dataclasses import dataclass
from datetime import timedelta
import datetime
from core.common.entities.entity import Entity
from core.modules.auth.entities.user import User
from core.modules.flight.entites.city import Airport
from core.modules.flight.entites.plane import Plane, Seat


@dataclass
class Flight(Entity):
    tag: str
    departure: Airport
    arrival: Airport
    departure_time: datetime.datetime
    arrival_time: datetime.datetime
    duration: timedelta
    min_price: int
    seats_left: int
    plane: Plane
    allowed_business: bool


@dataclass
class FlightSeat(Entity):
    seat: Seat
    flight: Flight
    price: int
    is_occupied: bool


@dataclass
class UserFlight(Entity):
    flight_seat: FlightSeat
    user: User