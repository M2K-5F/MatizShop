from fastapi import Depends

from containers.di import di_container
from core.modules.auth.entities.user import User
from restapi.modules.common.dependencies import get_user_from_request


def get_admin_service(current_user = Depends(get_user_from_request)):
    return di_container.get_admin_service(current_user)
