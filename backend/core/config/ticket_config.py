from typing import List, TypedDict

class FlightLocation(TypedDict):
    city: str
    time: str
    date: str

class Flight(TypedDict):
    id: int
    airline: str
    flightNumber: str
    departure: FlightLocation
    arrival: FlightLocation
    duration: str
    price: int
    type: str
    seats: int

flights_data: List[Flight] = [
    {
        "id": 1,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 245",
        "departure": {"city": "SVO", "time": "08:30", "date": "15 дек"},
        "arrival": {"city": "IST", "time": "11:45", "date": "15 дек"},
        "duration": "3ч 15м",
        "price": 15600,
        "type": "Эконом",
        "seats": 24
    },
    {
        "id": 2,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 247",
        "departure": {"city": "SVO", "time": "14:20", "date": "15 дек"},
        "arrival": {"city": "IST", "time": "17:35", "date": "15 дек"},
        "duration": "3ч 15м",
        "price": 14200,
        "type": "Эконом",
        "seats": 12
    },
    {
        "id": 3,
        "airline": "SkyWings Premium",
        "flightNumber": "SW 249",
        "departure": {"city": "SVO", "time": "19:45", "date": "15 дек"},
        "arrival": {"city": "IST", "time": "23:00", "date": "15 дек"},
        "duration": "3ч 15м",
        "price": 23400,
        "type": "Бизнес",
        "seats": 8
    },
    {
        "id": 4,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 251",
        "departure": {"city": "VKO", "time": "06:15", "date": "16 дек"},
        "arrival": {"city": "DXB", "time": "13:30", "date": "16 дек"},
        "duration": "5ч 15м",
        "price": 28700,
        "type": "Эконом",
        "seats": 18
    },
    {
        "id": 5,
        "airline": "SkyWings Premium",
        "flightNumber": "SW 253",
        "departure": {"city": "SVO", "time": "11:00", "date": "16 дек"},
        "arrival": {"city": "DXB", "time": "18:15", "date": "16 дек"},
        "duration": "5ч 15м",
        "price": 41200,
        "type": "Бизнес",
        "seats": 6
    },
    {
        "id": 6,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 255",
        "departure": {"city": "LED", "time": "09:45", "date": "15 дек"},
        "arrival": {"city": "IST", "time": "12:20", "date": "15 дек"},
        "duration": "2ч 35м",
        "price": 13800,
        "type": "Эконом",
        "seats": 15
    },
    {
        "id": 7,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 257",
        "departure": {"city": "LED", "time": "16:30", "date": "15 дек"},
        "arrival": {"city": "AYT", "time": "20:10", "date": "15 дек"},
        "duration": "3ч 40м",
        "price": 16700,
        "type": "Эконом",
        "seats": 22
    },
    {
        "id": 8,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 259",
        "departure": {"city": "DME", "time": "07:20", "date": "17 дек"},
        "arrival": {"city": "BKK", "time": "22:45", "date": "17 дек"},
        "duration": "9ч 25м",
        "price": 34500,
        "type": "Эконом",
        "seats": 10
    },
    {
        "id": 9,
        "airline": "SkyWings Premium",
        "flightNumber": "SW 261",
        "departure": {"city": "SVO", "time": "13:10", "date": "17 дек"},
        "arrival": {"city": "BKK", "time": "04:35", "date": "18 дек"},
        "duration": "9ч 25м",
        "price": 52300,
        "type": "Бизнес",
        "seats": 4
    },
    {
        "id": 10,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 263",
        "departure": {"city": "SVX", "time": "08:50", "date": "16 дек"},
        "arrival": {"city": "SVO", "time": "10:20", "date": "16 дек"},
        "duration": "2ч 30м",
        "price": 8900,
        "type": "Эконом",
        "seats": 28
    },
    {
        "id": 11,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 265",
        "departure": {"city": "AER", "time": "12:15", "date": "15 дек"},
        "arrival": {"city": "VKO", "time": "14:45", "date": "15 дек"},
        "duration": "2ч 30м",
        "price": 11200,
        "type": "Эконом",
        "seats": 20
    },
    {
        "id": 12,
        "airline": "SkyWings Premium",
        "flightNumber": "SW 267",
        "departure": {"city": "AER", "time": "18:30", "date": "15 дек"},
        "arrival": {"city": "SVO", "time": "21:00", "date": "15 дек"},
        "duration": "2ч 30м",
        "price": 18700,
        "type": "Бизнес",
        "seats": 5
    },
    {
        "id": 13,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 269",
        "departure": {"city": "KZN", "time": "10:40", "date": "16 дек"},
        "arrival": {"city": "IST", "time": "13:50", "date": "16 дек"},
        "duration": "3ч 10м",
        "price": 15400,
        "type": "Эконом",
        "seats": 16
    },
    {
        "id": 14,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 271",
        "departure": {"city": "OVB", "time": "05:30", "date": "17 дек"},
        "arrival": {"city": "DME", "time": "08:10", "date": "17 дек"},
        "duration": "4ч 40м",
        "price": 13400,
        "type": "Эконом",
        "seats": 25
    },
    {
        "id": 15,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 273",
        "departure": {"city": "SVO", "time": "15:45", "date": "18 дек"},
        "arrival": {"city": "HKT", "time": "06:20", "date": "19 дек"},
        "duration": "8ч 35м",
        "price": 29800,
        "type": "Эконом",
        "seats": 14
    },
    {
        "id": 16,
        "airline": "SkyWings Premium",
        "flightNumber": "SW 275",
        "departure": {"city": "SVO", "time": "21:20", "date": "18 дек"},
        "arrival": {"city": "HKT", "time": "11:55", "date": "19 дек"},
        "duration": "8ч 35м",
        "price": 45600,
        "type": "Бизнес",
        "seats": 3
    },
    {
        "id": 17,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 277",
        "departure": {"city": "KGD", "time": "11:10", "date": "16 дек"},
        "arrival": {"city": "VKO", "time": "13:00", "date": "16 дек"},
        "duration": "1ч 50м",
        "price": 10200,
        "type": "Эконом",
        "seats": 30
    },
    {
        "id": 18,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 279",
        "departure": {"city": "SVO", "time": "09:25", "date": "19 дек"},
        "arrival": {"city": "EVN", "time": "13:05", "date": "19 дек"},
        "duration": "3ч 40м",
        "price": 12300,
        "type": "Эконом",
        "seats": 19
    },
    {
        "id": 19,
        "airline": "SkyWings Airlines",
        "flightNumber": "SW 281",
        "departure": {"city": "DME", "time": "17:50", "date": "19 дек"},
        "arrival": {"city": "TBS", "time": "21:30", "date": "19 дек"},
        "duration": "3ч 40м",
        "price": 11800,
        "type": "Эконом",
        "seats": 21
    },
    {
        "id": 20,
        "airline": "SkyWings Premium",
        "flightNumber": "SW 283",
        "departure": {"city": "SVO", "time": "14:00", "date": "20 дек"},
        "arrival": {"city": "LHR", "time": "16:30", "date": "20 дек"},
        "duration": "4ч 30м",
        "price": 38900,
        "type": "Бизнес",
        "seats": 7
    }
]