from typing import List, Literal, Protocol

from core.common.interfaces.repository import Repository
from core.modules.auth.entities.role import Role
from core.modules.auth.entities.user import User


class RoleRepository(Repository[Role], Protocol):
    async def get_admin_role(self) -> Role: ...

    async def get_customer_role(self) -> Role: ...