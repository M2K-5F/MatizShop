from dataclasses import dataclass, fields
from datetime import datetime
from typing import Any, Dict, List, Optional


@dataclass
class Entity:
    id: int
    created_at: Optional[datetime]

    @classmethod 
    def base_create(cls, **kwargs):
        return cls(
            id = 0,
            created_at = None,
            **kwargs
        )

    

    def to_dict(self, nesting: int = 1, exclude: List[str] = ['created_at']) -> Dict[str, Any]:
        field_dict = {}
        for field in fields(self):
            if field.name in exclude:
                continue
            value = getattr(self, field.name)
            if isinstance(value, Entity):
                if nesting:
                    field_dict[field.name] = value.to_dict(nesting - 1)
                else:
                    field_dict[field.name] = value.id
            elif isinstance(value, datetime):
                field_dict[field.name] = value.isoformat()
            else:
                field_dict[field.name] = value

        return field_dict
    