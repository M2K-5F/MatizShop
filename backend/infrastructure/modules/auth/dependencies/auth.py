from core.modules.auth.services.auth import AuthService
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
print(service.register(
    228, 'peniseochek', '12345', 'psina'
))