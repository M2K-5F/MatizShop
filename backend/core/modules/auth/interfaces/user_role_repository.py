from typing import Protocol

from core.base.interfaces.repository import Repository
from core.modules.auth.entities.role import UserRole


class UserRoleRepository(Repository[UserRole], Protocol): ...

