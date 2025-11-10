from core.modules.auth.entities.role import Role
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.user_repository import UserRepository
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from infrastructure.common.models.peewee_models import Role as RoleModel


class RoleRepositoryImpl(RepositoryImpl[RoleModel, Role]):
    def __init__(self):
        super().__init__(RoleModel, Role)

    def get_admin_role(self):
        return self.get_or_none(
            True,
            name = 'ADMIN'
        )
    
    def get_customer_role(self):
        return self.get_or_none(
            True, 
            name = 'CUSTOMER'
        )