from dataclasses import Field, asdict, field, fields
from typing import Literal, TypeVar, Generic, List, Optional, Type, Any, Dict, Tuple, get_type_hints, overload
from webbrowser import get
from core.base.entities.entity import Entity
from core.base.interfaces.repository import Repository
from infrastructure.base.models.peewee_models import Table, User, database
from peewee import DoesNotExist, ForeignKeyField, Model

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

    def transaction(self):
        return database.atomic

    def _convert_filters(self, **filters) -> Dict[str, Any]:
        converted_filters = {}
        for field, value in filters.items():
            if isinstance(value, Entity):
                if isinstance(getattr(self.model, field), ForeignKeyField):
                    converted_filters[field] = getattr(value, getattr(self.model, field).rel_field.name)
                else:
                    converted_filters[field] = value.id
            else:
                converted_filters[field] = value
        return converted_filters


    def _to_entity(self, model: TModel):
        model_data = {}
        for key in(getattr(model, '_meta').fields.keys()):
            value = getattr(model, key)
            if isinstance(value, Table):
                model_data[key] = value.id
            else:
                model_data[key] = value
        return(self.entity(**model_data))
    
    
    def _to_model(self, entity: TEntity) -> TModel:
        entity_data = asdict(entity)
        
        model_data = {}
        for field_name in getattr(self.model, '_meta').fields.keys():
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
        filters = self._convert_filters(**kwargs)
        defaults_filters = {}
        if not defaults == {} and not defaults is None:
            defaults_filters = self._convert_filters(**defaults)
        instance, is_created = self.model.get_or_create(defaults=defaults_filters, **filters)
        if auto_error and not is_created:
            raise self._400_integrity
        if auto_error:
            return self._to_entity(instance)
            
        return (self._to_entity(instance), is_created)


    def update_all(self, update_data: Dict[str, Any], **where) -> int:
        filters = self._convert_filters(**where)
        defaults_filters = self._convert_filters(**update_data)
        query = self.model.update(**defaults_filters)
        for field, value in filters.items():
            if not hasattr(self.model, field):
                raise self._field_not_exist(field)
            query = query.where(getattr(self.model, field) == value)
        return query.execute()


    @overload
    def get_or_none(self, auto_error: Literal[False], **kwargs) -> Optional[TEntity]: ...

    @overload
    def get_or_none(self, auto_error: Literal[True], **kwargs) -> TEntity: ...

    def get_or_none(self, auto_error: bool = False, **kwargs) -> Optional[TEntity]:
        filters = self._convert_filters(**kwargs)
        try:
            query = []
            for field, value in filters.items():
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


    def select(self, **where) -> List[TEntity]:
        filters = self._convert_filters(**where)
        select = self.model.select()
        for field, value in filters.items():
            if hasattr(self.model, field):
                select = select.where(getattr(self.model, field) == value)
            else:
                raise self._field_not_exist(field)
        return [self._to_entity(instance) for instance in select]


    def count(self, **kwargs) -> int:
        filters = self._convert_filters(**kwargs)
        select = self.model.select()
        for field, value in filters.items():
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
    

    def add_fields(self, entity: Entity):
        model: TModel = self.model.get_by_id(entity.id)
        data = {}
        annotations = get_type_hints(self.entity)
        for field_name in getattr(self.model, '_meta').fields.keys():
            value = getattr(model, field_name)
            annotated_cls = annotations[field_name]
            if isinstance(value, Table):
                data[field_name] = self._to_entity_by_cls(value, annotated_cls)
            else:
                data[field_name] = value
        return self.entity(**data)


    def _to_entity_by_cls(self, model: Table, entity_cls):
        model_data = {}
        for key in(getattr(model, '_meta').fields.keys()):
            value = getattr(model, key)
            if isinstance(value, Table):
                model_data[key] = value.id
            else:
                model_data[key] = value
        return(entity_cls(**model_data))

