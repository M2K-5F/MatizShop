from typing import List, Literal, Optional, Protocol

from core.common.interfaces.repository import Repository
from core.modules.auth.entities.user import User


class UserRepository(Repository[User], Protocol):
    async def get_by_id_with_roles(self, user_id: int) -> Optional[User]: ...

    async def get_by_number_with_roles(self, phone_number: int) -> Optional[User]: ...

    async def get_admins(self) -> List[User]: ...