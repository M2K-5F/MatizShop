from sqlalchemy import select
from core.modules.auth.entities.role import Role
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_role_repository import UserRoleRepository
from infrastructure.common.database.sqlalchemy_models import RoleModel
from infrastructure.common.impls.repository_impl import RepositoryImpl
from sqlalchemy.ext.asyncio  import AsyncSession


class RoleRepositoryImpl(RepositoryImpl[RoleModel, Role]):
    def __init__(self, session: AsyncSession):
        super().__init__(RoleModel, Role, session)

    async def get_admin_role(self):
        return await self.get_or_none(
            True,
            name = 'ADMIN'
        )
    
    async def get_customer_role(self):
        return await self.get_or_none(
            True, 
            name = 'CUSTOMER'
        )