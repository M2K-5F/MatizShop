from infrastructure.base.models.peewee_models import Airport, City, Flight, FlightSeat, UserFlight
from infrastructure.base.repositories.repository_impl import RepositoryImpl
from core.modules.flight.entites.flight import UserFlight as UserFlightEntity
from core.modules.flight.entites.flight import Flight as FlightEntity, FlightSeat as FlightSeatE
from playhouse.shortcuts import model_to_dict



class FlightRepositoryImpl(RepositoryImpl[Flight, FlightEntity]): 
    def __init__(self):
        super().__init__(Flight, FlightEntity)


    def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str):
        DepartureAirport = Airport.alias()
        ArrivalAirport = Airport.alias()
        
        query = (self.model
            .select()
            .join(DepartureAirport, on=(self.model.departure == DepartureAirport.id))
            .join(ArrivalAirport, on=(self.model.arrival == ArrivalAirport.id))
            .where(
                DepartureAirport.city == departure_city_tag.upper(),
                ArrivalAirport.city == arrival_city_tag.upper()
            )
        )
        
        return list(map(self._to_entity, query))




class FlightSeatRepositoryImpl(RepositoryImpl[FlightSeat, FlightSeatE]):
    def __init__(self):
        super().__init__(FlightSeat, FlightSeatE)




class UserFlightRopositoryImpl(RepositoryImpl[UserFlight, UserFlightEntity]):
    def __init__(self):
        super().__init__(UserFlight, UserFlightEntity)
