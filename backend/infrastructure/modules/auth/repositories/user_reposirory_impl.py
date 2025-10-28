from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from infrastructure.base.repositories.repository_impl import RepositoryImpl
from infrastructure.base.models.peewee_models import User as UserModel


class UserRepositoryImpl(RepositoryImpl[UserModel, User]):
    def __init__(self):
        super().__init__(UserModel, User)
