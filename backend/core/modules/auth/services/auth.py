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


    async def register(self, phone_number: int, username: str, password: str, email_address: str):
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
                role = self.role.get_customer_role(),
                user = created_user
            )
            created_user.roles = ['CUSTOMER']
        
            return created_user


    async def get_user(self, phone_number: int):
            user = await self.user.get_or_none(
                True,
                phone_number = phone_number
            )

            roles = await self.role.get_user_roles(user)
            user.roles = roles
            return user


    async def get_user_by_id(self, id: int):
        user = await self.user.get_by_id(
            id,
            True,
        )

        roles = await self.role.get_user_roles(user)
        user.roles = roles
        return user



    async def verify_password(self, phone_number: int, password: str):
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
        user_roles = await self.user_role.select(role = self.role.get_admin_role())
        for ur in user_roles:
            await self.user_role.add_fields(ur)
            ur.user.roles = await self.role.get_user_roles(ur.user)
            
        admins = [ur.user.to_dict(exclude=['created_at', 'password_hash']) for ur in user_roles]
        return admins
    