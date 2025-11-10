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
    

    def to_dict(self, nesting: int = 0) -> Dict[str, Any]:
        field_dict = {}
        for field in fields(self):
            value = getattr(self, field.name)
            if isinstance(value, Entity):
                if nesting:
                    value = value.to_dict(nesting - 1)
                else:
                    value = value.id
            elif isinstance(value, datetime):
                field_dict[field.name] = value.isoformat()
            else:
                field_dict[field.name] = value

        return field_dict