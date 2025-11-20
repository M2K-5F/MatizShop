import asyncio
from functools import lru_cache
from core.modules.admin.services.admin_service import AdminService
from core.modules.auth.entities.user import User
from core.modules.auth.services.auth import AuthService
from core.modules.flight.services.flight_service import FlightService
from infrastructure.common.impls.password_hasher_impl import PasswordHasherImpl
from infrastructure.common.models.SQLAlchemy.postgres_database import Database
from infrastructure.modules.auth.repositories.role_repository_impl import RoleRepositoryImpl
from infrastructure.modules.auth.repositories.user_reposirory_impl import UserRepositoryImpl
from infrastructure.modules.auth.repositories.user_role_repository_impl import UserRoleRepositoryImpl
from infrastructure.modules.flights.city_repository_impl import AirportRepositoryImpl, CityRepositoryImpl
from infrastructure.modules.flights.flight_repository_impl import FlightRepositoryImpl, FlightSeatRepositoryImpl, UserFlightRopositoryImpl
from infrastructure.modules.flights.plane_repository_impl import PlaneRopositoryImpl, SeatRopositoryImpl
from restapi.token.JWT_config import AuthJWT
from restapi.token.tokenizer import JWTTokenizer

def singleton(func):
    @lru_cache(maxsize=None)
    def wrapper(instance):
        return func(instance)
    return wrapper

class DIContainer():
    def __init__(self, database: Database) -> None:
        self._database = database

    @singleton
    async def get_auth_service(self):
        async with self._database.get_session() as session:
            return AuthService(
                UserRepositoryImpl(session),
                RoleRepositoryImpl(session),
                UserRoleRepositoryImpl(session),
                self.get_hasher()
            )
    
    
    async def get_flight_service(self, current_user: User):
        async with self._database.get_session() as session:
            return FlightService(
                FlightRepositoryImpl(session),
                CityRepositoryImpl(session),
                AirportRepositoryImpl(session),
                UserFlightRopositoryImpl(session),
                UserRepositoryImpl(session),
                FlightSeatRepositoryImpl(session),
                current_user, 
                PlaneRopositoryImpl(session),
                SeatRopositoryImpl(session)
            )
    

    async def get_admin_service(self, current_user: User):
        return AdminService(
            await self.get_auth_service(),
            await self.get_flight_service(current_user)
        )


    @singleton
    def get_hasher(self):
        return PasswordHasherImpl()


    @singleton
    def get_jwt_tokenizer(self):
        return JWTTokenizer(AuthJWT())
    

    def get_atomic_transaction(self):
        # return self._database.atomic()
        return None
    

__all__ = ["DIContainer"]