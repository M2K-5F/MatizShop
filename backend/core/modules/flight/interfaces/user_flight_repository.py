from typing import Protocol
from core.base.interfaces.repository import Repository
from core.modules.flight.entites.flight import UserFlight


class UserFlightRepository(Repository[UserFlight], Protocol): ...