from typing import Protocol
from core.base.interfaces.repository import Repository
from core.modules.flight.entites.city import Airport


class AirportRepository(Repository[Airport], Protocol): ...