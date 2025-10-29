from functools import lru_cache
from core.modules.auth.entities.user import User
from core.modules.auth.services.auth import AuthService
from infrastructure.modules.auth.interfaces.password_hasher_impl import PasswordHasherImpl
from infrastructure.modules.auth.repositories.role_repository_impl import RoleRepositoryImpl
from infrastructure.modules.auth.repositories.user_reposirory_impl import UserRepositoryImpl
from infrastructure.modules.auth.repositories.user_role_repository_impl import UserRoleRepositoryImpl
from restapi.token.JWT_config import AuthJWT
from restapi.token.tokenizer import JWTTokenizer
from peewee import SqliteDatabase
from infrastructure.base.models.peewee_models import database

def singleton(func):
    """Декоратор для singleton сервисов"""
    @lru_cache(maxsize=None)
    def wrapper(instance):
        return func(instance)
    return wrapper

class DIContainer():
    def __init__(self, database: SqliteDatabase) -> None:
        self._database = database

    @singleton
    def get_auth_service(self):
        return AuthService(
            UserRepositoryImpl(),
            RoleRepositoryImpl(),
            UserRoleRepositoryImpl(),
            self.get_hasher()
        )

    @singleton
    def get_hasher(self):
        return PasswordHasherImpl()
    

    @singleton
    def get_jwt_tokenizer(self):
        return JWTTokenizer(AuthJWT())
    
    @property
    def transaction(self):
        return self._database.atomic()

di_container = DIContainer(database)