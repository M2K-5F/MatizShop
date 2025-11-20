from typing import List, Literal, Protocol

from core.common.interfaces.repository import Repository
from core.modules.auth.entities.role import UserRole
from core.modules.auth.entities.user import User


class UserRoleRepository(Repository[UserRole], Protocol):...

