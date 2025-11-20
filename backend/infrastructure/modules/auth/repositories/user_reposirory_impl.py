from core.modules.auth.entities import role
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from infrastructure.common.models.SQLAlchemy.sqlalchemy_models import User as UserModel
from sqlalchemy.ext.asyncio  import AsyncSession


class UserRepositoryImpl(RepositoryImpl[UserModel, User]):
    def __init__(self, session: AsyncSession):
        super().__init__(UserModel, User, session)

    