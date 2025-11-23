from typing import List, Protocol
from core.common.interfaces.repository import Repository
from core.modules.flight.entites.city import Airport


class AirportRepository(Repository[Airport], Protocol):
    async def get_airports_by_city_tag(self, tag: str) -> List[Airport]: ...