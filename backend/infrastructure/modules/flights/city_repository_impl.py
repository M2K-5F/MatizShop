from infrastructure.common.models.peewee_models import Airport, City
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from core.modules.flight.entites.city import City as CityEntity, Airport as AirportEntity
from peewee import fn


class CityRepositoryImpl(RepositoryImpl[City, CityEntity]):
    def __init__(self):
        super().__init__(City, CityEntity)

    
    def get_cities_by_query(self, query: str): 
        cap_query = query.capitalize()
        cities = self.model.select().where((fn.lower(self.model.name).contains(query)) | (fn.lower(self.model.name).contains(cap_query)))
        return list(map(self._to_entity, cities))


class AirportRepositoryImpl(RepositoryImpl[Airport, AirportEntity]):
    def __init__(self):
        super().__init__(Airport, AirportEntity)