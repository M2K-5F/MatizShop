from datetime import datetime
from pydantic import BaseModel

from core.modules.flight.entites.city import City


class CreateFlightForm(BaseModel):
    tag: str
    departure_city: City
    arrival_city: City
    departure_airport_id: int
    arrival_airport_id: int
    departure_time: datetime
    arrival_time: datetime
    plane_id: int
    min_price: str
    allowed_business: bool