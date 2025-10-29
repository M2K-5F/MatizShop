from dataclasses import fields
from core.modules.auth.entities import role
from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.password_hasher import PasswordHasher
from core.modules.auth.interfaces.role_repository import RoleRepository
from core.modules.auth.interfaces.user_repository import UserRepository
from core.modules.auth.interfaces.user_role_repository import UserRoleRepository
from infrastructure.base.models.peewee_models import database


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
        with self.user.transaction():
            user_entity = User.create(
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
                role = self.role.get_customer_role(),
                user = created_user
            )
            created_user.roles = ['CUSTOMER']
        
            return created_user


    def get_user(self, phone_number: int):
        with self.user.transaction():
            user = self.user.get_or_none(
                True,
                phone_number = phone_number
            )

            roles = self.user.get_user_roles(user)
            user.roles = roles
            return user


    def verify_password(self, phone_number: int, password: str):
        with self.user.transaction():
            user = self.user.get_or_none(
                True, 
                phone_number = phone_number
            )

            if self.pwd_hasher.verify(
                password,
                user.password_hash
            ):
                return True
            
            return False
