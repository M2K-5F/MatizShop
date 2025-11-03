
from infrastructure.base.models.peewee_models import Plane, Seat
from core.modules.flight.entites.plane import Plane as PlaneE, Seat as SeatE
from infrastructure.base.repositories.repository_impl import RepositoryImpl


class PlaneFlightRopositoryImpl(RepositoryImpl[Plane, PlaneE]):
    def __init__(self):
        super().__init__(Plane, PlaneE)



class SeatFlightRopositoryImpl(RepositoryImpl[Seat, SeatE]):
    def __init__(self):
        super().__init__(Seat, SeatE)
