from datetime import datetime
from typing import List
from infrastructure.common.models.SQLAlchemy.sqlalchemy_models import Airport, City, Flight, FlightSeat, UserFlight
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from core.modules.flight.entites.flight import UserFlight as UserFlightEntity
from core.modules.flight.entites.flight import Flight as FlightEntity, FlightSeat as FlightSeatE



class FlightRepositoryImpl(RepositoryImpl[Flight, FlightEntity]): 
    def __init__(self, session):
        super().__init__(Flight, FlightEntity, session)


    async def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str, date: datetime):
        # DepartureAirport = Airport.alias()
        # ArrivalAirport = Airport.alias()
        
        # query = await (self.model
        #     .select()
        #     .join(DepartureAirport, on=(self.model.departure == DepartureAirport.id))
        #     .join(ArrivalAirport, on=(self.model.arrival == ArrivalAirport.id))
        #     .where(
        #         DepartureAirport.city == departure_city_tag.upper(),
        #         ArrivalAirport.city == arrival_city_tag.upper(),
        #         self.model.departure_time ** f'%{date.date()}%'
        #     )
        # ).aio_execute(self.database)
        
        # return list(map(self._to_entity, query))
        return []



class FlightSeatRepositoryImpl(RepositoryImpl[FlightSeat, FlightSeatE]):
    def __init__(self, session):
        super().__init__(FlightSeat, FlightSeatE, session)
        
    
    async def get_tickets_list(self) -> List[FlightSeatE]:
        # return list(await self.model.select().where(self.model.is_occupied == True).aio_execute(self.database))
        return []




class UserFlightRopositoryImpl(RepositoryImpl[UserFlight, UserFlightEntity]):
    def __init__(self, session):
        super().__init__(UserFlight, UserFlightEntity, session)
