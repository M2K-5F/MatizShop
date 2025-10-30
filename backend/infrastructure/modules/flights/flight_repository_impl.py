from infrastructure.base.models.peewee_models import Flight, FlightLocation, UserFlight
from infrastructure.base.repositories.repository_impl import RepositoryImpl
from core.modules.flight.entites.flight import UserFlight as UserFlightEntity
from core.modules.flight.entites.flight import Flight as FlightEntity
from core.modules.flight.entites.flight import FlightLocation as FlightLocationEntity


class UserFlightRopositoryImpl(RepositoryImpl[UserFlight, UserFlightEntity]):
    def __init__(self):
        super().__init__(UserFlight, UserFlightEntity)

class FlightRepositoryImpl(RepositoryImpl[Flight, FlightEntity]): 
    def __init__(self):
        super().__init__(Flight, FlightEntity)

class FlightLocationRepositoryImpl(RepositoryImpl[FlightLocation, FlightLocationEntity]): 
    def __init__(self):
        super().__init__(FlightLocation, FlightLocationEntity)