from fastapi import Depends, Request
from containers.di import DIContainer
from core.modules.auth.entities.user import User
from restapi.modules.common.dependencies import get_db_session, get_di_container, get_user_from_request


def get_admin_service(
    session = Depends(get_db_session),
    current_user = Depends(get_user_from_request), 
    container: DIContainer = Depends(get_di_container),
):
    return container.get_admin_service(session, current_user)
