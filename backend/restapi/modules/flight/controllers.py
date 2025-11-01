from fastapi import APIRouter, Body, Depends, Query

from core.modules.flight.services.flight_service import FlightService
from containers.di import di_container
from restapi.modules.flight.shemas import FlightsByCities


flight_router = APIRouter(prefix='/flights')


@flight_router.get('/search/cities')
async def get_cities(
    query: str = Query(default=''),
    service: FlightService = Depends(di_container.get_flight_service)
):
    return service.get_cities_by_query(query)


@flight_router.post('/search/flights')
async def get_flights_by_cities(
    cities: FlightsByCities = Body(),
    service: FlightService = Depends(di_container.get_flight_service)
):
    return service.get_flights_by_cities(cities.departure_city_tag, cities.arrival_city_tag)