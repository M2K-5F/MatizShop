from typing import Union
from core.modules.auth.entities.user import User


class Service:
    _current_user: Union[None, User] = None

    def __user_init__(self, user: User):
        self._current_user = user
        return self

    @property
    def current_user(self):
        if self._current_user:
            return self._current_user

        raise ValueError('User not define yet')
    