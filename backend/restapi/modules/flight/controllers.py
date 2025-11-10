from fastapi import APIRouter, Body, Depends, Query

from core.modules.flight.services.flight_service import FlightService
from restapi.modules.common.dependencies import with_transaction
from restapi.modules.flight.dependencies import get_flight_service
from restapi.modules.flight.shemas import FlightsByCities


flight_router = APIRouter(prefix='/flights')


@flight_router.get('/search/cities')
async def get_cities(
    query: str = Query(default=''),
    service: FlightService = Depends(get_flight_service),
    txn = Depends(with_transaction)
):
    return service.get_cities_by_query(query)


@flight_router.post('/search/flights')
async def get_flights_by_cities(
    cities: FlightsByCities = Body(),
    service: FlightService = Depends(get_flight_service),
    txn = Depends(with_transaction),
):
    return service.get_flights_by_cities(cities.departure_city_tag, cities.arrival_city_tag, cities.date)