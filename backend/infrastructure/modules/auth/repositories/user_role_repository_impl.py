from core.modules.auth.entities.role import UserRole
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from infrastructure.common.models.SQLAlchemy.sqlalchemy_models import UserRole as UserRoleModel
from sqlalchemy.ext.asyncio  import AsyncSession


class UserRoleRepositoryImpl(RepositoryImpl[UserRoleModel, UserRole]):
    def __init__(self, session: AsyncSession):
        super().__init__(UserRoleModel, UserRole, session)

        
    