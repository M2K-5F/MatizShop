from fastapi import Depends

from containers.di import di_container
from restapi.modules.common.dependencies import get_user_from_request


def get_flight_service(current_user = Depends(get_user_from_request)):
    return di_container.get_flight_service(current_user)
