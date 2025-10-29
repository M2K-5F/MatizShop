from datetime import timedelta
from pathlib import Path

CERTS_DIR = Path(__file__).parent / "certs"


class AuthJWT():
    private_key_path: Path = CERTS_DIR / "jwt-private.pem"
    public_key_path: Path = CERTS_DIR / "jwt-public.pem"
    algorithm: str = "ES256"
    not_remembered_token_expire: timedelta = timedelta(minutes=15)
    remembered_token_exire: timedelta = timedelta(days=30)
    token_refresh_delta: timedelta = timedelta(minutes=3)