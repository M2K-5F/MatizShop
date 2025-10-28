from dataclasses import dataclass
from datetime import datetime
from typing import Optional


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