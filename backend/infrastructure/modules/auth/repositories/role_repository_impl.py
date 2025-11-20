from core.modules.auth.entities.role import Role
from core.modules.auth.entities.user import User
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from sqlalchemy.ext.asyncio  import AsyncSession
from infrastructure.common.models.SQLAlchemy.sqlalchemy_models import Role as RoleModel


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
    
    async def get_user_roles(self, user: User):
        return ['ADMIN']
        # query = await self.model.select().join(UserRole).where(UserRole.user == user.id).aio_execute(self.database)
        # return [role.name for role in query]