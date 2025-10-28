from dataclasses import fields
from core.modules.auth.entities import user
from core.modules.auth.interfaces.password_hasher import PasswordHasher
from core.modules.auth.interfaces.role_repository import RoleRepository
from core.modules.auth.interfaces.user_repository import UserRepository
from core.modules.auth.interfaces.user_role_repository import UserRoleRepository


class AuthService:
    def __init__(
            self, 
            user_repo: UserRepository, 
            role_repo: RoleRepository, 
            user_role_repo: UserRoleRepository, 
            pwd_hasher: PasswordHasher
    ):
        self.user = user_repo
        self.user_role = user_role_repo
        self.role = role_repo
        self.pwd_hasher = pwd_hasher

    def register(self, phone_number: int, username: str, password: str, email_address: str):
        user_entity = user.User.create(
            username, password,
            email_address, phone_number, 
            self.pwd_hasher
        )

        created_user = self.user.get_or_create(
            True, 
            {
                "password_hash": user_entity.password_hash,
                "email_address": user_entity.email_address
            },
            username = user_entity.username,
            phone_number = user_entity.phone_number
        )

        user_role = self.user_role.get_or_create(
            True,
            role = self.role.get_customer_role().name,
            user = created_user.id
        )
    
        return created_user

    