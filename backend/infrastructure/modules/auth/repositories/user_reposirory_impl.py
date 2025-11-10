from core.modules.auth.entities import role
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from infrastructure.common.models.peewee_models import User as UserModel


class UserRepositoryImpl(RepositoryImpl[UserModel, User]):
    def __init__(self):
        super().__init__(UserModel, User)

    def get_user_roles(self, user: User):
        user_model = self._to_model(user)
        roles = list(getattr(user_model, 'roles'))
        return [role.role.name for role in roles]