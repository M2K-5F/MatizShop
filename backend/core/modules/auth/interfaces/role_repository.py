from typing import Protocol

from core.base.interfaces.repository import Repository
from core.modules.auth.entities.role import Role


class RoleRepository(Repository[Role], Protocol):
    def get_admin_role(self) -> Role: ...

    def get_customer_role(self) -> Role: ...