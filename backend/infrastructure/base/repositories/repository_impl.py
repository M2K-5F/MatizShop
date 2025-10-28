from dataclasses import asdict, fields
from typing import Literal, TypeVar, Generic, List, Optional, Type, Any, Dict, Tuple, overload
from core.base.entities.entity import Entity
from core.base.interfaces.repository import Repository
from infrastructure.base.models.peewee_models import Table
from peewee import DoesNotExist

TModel = TypeVar('TModel', bound=Table)
TEntity = TypeVar('TEntity', bound=Entity)

class RepositoryImpl(Generic[TModel, TEntity], Repository[TEntity]):
    def __init__(self, model: Type[TModel], entity: Type[TEntity]):
        self.model = model
        self.entity = entity

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


    def _to_entity(self, model: TModel):
        """Автоматическое преобразование модели Peewee в dataclass сущность"""
        model_data = {}
        for key in(getattr(model, '_meta').fields.keys()):
            model_data[key] = getattr(model, key)
        return(self.entity(**model_data))
    
    def _to_model(self, entity: TEntity) -> TModel:
        """Автоматическое преобразование dataclass сущности в модель Peewee"""
        entity_data = asdict(entity)
        
        model_data = {}
        for field_name in entity_data.keys():
            if field_name in entity_data:
                model_data[field_name] = entity_data[field_name]
        
        return self.model(**model_data)



    @overload
    def get_by_id(self, id: int, auto_error: Literal[True]) -> TEntity: ...

    @overload
    def get_by_id(self, id: int, auto_error: Literal[False]) -> Optional[TEntity]: ...

    def get_by_id(self, id: int, auto_error: bool = False) -> Optional[TEntity]:
        try:
            return self._to_entity(self.model.get_by_id(id))
        except DoesNotExist:
            if not auto_error:
                return None
            else:
                raise self._400_does_not_exist


    @overload
    def get_or_create(self, auto_error: Literal[True], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> TEntity: ...

    @overload
    def get_or_create(self, auto_error: Literal[False], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

    @overload
    def get_or_create(self, auto_error: None = None, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

    def get_or_create(self, auto_error: Optional[bool] = False, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Any:
        instance, is_created = self.model.get_or_create(defaults=defaults, **kwargs)
        if auto_error and not is_created:
            raise self._400_integrity
        if auto_error:
            return self._to_entity(instance)
            
        return (self._to_entity(instance), is_created)


    def update_all(self, update_data: Dict[str, Any], **where) -> int:
        query = self.model.update(**update_data)
        for field, value in where.items():
            if not hasattr(self.model, field):
                raise self._field_not_exist(field)
            query = query.where(getattr(self.model, field) == value)
        return query.execute()


    @overload
    def get_or_none(self, auto_error: Literal[False], **kwargs) -> Optional[TEntity]: ...

    @overload
    def get_or_none(self, auto_error: Literal[True], **kwargs) -> TEntity: ...

    def get_or_none(self, auto_error: bool = False, **kwargs) -> Optional[TEntity]:
        try:
            query = []
            for field, value in kwargs.items():
                if hasattr(self.model, field):
                    query.append(getattr(self.model, field) == value)
                else:
                    raise self._field_not_exist(field)
            instance = self.model.get(*query)
            return self._to_entity(instance)
        except DoesNotExist:
            if not auto_error:
                return None
            else:
                raise self._400_does_not_exist


    def select(self, **filters) -> List[TEntity]:
        select = self.model.select()
        for field, value in filters.items():
            if hasattr(self.model, field):
                select = select.where(getattr(self.model, field) == value)
            else:
                raise self._field_not_exist(field)
        return [self._to_entity(instance) for instance in select]


    def count(self, **kwargs) -> int:
        select = self.model.select()
        for field, value in kwargs.items():
            if hasattr(self.model, field):
                select = select.where(getattr(self.model, field) == value)
            else:
                raise self._field_not_exist(field)
        return select.count()


    def delete(self, entity: TEntity) -> bool:
        try:
            existing = self.model.get_by_id(entity.id)
            return existing.delete_instance() > 0
        except DoesNotExist:
            return False


    def save(self, entity: TEntity):
        if hasattr(entity, 'id') and entity.id:
            try:
                existing = self.model.get_by_id(entity.id)
                for field in existing._meta.fields.keys():
                    if hasattr(entity, field):
                        setattr(existing, field, getattr(entity, field))
                existing.save()
                return self._to_entity(existing)
            except DoesNotExist: ...
        
        model = self._to_model(entity)
        model.save()
        
        if hasattr(entity, 'id'):
            entity.id = getattr(model, 'id')
            
        return self._to_entity(model)
    



#     from dataclasses import asdict
# from typing import Literal, TypeVar, Generic, List, Optional, Type, Any, Dict, Tuple, overload
# from core.entities.entity import Entity
# from core.repositories.repository import Repository
# from infrastructure.models.peewee_models import Table
# from peewee import DoesNotExist

# TModel = TypeVar('TModel', bound=Table)
# TEntity = TypeVar('TEntity', bound=Entity)

# class RepositoryImpl(Generic[TModel, TEntity], Repository[TEntity]):
#     def __init__(self, model: Type[TModel], entity: Type[TEntity]):
#         self.model = model
#         self.entity = entity

#         self._400_does_not_exist = ValueError(
#             f'Object not found: {self.model.__name__}'
#         )
#         self._400_integrity = ValueError(
#             f'Object {self.model.__name__} with this unique field already created'
#         )
#         self._404_not_fount = ValueError(
#             f'Object of type {self.model.__name__} not found'
#         )
#         self._field_not_exist = lambda field: ValueError(
#             f"Field {field} does not exist in {self.model.__name__}"
#         )

#     def _to_entity(self, model: TModel) -> TEntity:
#         """Автоматическое преобразование модели Peewee в dataclass сущность"""
#         model_data = {}
#         for key in model._meta.fields.keys():
#             model_data[key] = getattr(model, key)
#         return self.entity(**model_data)
    
#     def _to_model(self, entity: TEntity) -> TModel:
#         """Автоматическое преобразование dataclass сущности в модель Peewee"""
#         entity_data = asdict(entity)
        
#         model_data = {}
#         for field_name in self.model._meta.fields.keys():  # Только поля модели
#             if field_name in entity_data:
#                 model_data[field_name] = entity_data[field_name]
        
#         return self.model(**model_data)

#     def _convert_filters(self, **filters) -> Dict[str, Any]:
#         """Преобразовать фильтры, где значения могут быть сущностями, в модели"""
#         converted_filters = {}
#         for field, value in filters.items():
#             if isinstance(value, Entity) and hasattr(value, 'id'):
#                 # Если значение - сущность, берем ее ID
#                 converted_filters[field] = value.id
#             else:
#                 converted_filters[field] = value
#         return converted_filters

#     def _convert_entity_to_id(self, entity_or_id: Any) -> Any:
#         """Преобразовать сущность в ID, если это сущность"""
#         if isinstance(entity_or_id, Entity) and hasattr(entity_or_id, 'id'):
#             return entity_or_id.id
#         return entity_or_id

#     @overload
#     def get_by_id(self, id: int, auto_error: Literal[True]) -> TEntity: ...

#     @overload
#     def get_by_id(self, id: int, auto_error: Literal[False]) -> Optional[TEntity]: ...

#     def get_by_id(self, id: int, auto_error: bool = False) -> Optional[TEntity]:
#         try:
#             entity_id = self._convert_entity_to_id(id)
#             return self._to_entity(self.model.get_by_id(entity_id))
#         except DoesNotExist:
#             if not auto_error:
#                 return None
#             else:
#                 raise self._400_does_not_exist

#     @overload
#     def get_or_create(self, auto_error: Literal[True], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> TEntity: ...

#     @overload
#     def get_or_create(self, auto_error: Literal[False], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

#     @overload
#     def get_or_create(self, auto_error: None = None, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

#     def get_or_create(self, auto_error: Optional[bool] = False, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Any:
#         # Преобразуем фильтры
#         converted_kwargs = self._convert_filters(**kwargs)
#         converted_defaults = self._convert_filters(**(defaults or {}))
        
#         instance, is_created = self.model.get_or_create(defaults=converted_defaults, **converted_kwargs)
#         if auto_error and not is_created:
#             raise self._400_integrity
#         if auto_error:
#             return self._to_entity(instance)
            
#         return (self._to_entity(instance), is_created)

#     def update_all(self, update_data: Dict[str, Any], **where) -> int:
#         # Преобразуем данные для обновления и условия
#         converted_update_data = self._convert_filters(**update_data)
#         converted_where = self._convert_filters(**where)
        
#         query = self.model.update(**converted_update_data)
#         for field, value in converted_where.items():
#             if not hasattr(self.model, field):
#                 raise self._field_not_exist(field)
#             query = query.where(getattr(self.model, field) == value)
#         return query.execute()

#     @overload
#     def get_or_none(self, auto_error: Literal[False], **kwargs) -> Optional[TEntity]: ...

#     @overload
#     def get_or_none(self, auto_error: Literal[True], **kwargs) -> TEntity: ...
    
#     def get_or_none(self, auto_error: bool = False, **kwargs) -> Optional[TEntity]:
#         try:
#             # Преобразуем фильтры
#             converted_kwargs = self._convert_filters(**kwargs)
            
#             query = []
#             for field, value in converted_kwargs.items():
#                 if hasattr(self.model, field):
#                     query.append(getattr(self.model, field) == value)
#                 else:
#                     raise self._field_not_exist(field)
#             instance = self.model.get(*query)
#             return self._to_entity(instance)
#         except DoesNotExist:
#             if not auto_error:
#                 return None
#             else:
#                 raise self._400_does_not_exist

#     def select(self, **filters) -> List[TEntity]:
#         # Преобразуем фильтры
#         converted_filters = self._convert_filters(**filters)
        
#         select = self.model.select()
#         for field, value in converted_filters.items():
#             if hasattr(self.model, field):
#                 select = select.where(getattr(self.model, field) == value)
#             else:
#                 raise self._field_not_exist(field)
#         return [self._to_entity(instance) for instance in select]

#     def count(self, **kwargs) -> int:
#         # Преобразуем фильтры
#         converted_kwargs = self._convert_filters(**kwargs)
        
#         select = self.model.select()
#         for field, value in converted_kwargs.items():
#             if hasattr(self.model, field):
#                 select = select.where(getattr(self.model, field) == value)
#             else:
#                 raise self._field_not_exist(field)
#         return select.count()

#     def delete(self, entity: TEntity) -> bool:
#         try:
#             entity_id = self._convert_entity_to_id(entity)
#             existing = self.model.get_by_id(entity_id)
#             return existing.delete_instance() > 0
#         except DoesNotExist:
#             return False

#     def save(self, entity: TEntity) -> TEntity:
#         if hasattr(entity, 'id') and entity.id:
#             try:
#                 existing = self.model.get_by_id(entity.id)
#                 for field in existing._meta.fields.keys():
#                     if hasattr(entity, field):
#                         setattr(existing, field, getattr(entity, field))
#                 existing.save()
#                 return self._to_entity(existing)
#             except DoesNotExist:
#                 pass
        
#         model = self._to_model(entity)
#         model.save()
        
#         if hasattr(entity, 'id'):
#             entity.id = model.id
            
#         return self._to_entity(model)