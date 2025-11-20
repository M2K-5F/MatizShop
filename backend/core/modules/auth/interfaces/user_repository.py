from typing import List, Literal, Protocol

from core.common.interfaces.repository import Repository
from core.modules.auth.entities.user import User


class UserRepository(Repository[User], Protocol): ...