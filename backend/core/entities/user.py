from dataclasses import dataclass, fields, replace

from core.entities.entity import Entity
from core.interfaces.password_hasher import PasswordHasher


@dataclass
class User(Entity):
    username: str = ''
    password_hash: str = ''
    email_address: str = ''
    phone_number: str = ''

    @classmethod
    def create(cls, login: str, username: str, password: str, hasher: PasswordHasher):
        password_hash = hasher.hash(password)
        return replace(
            cls.base_create(),
            login = login.strip(),
            username = username.strip(),
            _password_hash = password_hash
        )
    

    def change_password(self, current_password: str, new_password: str, hasher: PasswordHasher):
        if not hasher.verify(current_password, self.password_hash):
            raise ValueError('current password uncorrect')
        
        self.password_hash = hasher.hash(new_password)


    def change_username(self, new_username: str): 
        self.username = new_username


def to_model():
    for field in fields(User):
        print(field)