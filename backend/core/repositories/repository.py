from abc import ABC, abstractmethod
from typing import Any, Dict, List, Literal, Optional, Tuple, TypeVar, Generic, Type, overload

TEntity = TypeVar('TEntity')

class Repository(Generic[TEntity], ABC):
    """Базовый репозиторий с общей логикой"""
    
    def __init__(self, entity_class: Type[TEntity]):
        self.entity_class = entity_class
    
    @overload
    def get_by_id(self, id: int, auto_error: Literal[True]) -> TEntity: ...

    @overload
    def get_by_id(self, id: int, auto_error: Literal[False]) -> Optional[TEntity]: ...
    
    def get_by_id(self, id: int, auto_error: bool = False) -> Optional[TEntity]: ...


    @overload
    def get_or_create(self, auto_error: Literal[True], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> TEntity: ...

    @overload
    def get_or_create(self, auto_error: Literal[False], defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

    @overload
    def get_or_create(self, auto_error: None = None, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Tuple[TEntity, bool]: ...

    def get_or_create(self, auto_error: Optional[bool] = False, defaults: Optional[Dict[str, Any]] = None, **kwargs) -> Any: ...
    

    @overload
    def get_or_none(self, auto_error: Literal[False], **kwargs) -> Optional[TEntity]: ...

    @overload
    def get_or_none(self, auto_error: Literal[True], **kwargs) -> TEntity: ...
    
    def get_or_none(self, auto_error: bool = False, **kwargs) -> Optional[TEntity]: ...


    def update_all(self, update_data: Dict[str, Any], **where) -> int: ...
    
    @abstractmethod
    def select(self, **filters) -> List[TEntity]: ...
    

    @abstractmethod
    def delete(self, entity: TEntity) -> bool: ... 


    @abstractmethod
    def save(self, entity: TEntity) -> TEntity: ...