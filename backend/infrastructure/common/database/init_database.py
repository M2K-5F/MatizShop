from datetime import datetime, timedelta
from infrastructure.common.database.data import test_city_data
from infrastructure.common.impls.password_hasher_impl import PasswordHasherImpl
from infrastructure.common.database.postgres_database import Database
from infrastructure.modules.auth.role_repository_impl import RoleRepositoryImpl
from infrastructure.modules.auth.user_reposirory_impl import UserRepositoryImpl
from infrastructure.modules.auth.user_role_repository_impl import UserRoleRepositoryImpl
from infrastructure.modules.flights.city_repository_impl import AirportRepositoryImpl, CityRepositoryImpl
from infrastructure.modules.flights.flight_repository_impl import FlightRepositoryImpl, FlightSeatRepositoryImpl, UserFlightRopositoryImpl
from infrastructure.modules.flights.plane_repository_impl import PlaneRopositoryImpl, SeatRopositoryImpl


async def main():
    database = Database(
        name='postgres',
        host='localhost',
        port='env',
        user='env',
        password='env'
    )
    await database.database_init()

    async with database.engine.begin() as conn:
        await conn.run_sync(Database.Table.metadata.create_all)

    async with database.get_session() as session:
        role_repo = RoleRepositoryImpl(session)
        user_repo = UserRepositoryImpl(session)
        user_role_repo = UserRoleRepositoryImpl(session)
        city_repo = CityRepositoryImpl(session)
        airport_repo = AirportRepositoryImpl(session)
        plane_repo = PlaneRopositoryImpl(session)
        seat_repo = SeatRopositoryImpl(session)
        flight_seat_repo = FlightSeatRepositoryImpl(session)
        user_flight_repo = UserFlightRopositoryImpl(session)
        flight_repo = FlightRepositoryImpl(session)


        admin_role, _ = await role_repo.get_or_create(name="ADMIN")
        customer_role, _ = await role_repo.get_or_create(name="CUSTOMER")
        
        user, _ = await user_repo.get_or_create(
            defaults= {
                "password_hash": PasswordHasherImpl.hash('12345'),
                "username": 'admin',
                "email_address": 'psina@pisos.kpk'
            },
            phone_number = '88001007393',
        )

        _, _ = await user_role_repo.get_or_create(
            user = user,
            role = admin_role
        )

        _, _ = await user_role_repo.get_or_create(
            user = user,
            role = customer_role
        )


        for city in test_city_data.cities_data:
            created_city, _ = await city_repo.get_or_create(
                tag = city['id'],
                name = city['name'],
                country = city['country'],
            )

            for airport in city['airports']:
                await airport_repo.get_or_create(
                    code = airport['code'],
                    name = airport['name'],
                    city = created_city
                )
        

        mc_21_plane, _ = await plane_repo.get_or_create(
            name = 'MC-21',
            business_class_count = 12,
            economy_class_count = 40
        )

        for i in range(mc_21_plane.business_class_count):
            await seat_repo.get_or_create(
                plane = mc_21_plane,
                seat_class = 'BUSINESS',
                seat_number = i + 1,
                seat_name = f'A{i + 1}'
            )

        
        for i in range(mc_21_plane.economy_class_count):
            await seat_repo.get_or_create(
                plane = mc_21_plane,
                seat_class = 'ECONOMY',
                seat_number = i + 1,
                seat_name = f'B{i + 1}',
            )

        moscow_city = await city_repo.get_or_none(True, tag = "MOW")
        istambul_city = await city_repo.get_or_none(True, tag = "IST")
        mow_aip = await airport_repo.get_or_none(True, city = moscow_city)
        ist_aip = await airport_repo.get_or_none(True, city = istambul_city)


        created_business_flight, _ = await flight_repo.get_or_create(
            tag = 'WS228',
            departure = mow_aip,
            arrival = ist_aip,
            departure_time = datetime(2025, 11, 20, 10, 00, 00),
            arrival_time = datetime(2025, 11, 20, 20),
            min_price = 15000,
            duration = timedelta(hours=10),
            seats_left = mc_21_plane.business_class_count + mc_21_plane.economy_class_count,
            plane = mc_21_plane,
            allowed_business = True
        )


        business_seats = await seat_repo.select(plane = mc_21_plane, seat_class = "BUSINESS")
        for index, seat in enumerate(business_seats):
            flight_seat, _ = await flight_seat_repo.get_or_create(
                flight = created_business_flight,
                seat = seat,
                price = 45000
            )
            if not index:
                await user_flight_repo.get_or_create(
                    flight_seat = flight_seat,
                    user = user
                )
        
        business_seats = await seat_repo.select(plane = mc_21_plane, seat_class = "ECONOMY")
        for index, seat in enumerate(business_seats):
            flight_seat, _ = await flight_seat_repo.get_or_create(
                flight = created_business_flight,
                seat = seat,
                price = 15000
            )


if __name__ == '__main__':
    import asyncio
    asyncio.run(main())