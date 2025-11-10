from containers.di import di_container


async def get_auth_service():
    return di_container.get_auth_service()