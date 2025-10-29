from typing import Any, Dict, Union
from restapi.token.JWT_config import AuthJWT
from jwt import encode, decode


class JWTTokenizer:
    def __init__(self, config: AuthJWT) -> None:
        self._jwt_config = config

    def encode(self, payload: Dict[str, Any]):
        with open(self._jwt_config.private_key_path, "r") as f:
            private_key = f.read()
        to_encode = payload.copy()

        encoded = encode(
            to_encode,
            private_key,
            self._jwt_config.algorithm
        )

        return encoded
        
    def decode(self, token: str):
        with open(self._jwt_config.public_key_path, "r") as f:
            public_key = f.read()
        decoded = decode(
            token,
            public_key,
            [self._jwt_config.algorithm]
        )

        return decoded
    

