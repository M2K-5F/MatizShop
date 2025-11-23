from fastapi import APIRouter, Body, Depends, Query

from core.modules.admin.services.admin_service import AdminService
from restapi.modules.admin.dependencies import get_admin_service
from restapi.modules.admin.shemas import CreateFlightForm
from restapi.modules.common.dependencies import is_admin


admin_router = APIRouter(prefix="/admin", dependencies=[Depends(is_admin)])


@admin_router.get('/summary')
async def get_summary_stats(
    service: AdminService = Depends(get_admin_service),
):
    return await service.get_summary_info()


@admin_router.get('/users')
async def get_admins_info(
    service: AdminService = Depends(get_admin_service),
):
    return await service.get_user_info()


@admin_router.get('/flights')
async def get_flights_info(
    service: AdminService = Depends(get_admin_service),
):
    return await service.get_flights_info()


@admin_router.get('/airports')
async def get_airports_by_city(
    tag = Query(),
    service: AdminService = Depends(get_admin_service),
):
    return await service.get_airports_by_city(tag)


@admin_router.post('/create_flight')
async def create_flight(
    flight_data: CreateFlightForm = Body(),
    service: AdminService = Depends(get_admin_service),
):
    return await service.create_flight(flight_data)