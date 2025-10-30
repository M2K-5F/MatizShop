from functools import lru_cache

from fastapi import Depends
from core.modules.auth.entities.user import User
from core.modules.auth.services.auth import AuthService
from core.modules.flight.services.flight_service import FlightService
from infrastructure.modules.auth.interfaces.password_hasher_impl import PasswordHasherImpl
from infrastructure.modules.auth.repositories.role_repository_impl import RoleRepositoryImpl
from infrastructure.modules.auth.repositories.user_reposirory_impl import UserRepositoryImpl
from infrastructure.modules.auth.repositories.user_role_repository_impl import UserRoleRepositoryImpl
from infrastructure.modules.flights.city_repository_impl import AirportRepositoryImpl, CityRepositoryImpl
from infrastructure.modules.flights.flight_repository_impl import FlightLocationRepositoryImpl, FlightRepositoryImpl, UserFlightRopositoryImpl
from restapi.modules.auth.dependencies import get_user_from_request
from restapi.token.JWT_config import AuthJWT
from restapi.token.tokenizer import JWTTokenizer
from peewee import SqliteDatabase
from infrastructure.base.models.peewee_models import database

def singleton(func):
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
    
    def get_flight_service(self, current_user = Depends(get_user_from_request)):
        return FlightService(
            FlightRepositoryImpl(),
            CityRepositoryImpl(),
            FlightLocationRepositoryImpl(),
            AirportRepositoryImpl(),
            UserFlightRopositoryImpl(),
            UserRepositoryImpl(),
            current_user, 
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