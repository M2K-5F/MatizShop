from dataclasses import dataclass
from typing import Union
from core.base.entities.entity import Entity
from core.config.city_config import City
from core.modules.auth.entities.user import User

@dataclass
class FlightLocation(Entity):
    airport_tag: City
    time: str
    date: str


@dataclass
class Flight(Entity):
    tag: str
    departure: FlightLocation
    arrival: FlightLocation
    duration: str
    price: int
    type: str
    seats_count: int


@dataclass
class UserFlight(Entity):
    flight = Flight
    user: User