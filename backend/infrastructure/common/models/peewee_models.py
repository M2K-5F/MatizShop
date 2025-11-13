from datetime import datetime, timedelta
from email.errors import CharsetError
from peewee import Model, AutoField, DateTimeField, SqliteDatabase, CharField, IntegerField, ForeignKeyField, BooleanField, DateField, TimeField

from core.config import city_config
from core.config.ticket_config import flights_data
from core.modules.flight.interfaces import flight_repository
from infrastructure.common.models.base_locations import create_base_locations
from infrastructure.common.models.base_planes import create_base_planes
from infrastructure.common.models.base_users import create_base_users
from infrastructure.common.impls.password_hasher_impl import PasswordHasherImpl

database = SqliteDatabase("SQLite3Database.db")


class Table(Model):
    id = AutoField()
    created_at = DateTimeField(default=datetime.now().replace(microsecond=0))

    class Meta:
        database = database


class User(Table):
    username = CharField(max_length=64)
    password_hash = CharField()
    email_address = CharField(max_length=128)
    phone_number = CharField(max_length=9, unique=True)


class Role(Table):
    name = CharField()

class UserRole(Table):
    user = ForeignKeyField(User, backref='roles')
    role = ForeignKeyField(Role, field=Role.name)


class City(Table):
    tag = CharField(max_length=4)
    name = CharField()
    country = CharField()


class Airport(Table):
    code = CharField()
    name = CharField()
    city = ForeignKeyField(City, field=City.tag, backref='airports')


class Plane(Table):
    name = CharField()
    business_class_count = IntegerField()
    economy_class_count = IntegerField()


class Seat(Table):
    seat_class = CharField()
    seat_name = CharField()
    seat_number = IntegerField()
    plane = ForeignKeyField(Plane)


class Flight(Table):
    tag = CharField()
    departure = ForeignKeyField(Airport)
    arrival = ForeignKeyField(Airport)
    departure_time = DateTimeField()
    arrival_time = DateTimeField()
    duration = TimeField()
    min_price = IntegerField()
    seats_left = IntegerField()
    plane = ForeignKeyField(Plane)
    allowed_business = BooleanField(default=True)


class FlightSeat(Table):
    seat = ForeignKeyField(Seat)
    flight = ForeignKeyField(Flight)
    price = IntegerField()
    is_occupied = BooleanField(default=False)


class UserFlight(Table):
    flight_seat = ForeignKeyField(FlightSeat)
    user = ForeignKeyField(User)


@database.atomic()
def main():
    database.create_tables([
        Seat, FlightSeat, UserFlight,
        User, Role, UserRole, Plane,
        City, Airport, Flight , User
    ])

    admin = create_base_users(User, Role, UserRole)
    create_base_locations(Airport, City)
    mc_21, mc_21_seats_count = create_base_planes(Plane, Seat)

    created_business_flight, _ = Flight.get_or_create(
        tag = 'WS228',
        departure = Airport.get_or_none(Airport.city == City.get_or_none(City.tag == "MOW")),
        arrival = Airport.get_or_none(Airport.city == City.get_or_none(City.tag == 'IST')),
        departure_time = datetime(2025, 11, 20, 10, 00, 00),
        arrival_time = datetime(2025, 11, 20, 20),
        min_price = 15000,
        duration = timedelta(hours=10),
        seats_left = mc_21_seats_count,
        plane = mc_21,
        allowed_business = True
    )

    business_seats = list(Seat.select().where(Seat.plane == mc_21, Seat.seat_class == 'BUSINESS'))
    for index, seat in enumerate(business_seats):
        flight_seat, _ = FlightSeat.get_or_create(
            flight = created_business_flight,
            seat = seat,
            price = 45000
        )
        if not index:
            UserFlight.get_or_create(
                flight_seat = flight_seat,
                user = admin
            )
    
    economy_seats = list(Seat.select().where(Seat.plane == mc_21, Seat.seat_class == 'ECONOMY'))
    for seat in economy_seats:
        FlightSeat.get_or_create(
            flight = created_business_flight,
            seat = seat,
            price = 15000
        )

if __name__ == '__main__':
    main()