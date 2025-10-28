from typing import Protocol

from core.base.interfaces.repository import Repository
from core.modules.auth.entities.user import User


class UserRepository(Repository[User], Protocol):
    pass