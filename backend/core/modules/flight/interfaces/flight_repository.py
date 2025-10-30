from typing import Protocol
from core.base.interfaces.repository import Repository
from core.modules.flight.entites.flight import Flight


class FlightRepository(Repository[Flight], Protocol): ...