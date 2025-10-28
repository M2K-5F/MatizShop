from core.entities.user import User
from core.repositories.user_repository import UserRepository
from infrastructure.repositories.repository_impl import RepositoryImpl
from infrastructure.models.peewee_models import User as UserModel


class UserRepositoryImpl(RepositoryImpl[UserModel, User]):
    def __init__(self):
        super().__init__(UserModel, User)


repo: UserRepository = UserRepositoryImpl()
user = repo.get_by_id(1, True)
user.email_address = '1email.py'
repo.save(user)
