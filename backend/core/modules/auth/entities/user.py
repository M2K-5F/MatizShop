from dataclasses import dataclass, field, fields, replace
from typing import List, Literal

from core.common.entities.entity import Entity
from core.modules.auth.interfaces.password_hasher import PasswordHasher


@dataclass
class User(Entity):
    roles: List[Literal['ADMIN', 'CUSTOMER']] | List[str] = field(default_factory=list)
    username: str = ''
    password_hash: str = ''
    email_address: str = ''
    phone_number: str = ''

    @classmethod
    def create(cls, username: str, password: str, email_address: str, phone_number: int, hasher: PasswordHasher):
        password_hash = hasher.hash(password)
        
        return replace(
            cls.base_create(),
            username = username.strip(),
            email_address = email_address.strip(),
            phone_number = phone_number,
            password_hash = password_hash,
            roles = ['CUSTOMER']
        )
    

    def change_password(self, current_password: str, new_password: str, hasher: PasswordHasher):
        if not hasher.verify(current_password, self.password_hash):
            raise ValueError('current password uncorrect')
        
        self.password_hash = hasher.hash(new_password)


    def change_username(self, new_username: str): 
        self.username = new_username