from core.modules.auth.entities.role import UserRole
from infrastructure.common.database.sqlalchemy_models import UserRoleModel
from infrastructure.common.impls.repository_impl import RepositoryImpl
from sqlalchemy.ext.asyncio  import AsyncSession


class UserRoleRepositoryImpl(RepositoryImpl[UserRoleModel, UserRole]):
    def __init__(self, session: AsyncSession):
        super().__init__(UserRoleModel, UserRole, session)

        
    