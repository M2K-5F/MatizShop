import asyncio
from functools import wraps
import time
from core.modules.auth.services.auth import AuthService
from core.modules.flight.services.flight_service import FlightService
def measure_time(func):
    @wraps(func)
    async def async_wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        end = time.perf_counter()
        print(f"⏱️ {func.__name__} executed in {(end - start) * 1000:.2f}ms")
        return result
    
    @wraps(func)  
    def sync_wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"⏱️ {func.__name__} executed in {(end - start) * 1000:.2f}ms")
        return result
    
    return async_wrapper if asyncio.iscoroutinefunction(func) else sync_wrapper

class AdminService():
    def __init__(
            self,
            auth_service: AuthService,
            flight_service: FlightService
    ):
        self.auth_s = auth_service
        self.flight_s = flight_service
    
    
    async def get_summary_info(self):
        users_count = await self.auth_s.get_users_count()
        flights_count = await self.flight_s.get_flights_count()
        total_revenue, tickets_count = await self.flight_s.user_flight_repository.get_paginate_revenue()

        return {
            "users_count": users_count,
            "flights_count": flights_count,
            "tickets_count": tickets_count,
            "total_revenue": total_revenue
        }
    
    
    async def get_user_info(self):
        return await self.auth_s.get_admin_list()
    

    async def get_flights_info(self):
        return await self.flight_s.get_flights_info()
    

    async def get_airports_by_city(self, city_tag: str):
        return await self.flight_s.get_airports_by_city(city_tag)
    
    @measure_time
    async def create_flight(self, flight_data):
        departure_aip = await self.flight_s.airport_repo.get_by_id(flight_data.departure_airport_id, True)
        arrival_aip = await self.flight_s.airport_repo.get_by_id(flight_data.arrival_airport_id, True)
        plane = await self.flight_s.plane.get_by_id(flight_data.plane_id, True)
        created_flight = await self.flight_s.flight_repo.get_or_create(True,
            tag=flight_data.tag,
            departure=departure_aip,
            arrival = arrival_aip,
            departure_time = flight_data.departure_time,
            arrival_time = flight_data.arrival_time,
            duration = flight_data.arrival_time - flight_data.departure_time,
            min_price = flight_data.min_price,
            seats_left = plane.economy_class_count + plane.business_class_count,
            plane = plane,
            allowed_business = flight_data.allowed_business
        )

        business_seats = await self.flight_s.seat.select(
            plane=plane,
            seat_class="BUSINESS"
        )

        economy_seats = await self.flight_s.seat.select(
            plane=plane,
            seat_class="ECONOMY"
        )

        for seat in business_seats:
            await self.flight_s.flight_seat.get_or_create(
                True,
                seat = seat,
                flight = created_flight,
                price = int(flight_data.min_price) * 3,
                is_occupied = not flight_data.allowed_business
            )

        for seat in economy_seats:
            await self.flight_s.flight_seat.get_or_create(
                True, {},
                seat = seat,
                flight = created_flight,
                price = flight_data.min_price,
            )

        return created_flight
