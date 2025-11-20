from infrastructure.common.models.SQLAlchemy.sqlalchemy_models import Airport, City
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from core.modules.flight.entites.city import City as CityEntity, Airport as AirportEntity


class CityRepositoryImpl(RepositoryImpl[City, CityEntity]):
    def __init__(self, session):
        super().__init__(City, CityEntity, session)

    
    async def get_cities_by_query(self, query: str): 
        # cap_query = query.capitalize()
        # cities = self.model.select().where((fn.lower(self.model.name).contains(query)) | (fn.lower(self.model.name).contains(cap_query)))
        # return list(map(self._to_entity, await cities.aio_execute(self.database)))
        return []


class AirportRepositoryImpl(RepositoryImpl[Airport, AirportEntity]):
    def __init__(self, session):
        super().__init__(Airport, AirportEntity, session)