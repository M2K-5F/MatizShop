from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Time, select
from infrastructure.common.impls.password_hasher_impl import PasswordHasherImpl
from infrastructure.common.models.SQLAlchemy.postgres_database import Database


class User(Database.Table):
    __tablename__ = 'users'

    username = Column(String(64))
    password_hash = Column(String)
    email_address = Column(String(128))
    phone_number = Column(String(11), unique=True, index=True)


class Role(Database.Table):
    __tablename__ = "roles"
    
    name = Column(String, unique=True, index=True)

class UserRole(Database.Table):
    __tablename__ = "user_roles"
    
    user_id = Column(Integer, ForeignKey("users.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))

class City(Database.Table):
    __tablename__ = "cities"
    
    tag = Column(String(4), unique=True, index=True)
    name = Column(String)
    country = Column(String)


class Airport(Database.Table):
    __tablename__ = "airports"
    
    code = Column(String)
    name = Column(String)
    city_id = Column(Integer, ForeignKey("cities.id"))


class Plane(Database.Table):
    __tablename__ = "planes"
    
    name = Column(String)
    business_class_count = Column(Integer)
    economy_class_count = Column(Integer)


class Seat(Database.Table):
    __tablename__ = "seats"
    
    seat_class = Column(String)
    seat_name = Column(String)
    seat_number = Column(Integer)
    plane_id = Column(Integer, ForeignKey("planes.id"))


class Flight(Database.Table):
    __tablename__ = "flights"
    
    tag = Column(String)
    departure_id = Column(Integer, ForeignKey("airports.id"))
    arrival_id = Column(Integer, ForeignKey("airports.id"))
    departure_time = Column(DateTime)
    arrival_time = Column(DateTime)
    duration = Column(Time)
    min_price = Column(Integer)
    seats_left = Column(Integer)
    plane_id = Column(Integer, ForeignKey("planes.id"))
    allowed_business = Column(Boolean, default=True)
    

class FlightSeat(Database.Table):
    __tablename__ = "flight_seats"
    
    seat_id = Column(Integer, ForeignKey("seats.id"))
    flight_id = Column(Integer, ForeignKey("flights.id"))
    price = Column(Integer)
    is_occupied = Column(Boolean, default=False)
    

class UserFlight(Database.Table):
    __tablename__ = "user_flights"
    
    flight_seat_id = Column(Integer, ForeignKey("flight_seats.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    
