from dataclasses import dataclass, fields
from datetime import datetime
from typing import Any, Dict, Optional


@dataclass
class Entity:
    id: Optional[int]
    created_at: Optional[datetime]

    @classmethod 
    def base_create(cls, **kwargs):
        return cls(
            id = None,
            created_at = None,
            **kwargs
        )
    

    def to_dict(self) -> Dict[str, Any]:
        field_dict = {}
        for field in fields(self):
            field_dict[field.name] = getattr(self, field.name)
        return field_dict