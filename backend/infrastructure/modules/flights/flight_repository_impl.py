from infrastructure.base.models.peewee_models import Airport, City, Flight, FlightLocation, UserFlight
from infrastructure.base.repositories.repository_impl import RepositoryImpl
from core.modules.flight.entites.flight import UserFlight as UserFlightEntity
from core.modules.flight.entites.flight import Flight as FlightEntity
from core.modules.flight.entites.flight import FlightLocation as FlightLocationEntity
from playhouse.shortcuts import model_to_dict


class UserFlightRopositoryImpl(RepositoryImpl[UserFlight, UserFlightEntity]):
    def __init__(self):
        super().__init__(UserFlight, UserFlightEntity)

class FlightRepositoryImpl(RepositoryImpl[Flight, FlightEntity]): 
    def __init__(self):
        super().__init__(Flight, FlightEntity)


    def get_flights_by_cities(self, departure_city_tag: str, arrival_city_tag: str):
        DepartureFL = FlightLocation.alias()
        ArrivalFL = FlightLocation.alias()
        DepartureAirport = Airport.alias()
        ArrivalAirport = Airport.alias()
        
        query = (self.model
            .select()
            .join(DepartureFL, on=(Flight.departure == DepartureFL.id))
            .join(DepartureAirport, on=(DepartureFL.airport_tag == DepartureAirport.code))
            .join(ArrivalFL, on=(Flight.arrival == ArrivalFL.id))
            .join(ArrivalAirport, on=(ArrivalFL.airport_tag == ArrivalAirport.code))
            .where(
                DepartureAirport.city == departure_city_tag.upper(),
                ArrivalAirport.city == arrival_city_tag.upper()
            ))
        
        return list(map(model_to_dict, query))


class FlightLocationRepositoryImpl(RepositoryImpl[FlightLocation, FlightLocationEntity]): 
    def __init__(self):
        super().__init__(FlightLocation, FlightLocationEntity)