from pydantic import BaseModel


class User(BaseModel):
    phone_number: int
    password: str

class AuthUser(User):
    is_remember: bool = False


class RegisterUser(User):
    email_address: str
    username: str