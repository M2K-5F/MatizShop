from typing import List, Protocol, Tuple
from core.common.interfaces.repository import Repository
from core.modules.flight.entites.flight import UserFlight


class UserFlightRepository(Repository[UserFlight], Protocol):
    async def get_paginate_revenue(self,) -> Tuple[int, int]:
        """return Tuple[int revenue, int count]"""
        ...

    
    async def get_user_flights(self, user_id: int | None) -> List[UserFlight]: ... 