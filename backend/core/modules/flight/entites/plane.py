from dataclasses import dataclass
from typing import Literal, Union

from core.base.entities.entity import Entity


@dataclass
class Plane(Entity):
    name: str
    business_class_count: int
    economy_class_count: int


@dataclass
class Seat(Entity):
    seat_class: Literal['BUSINESS', "ECONOMY"]
    seat_name: str
    seat_number: int
    plane: Plane