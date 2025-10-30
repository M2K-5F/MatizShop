from typing import Union
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository


class Service:
    def __init__(self, user_repository: UserRepository):
        self.user_repo = user_repository

        
    _current_user: Union[None, User] = None

    def __user_init__(self, user: User):
        self._current_user = user
        return self

    @property
    def current_user(self):
        if self._current_user:
            return self._current_user

        raise ValueError('User not define yet')
    