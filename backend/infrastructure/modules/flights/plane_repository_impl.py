
from infrastructure.common.models.peewee_models import Plane, Seat
from core.modules.flight.entites.plane import Plane as PlaneE, Seat as SeatE
from infrastructure.common.repositories.repository_impl import RepositoryImpl


class PlaneFlightRopositoryImpl(RepositoryImpl[Plane, PlaneE]):
    def __init__(self):
        super().__init__(Plane, PlaneE)



class SeatFlightRopositoryImpl(RepositoryImpl[Seat, SeatE]):
    def __init__(self):
        super().__init__(Seat, SeatE)
