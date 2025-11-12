from dataclasses import dataclass
from core.common.entities.entity import Entity

@dataclass
class City(Entity):
    tag: str
    name: str
    country: str


@dataclass
class Airport(Entity):
    code: str
    name: str
    city: City