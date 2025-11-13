
from infrastructure.common.models.peewee_models import Plane, Seat
from core.modules.flight.entites.plane import Plane as PlaneE, Seat as SeatE
from infrastructure.common.repositories.repository_impl import RepositoryImpl


class PlaneRopositoryImpl(RepositoryImpl[Plane, PlaneE]):
    def __init__(self):
        super().__init__(Plane, PlaneE)



class SeatRopositoryImpl(RepositoryImpl[Seat, SeatE]):
    def __init__(self):
        super().__init__(Seat, SeatE)
