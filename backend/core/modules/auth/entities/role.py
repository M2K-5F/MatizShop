from dataclasses import dataclass
from typing import Literal, Union

from core.common.entities.entity import Entity
from core.modules.auth.entities.user import User


@dataclass
class Role(Entity):
    name: Literal['ADMIN', 'CUSTOMER']


@dataclass
class UserRole(Entity):
    user: User
    role: Role