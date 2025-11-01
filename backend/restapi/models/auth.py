from pydantic import BaseModel


class AuthUser(BaseModel):
    phone_number: int
    password: str
    is_remember: bool = False