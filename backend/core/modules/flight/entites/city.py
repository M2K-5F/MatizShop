from dataclasses import dataclass
from ipaddress import NetmaskValueError
from os import name
from core.base.entities.entity import Entity

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
