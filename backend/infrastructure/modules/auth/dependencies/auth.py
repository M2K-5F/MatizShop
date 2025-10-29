from core.modules.auth.services.auth import AuthService
from infrastructure.base.models.peewee_models import User, UserRole
from infrastructure.modules.auth.interfaces.password_hasher_impl import PasswordHasherImpl
from infrastructure.modules.auth.repositories.role_repository_impl import RoleRepositoryImpl
from infrastructure.modules.auth.repositories.user_reposirory_impl import UserRepositoryImpl
from infrastructure.modules.auth.repositories.user_role_repository_impl import UserRoleRepositoryImpl


def get_auth_service():
    return AuthService(
        UserRepositoryImpl(),
        RoleRepositoryImpl(),
        UserRoleRepositoryImpl(),
        PasswordHasherImpl
    )

service = get_auth_service()
# user = service.user.get_or_none(True, phone_number = 228)
# service.user.delete(user)
print(service.verify_password(
    228, '12345'
))