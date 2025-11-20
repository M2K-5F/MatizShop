from sqlalchemy import select
from containers.di import DIContainer
from core.config import city_config
from infrastructure.common.impls.password_hasher_impl import PasswordHasherImpl
from infrastructure.common.models.SQLAlchemy.postgres_database import Database
from infrastructure.common.models.SQLAlchemy.sqlalchemy_models import Role
from infrastructure.common.repositories.repository_impl import RepositoryImpl
from core.modules.auth.entities.role import Role as RoleE
from infrastructure.modules.auth.repositories.user_reposirory_impl import UserRepositoryImpl
from infrastructure.modules.auth.repositories.user_role_repository_impl import UserRoleRepositoryImpl
from infrastructure.modules.flights.city_repository_impl import AirportRepositoryImpl, CityRepositoryImpl


async def main():
    database = Database()
    await database.database_init('tast_db')
    container = DIContainer(database)

    async with database.engine.begin() as conn:
        await conn.run_sync(Database.Table.metadata.create_all)

    async with database.get_session() as session:
        role_repo = RepositoryImpl(Role, RoleE, session)    
        admin_role, _ = await role_repo.get_or_create(name="ADMIN")
        customer_role, _ = await role_repo.get_or_create(name="CUSTOMER")
        
        user_repo = UserRepositoryImpl(session)
        user, _ = await user_repo.get_or_create(
            defaults= {
                "password_hash": PasswordHasherImpl.hash('12345'),
                "username": 'admin',
                "email_address": 'psina@pisos.kpk'
            },
            phone_number = '88001007393',
        )

        user_role_repo = UserRoleRepositoryImpl(session)
        _, _ = await user_role_repo.get_or_create(
            user = user,
            role = admin_role
        )

        _, _ = await user_role_repo.get_or_create(
            user = user,
            role = customer_role
        )

        city_repo = CityRepositoryImpl(session)
        airport_repo = AirportRepositoryImpl(session)

        for city in city_config.cities_data:
            created_city, _ = await city_repo.get_or_create(
                tag = city['id'],
                name = city['name'],
                country = city['country'],
            )
            print(created_city)
            for airport in city['airports']:
                await airport_repo.get_or_create(
                    code = airport['code'],
                    name = airport['name'],
                    city = created_city
                )


if __name__ == '__main__':
    import asyncio
    asyncio.run(main())