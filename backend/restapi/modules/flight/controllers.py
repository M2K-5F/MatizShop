from fastapi import APIRouter, Depends, Query

from core.modules.flight.services.flight_service import FlightService
from containers.di import di_container


flight_router = APIRouter(prefix='/flights')
@flight_router.get('/search/cities')
async def get_cities(
    query: str = Query(),
    service: FlightService = Depends(di_container.get_flight_service)
):
    return service.get_cities_by_query(query)