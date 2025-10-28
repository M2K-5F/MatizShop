from abc import ABC, abstractmethod
from typing import Protocol


class PasswordHasher(Protocol):
    @classmethod
    def hash(cls, password: str) -> str: ...

    @classmethod
    def verify(cls, password: str, hashed: str) -> bool: ...