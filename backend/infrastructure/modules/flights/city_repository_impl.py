from typing import List
from sqlalchemy import or_, select
from infrastructure.common.database.sqlalchemy_models import AirportModel, CityModel
from infrastructure.common.impls.repository_impl import RepositoryImpl
from core.modules.flight.entites.city import City, Airport


class CityRepositoryImpl(RepositoryImpl[CityModel, City]):
    def __init__(self, session):
        super().__init__(CityModel, City, session)

    
    async def get_cities_by_query(self, slug: str): 
        query = (
            select(CityModel)
            .where(or_(
                CityModel.name.contains(slug.capitalize()),
                CityModel.name.contains(slug)
            ))
        )

        res = ( await self.session.execute(query)).scalars().all()
        return [self._to_entity(city) for city in res]


class AirportRepositoryImpl(RepositoryImpl[AirportModel, Airport]):
    def __init__(self, session):
        super().__init__(AirportModel, Airport, session)


    async def get_airports_by_city_tag(self, tag: str) -> List[Airport]:
        SQL = (
            select(AirportModel, CityModel)
            .join(CityModel, CityModel.id == AirportModel.city_id)
            .where(
                CityModel.tag == tag.upper()
            )
        )

        res = (await self.session.execute(SQL)).all()
        airports: List[Airport] = []

        for row in res:
            city = self._to_custom_entity(row[1], City)
            airport = self._to_entity(row[0])
            airport.city = city
            airports.append(airport)

        return airports
