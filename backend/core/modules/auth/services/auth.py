from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.password_hasher import PasswordHasher
from core.modules.auth.interfaces.role_repository import RoleRepository
from core.modules.auth.interfaces.user_repository import UserRepository
from core.modules.auth.interfaces.user_role_repository import UserRoleRepository


class AuthService():
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


    async def register(self, phone_number: str, username: str, password: str, email_address: str):
            user_entity = User.create(
                username, password,
                email_address, phone_number, 
                self.pwd_hasher
            )

            created_user = await self.user.get_or_create(
                True, 
                {
                    "password_hash": user_entity.password_hash,
                    "email_address": user_entity.email_address
                },
                username = user_entity.username,
                phone_number = user_entity.phone_number
            )

            user_role = await self.user_role.get_or_create(
                True,
                role = await self.role.get_customer_role(),
                user = created_user
            )
            created_user.roles = ['CUSTOMER']
        
            return created_user


    async def get_user(self, phone_number: str):
        user = await self.user.get_by_number_with_roles(phone_number)
        return user


    async def get_user_by_id(self, user_id: int):
        user = await self.user.get_by_id_with_roles(user_id)
        return user



    async def verify_password(self, phone_number: str, password: str):
            user = await self.user.get_or_none(
                True, 
                phone_number = phone_number
            )
            if self.pwd_hasher.verify(
                password,
                user.password_hash
            ):
                return True
            
            return False
    

    async def get_users_count(self):
        return await self.user.count()
    

    async def get_admin_list(self):
        return await self.user.get_admins()
    