from datetime import datetime
from peewee import Model, AutoField, DateTimeField, SqliteDatabase, CharField, IntegerField, ForeignKeyField, BooleanField

from core.config import city_config
from core.config.ticket_config import flights_data
from infrastructure.modules.auth.interfaces.password_hasher_impl import PasswordHasherImpl

database = SqliteDatabase("SQLite3Database.db")


class Table(Model):
    id = AutoField()
    created_at = DateTimeField(default=datetime.now().isoformat())

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


class FlightLocation(Table):
    airport_tag = ForeignKeyField(City, field=City.tag)
    time = CharField()
    date = CharField()


class Flight(Table):
    tag = CharField()
    departure = ForeignKeyField(FlightLocation)
    arrival = ForeignKeyField(FlightLocation)
    duration = CharField()
    price = IntegerField()
    type = CharField()
    seats_count = IntegerField()


class UserFlight(Table):
    flight = ForeignKeyField(Flight)
    user = ForeignKeyField(User)


@database.atomic()
def main():
    database.create_tables([
        User, Role, UserRole, 
        City, Airport, Flight, 
        FlightLocation, User
    ])

    admin_role, _ = Role.get_or_create(
        name = "ADMIN"
    )

    customer_role, _ = Role.get_or_create(
        name = "CUSTOMER"
    )

    base_admin, _ = User.get_or_create(
        username = 'admin',
        defaults={    
            "email_address": 'psina@pisos.kpk',
            "phone_number": '88001007393',
            "password_hash": PasswordHasherImpl.hash('12345')
        }
    )

    _, _ = UserRole.get_or_create(
        user = base_admin,
        role = admin_role
    )

    for city in city_config.cities_data:
        created_city, _ = City.get_or_create(
            tag = city['id'],
            name = city['name'],
            country = city['country']
        )

        for airport in city['airports']:
            Airport.get_or_create(
                code = airport['code'],
                name = airport['name'],
                city = created_city
            )

        
    for flight in flights_data:
        created_departure, _  = FlightLocation.get_or_create(
            airport_tag = flight['departure']['city'],
            time = flight['departure']['time'],
            date = flight['departure']['date']
        )
        created_arrival, _ = FlightLocation.get_or_create(
            airport_tag = flight['arrival']['city'],
            time = flight['arrival']['time'],
            date = flight['arrival']['date']
        )
        created_flight = Flight.get_or_create(
            tag = flight['flightNumber'],
            departure = created_departure,
            arrival = created_arrival,
            duration = flight['duration'],
            price = flight['price'],
            type = flight['type'],
            seats_count = flight['seats']
        )


if __name__ == '__main__':
    main()