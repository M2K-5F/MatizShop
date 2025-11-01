from datetime import datetime
from pydantic import BaseModel


class FlightsByCities(BaseModel):
    departure_city_tag: str
    arrival_city_tag: str
    date: datetime