from pydantic import BaseModel, field_validator
from validators import email


class User(BaseModel):
    phone_number: int
    password: str

class AuthUser(User):
    remember: bool = False


class RegisterUser(User):
    email_address: str
    username: str

    @field_validator('email_address')
    def validate_email(cls, v):
        if email(v):
            return v
        raise ValueError('unvalid email')