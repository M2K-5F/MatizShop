from datetime import datetime 
from peewee import Model, AutoField, DateTimeField, SqliteDatabase, CharField, IntegerField, ForeignKeyField, BooleanField

from infrastructure.interfaces.password_hasher_impl import PasswordHasherImpl

from core.types.car import carTypes, transmissions, fuelTypes

database = SqliteDatabase("SQLite3Database.db")


class Table(Model):
    id = AutoField()
    created_at = DateTimeField(default=datetime.now())

    class Meta:
        database = database


class User(Table):
    username = CharField(max_length=64)
    password_hash = CharField()
    email_address = CharField(max_length=128)
    phone_number = CharField(max_length=9)


class Role(Table):
    name = CharField()

class UserRole(Table):
    user = ForeignKeyField(User)
    role = ForeignKeyField(Role, field=Role.name)


class Car(Table):
    brand = CharField(max_length=128)
    model = CharField(max_length=64)
    year = IntegerField()
    image_url = CharField()
    type = CharField()
    transmission = CharField()
    fuel_type = CharField()
    seats_count = IntegerField()
    description = CharField()


class CarRental(Table):
    car = ForeignKeyField(Car)
    rental_price = IntegerField()
    is_active = BooleanField(default=True)
    deployed_by = ForeignKeyField(User)


class CarSell(Table):
    car = ForeignKeyField(Car)
    sell_price = IntegerField()
    is_active = BooleanField(default=True)
    deployed_by = ForeignKeyField(User)



@database.atomic()
def main():
    database.create_tables([User, Role, UserRole, Car, CarRental, CarSell])

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

    base_matiz = Car.get_or_create(
        brand = "Daewoo",
        model = "Matiz pizdatiy",
        year = 2010,
        image_url = './',
        type = carTypes[1],
        transmission = transmissions[0],
        fuel_type = fuelTypes[0],
        seats_count = 4,
        description = 'ooochenn pizdatyi matizz'
    )


if __name__ == '__main__':
    main()