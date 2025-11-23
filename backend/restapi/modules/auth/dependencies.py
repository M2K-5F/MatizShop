from fastapi import Depends, Request
from containers.di import DIContainer
from restapi.modules.common.dependencies import get_db_session, get_di_container


async def get_auth_service(
    container: DIContainer = Depends(get_di_container),
    session = Depends(get_db_session)
):
    return container.get_auth_service(session)