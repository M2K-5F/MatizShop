from pickletools import read_uint1
from typing import List, Optional

from sqlalchemy import any_, func, select
from core.modules.auth.entities.user import User
from infrastructure.common.database.sqlalchemy_models import RoleModel, UserModel, UserRoleModel
from infrastructure.common.impls.repository_impl import RepositoryImpl
from sqlalchemy.ext.asyncio  import AsyncSession


class UserRepositoryImpl(RepositoryImpl[UserModel, User]):
    def __init__(self, session: AsyncSession):
        super().__init__(UserModel, User, session)

    async def get_by_id_with_roles(self, user_id: int) -> Optional[User]:

        query = (
            select(UserModel, func.array_agg(RoleModel.name).label('roles'))
            .join(UserRoleModel, UserModel.id == UserRoleModel.user_id)
            .join(RoleModel, UserRoleModel.role_id == RoleModel.id)
            .where(UserModel.id == user_id)
            .group_by(UserModel.id)
        )
        res = (await self.session.execute(query)).one_or_none()
        if not res:
            return None
        
        usr = self._to_entity(res[0])
        usr.roles = res.roles
        
        return usr
    
    async def get_by_number_with_roles(self, phone_number: int) -> Optional[User]:

        query = (
            select(UserModel, func.array_agg(RoleModel.name).label('roles'))
            .join(UserRoleModel, UserModel.id == UserRoleModel.user_id)
            .join(RoleModel, UserRoleModel.role_id == RoleModel.id)
            .where(UserModel.id == phone_number)
            .group_by(UserModel.id)
        )
        res = (await self.session.execute(query)).one_or_none()

        if not res:
            return None
        
        usr = self._to_entity(res[0])
        usr.roles = res.roles
        
        return usr
    
    async def get_admins(self) -> List[User]:
        query = (
            select(
                UserModel,
                func.array_agg(RoleModel.name).label('roles')
            )
            .join(UserRoleModel, UserModel.id == UserRoleModel.user_id)
            .join(RoleModel, UserRoleModel.role_id == RoleModel.id)
            .group_by(UserModel.id)
            .having(any_(func.array_agg(RoleModel.name)) == 'ADMIN')
        )
        
        results = (await self.session.execute(query)).all()
        
        admins = []
        for res in results:
            user = self._to_entity(res[0])
            user.roles = res.roles
            admins.append(user)
        
        return admins