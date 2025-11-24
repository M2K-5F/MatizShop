from fastapi import Depends

from containers.di import DIContainer
from restapi.modules.common.dependencies import get_db_session, get_di_container, get_redis_client, get_user_from_request


def get_flight_service(
    current_user = Depends(get_user_from_request),
    container: DIContainer = Depends(get_di_container),
    redis = Depends(get_redis_client),
    session = Depends(get_db_session)
):
    return container.get_flight_service(session, current_user, redis)
