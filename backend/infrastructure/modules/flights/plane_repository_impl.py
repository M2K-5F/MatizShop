from core.modules.flight.entites.plane import Plane, Seat
from infrastructure.common.database.sqlalchemy_models import PlaneModel, SeatModel
from infrastructure.common.impls.repository_impl import RepositoryImpl


class PlaneRopositoryImpl(RepositoryImpl[PlaneModel, Plane]):
    def __init__(self, session):
        super().__init__(PlaneModel, Plane, session)



class SeatRopositoryImpl(RepositoryImpl[SeatModel, Seat]):
    def __init__(self, session):
        super().__init__(SeatModel, Seat, session)
