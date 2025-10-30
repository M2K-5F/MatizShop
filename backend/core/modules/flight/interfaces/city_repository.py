from typing import List, Protocol
from core.base.interfaces.repository import Repository
from core.modules.flight.entites.city import City


class CityRepository(Repository[City], Protocol):
    def get_cities_by_query(self, query: str) -> List[City]: ...