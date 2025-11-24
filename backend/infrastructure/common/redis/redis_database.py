import json
import os
from typing import Any, Type, TypeVar
from dotenv import load_dotenv
import redis
import redis.asyncio

from core.common.entities.entity import Entity
TEntity = TypeVar('TEntity', bound=Entity)


class RedisDatabase():
    def __init__(self):
        load_dotenv()
        self.client = redis.asyncio.Redis(
            host=os.environ["REDIS_HOST"],
            port=int(os.environ["REDIS_PORT"]),
            decode_responses=True,
            socket_timeout=3
        )

    async def get_str(self, name: str, id: int) -> Any | None:
        return await self.client.get(f'{name}:{id}')


    async def set_str(self, name: str, id: int, value: Any):
        return await self.client.set(f'{name}:{id}', value)
    

    async def get_entity(self, e_id: int, entity_cls: Type[TEntity]) -> TEntity | None:
        name = entity_cls.__name__
        res = await self.client.get(f'{name}:{e_id}')
        if res is None:
            return None
        return entity_cls(**(json.loads(res)))



    async def set_entity(self, entity: Entity):
        e_id = entity.id
        name = entity.__class__.__name__
        value = entity.to_dict(0)
        value = json.dumps(value)
        return await self.client.set(f'{name}:{e_id}', value)