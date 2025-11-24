from dataclasses import Field
from datetime import datetime
from typing import Literal, TypeVar, Generic, List, Optional, Type, Any, Dict, Tuple, Union, overload

from sqlalchemy import DATETIME, DateTime, func, select, true
from core.common.entities.entity import Entity
from core.common.interfaces.repository import Repository
from infrastructure.common.database.postgres_database import Database
from sqlalchemy.ext.asyncio import AsyncSession

TModel = TypeVar('TModel', bound=Database.Table)
TEntity = TypeVar('TEntity', bound=Entity)
TCustomEntity = TypeVar('TCustomEntity', bound=Entity)


class RepositoryImpl(Generic[TModel, TEntity], Repository[TEntity]):
    def __init__(self, model: Type[TModel], entity: Type[TEntity], session: AsyncSession, custom_mapper: Optional[Dict[str, str]] = {}):
        self.model = model
        self.mapper = custom_mapper
        self.entity = entity
        self.session = session

        self._400_does_not_exist = ValueError(
            f'Object not found: {self.model.__name__}'
        )
        self._400_integrity = ValueError(
            f'Object {self.model.__name__} with this unique field already created'
        )
        self._404_not_fount = ValueError(
            f'Object of type {self.model.__name__} not found'
        )
        self._field_not_exist = lambda field: ValueError(
            f"Field {field} does not exist in {self.model.__name__}"
        )


    def _convert_filters(self, **filters) -> Dict[str, Any]:
        converted_filters = {}
        model_columns = self.model.__table__.columns
        for column in model_columns:
            if column.key not in filters and column.key[:-3] not in filters:
                continue


            if column.key.endswith('_id'):
                value = filters[column.key[:-3]]
                if isinstance(value, Entity):
                    value = value.id
            
            elif self.mapper and self.mapper[column.key]:
                field = self.mapper[column.key]
                value = filters[field]

            else:
                value = filters[column.key]
                
            converted_filters[column.key] = value   

        return converted_filters


    def _to_entity(self, model: TModel):
        model_data = {}
        for key in self.model.__table__.columns:
            value = getattr(model, key.key)
            field = key.key
            if key.key.endswith("_id"):
                field = key.key[:-3]
            elif self.mapper and self.mapper[key.key]:
                field = self.mapper[key.key]

            model_data[field] = value
        return(self.entity(**model_data))
    

    @staticmethod
    def _to_custom_entity(model: Database.Table, custom_entity: Type[TCustomEntity]):
        model_data = {}
        for key in model.__table__.columns:
            value = getattr(model, key.key)
            field = key.key
            if key.key.endswith("_id"):
                field = key.key[:-3]

            model_data[field] = value
        return(custom_entity(**model_data))


    @overload
    async def get_by_id(self, id: int, auto_error: Literal[True]) -> TEntity: ...

    @overload
    async def get_by_id(self, id: int, auto_error: Literal[False]) -> Optional[TEntity]: ...

    async def get_by_id(self, id: int, auto_error: bool = False) -> Optional[TEntity]:

        instance = (await self.session.execute(select(self.model).filter_by(id = id))).scalar_one_or_none()

        if not instance and not auto_error:
            return None

        elif not instance and auto_error:
            raise self._400_does_not_exist

        elif instance and auto_error:
            return self._to_entity(instance)
        
        elif instance and not auto_error:
            return self._to_entity(instance)


    @overload
    async def get_or_create(self, auto_error: Literal[True], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> TEntity: ...

    @overload
    async def get_or_create(self, auto_error: Literal[False], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

    @overload
    async def get_or_create(self, auto_error: None = None, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

    async def get_or_create(self, auto_error: Optional[bool] = False, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Any:
        filters = self._convert_filters(**kwargs)
        defaults_filters = self._convert_filters(**(defaults or {}))
        if not defaults:
            defaults = {}

        instance = (await self.session.execute(select(self.model).filter_by(**filters))).scalar_one_or_none()

        if auto_error and not instance:
            instance = self.model(**filters, **defaults_filters)
            self.session.add(instance)
            await self.session.flush()
            await self.session.refresh(instance)
            return self._to_entity(instance)

        elif auto_error and instance:
            raise self._400_integrity
        
        elif not auto_error and not instance:
            instance = self.model(**filters, **defaults_filters)
            self.session.add(instance)
            await self.session.flush()
            await self.session.refresh(instance)
            return self._to_entity(instance), True

        elif not auto_error and instance:
            return self._to_entity(instance), False


    # async def update_all(self, update_data: Dict[str, Any], **where) -> int:
    #     filters = self._convert_filters(**where)
    #     defaults_filters = self._convert_filters(**update_data)

    #     query = self.model.update(**defaults_filters)
    #     for field, value in filters.items():
    #         if not hasattr(self.model, field):
    #             raise self._field_not_exist(field)
    #         query = query.where(getattr(self.model, field) == value)

    #     return await query.aio_execute(self.database)


    @overload
    async def get_or_none(self, auto_error: Literal[False], **kwargs) -> Optional[TEntity]: ...

    @overload
    async def get_or_none(self, auto_error: Literal[True], **kwargs) -> TEntity: ...

    async def get_or_none(self, auto_error: bool = False, **kwargs) -> Optional[TEntity]:
        filters = self._convert_filters(**kwargs)
        print(filters)

        instance = (await self.session.execute(select(self.model).filter_by(**filters))).scalars().all()

        if not instance.__len__() and not auto_error:
            return None

        elif not instance.__len__() and auto_error:
            raise self._400_does_not_exist

        elif instance.__len__() and auto_error:
            return self._to_entity(instance[0])
        
        elif instance.__len__() and not auto_error:
            return self._to_entity(instance[0])


    async def select(self, **where) -> List[TEntity]:
        filters = self._convert_filters(**where)

        query = (await self.session.execute(select(self.model).filter_by(**filters))).scalars().all()

        return [self._to_entity(instance) for instance in query]
    

    async def count(self, **kwargs) -> int:
        query = (await self.session.execute(select(func.count(self.model.id)).filter_by(**kwargs))).scalar_one()
        return query


    async def delete(self, entity: TEntity) -> bool:
        model = (await self.session.execute(select(self.model).filter_by(id = entity.id))).scalar_one_or_none()

        if not model:
            return False
        
        await self.session.delete(model)
        await self.session.flush()
        return True


    async def save(self, entity: TEntity):
        if hasattr(entity, 'id') and entity.id:
            instance = (await self.session.execute(select(self.model).filter_by(id = entity.id))).scalar_one_or_none()

            if not instance:
                raise self._400_does_not_exist

            for column in instance.__table__.columns:
                if column.key.endswith('_id'):
                    value = getattr(entity, column.key[:-3])
                    
                    if isinstance(value, Entity):
                        value = value.id
                    
                elif isinstance(column.type, DateTime):
                    if isinstance(getattr(entity, column.key), str):
                        value = datetime.fromisoformat(getattr(entity, column.key))
                    else:
                        value = getattr(entity, column.key)
                else:
                    value = getattr(entity, column.key)

                setattr(instance, column.key, value)
            
            await self.session.flush()

            return self._to_entity(instance)

        raise self._404_not_fount
    
    
    async def load_relations(self, entity: TEntity, mapper: Dict[str | Field[Any] | Tuple[str | Field[Any]], "Repository"]):
        for key, repo in mapper.items():
            if isinstance(key, Field):
                value = await repo.get_by_id(getattr(entity, key.name), True)
                setattr(entity, key.name, value)
                continue

            elif isinstance(key, str):
                value = await repo.get_by_id(getattr(entity, key), True)
                setattr(entity, key, value)
                continue

            elif isinstance(key, list):
                for field in key:
                    if isinstance(field, Field):
                        value = await repo.get_by_id(getattr(entity, field.name), True)
                        setattr(entity, field.name, value)
                        continue

                    else:
                        value = await repo.get_by_id(getattr(entity, field), True)
                        setattr(entity, field, value)
                        continue

        return entity
