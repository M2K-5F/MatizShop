from core.modules.auth.interfaces.password_hasher import PasswordHasher
from bcrypt import checkpw, gensalt, hashpw

class PasswordHasherImpl(PasswordHasher):
    @classmethod
    def hash(cls, password: str) -> str:
        pwd_bytes = password.encode()
        hashed = hashpw(pwd_bytes, gensalt())
        return hashed.decode()
    
    @classmethod
    def verify(cls, password: str, hashed: str) -> bool:
        pwd_bytes = password.encode()
        hashed_bytes = hashed.encode()
        return checkpw(pwd_bytes, hashed_bytes)
