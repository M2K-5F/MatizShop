from typing import List, TypedDict

class Airport(TypedDict):
    code: str
    name: str

class City(TypedDict):
    id: str
    name: str
    airports: List[Airport]
    country: str

cities_data: List[City] = [
    {
        "id": "MOW",
        "name": "Москва",
        "airports": [
            {
                "code": "SVO",
                "name": "Шереметьево"
            },
            {
                "code": "DME",
                "name": "Домодедово"
            },
            {
                "code": "VKO",
                "name": "Внуково"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "LED",
        "name": "Санкт-Петербург",
        "airports": [
            {
                "code": "LED",
                "name": "Пулково"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "IST",
        "name": "Стамбул",
        "airports": [
            {
                "code": "IST",
                "name": "Стамбул"
            },
            {
                "code": "SAW",
                "name": "Сабіха Гёкчен"
            }
        ],
        "country": "Турция"
    },
    {
        "id": "DXB",
        "name": "Дубай",
        "airports": [
            {
                "code": "DXB",
                "name": "Дубай"
            }
        ],
        "country": "ОАЭ"
    },
    {
        "id": "BKK",
        "name": "Бангкок",
        "airports": [
            {
                "code": "BKK",
                "name": "Суварнабхуми"
            },
            {
                "code": "DMK",
                "name": "Донмыанг"
            }
        ],
        "country": "Таиланд"
    },
    {
        "id": "AYT",
        "name": "Анталья",
        "airports": [
            {
                "code": "AYT",
                "name": "Анталья"
            }
        ],
        "country": "Турция"
    },
    {
        "id": "EVN",
        "name": "Ереван",
        "airports": [
            {
                "code": "EVN",
                "name": "Звартноц"
            }
        ],
        "country": "Армения"
    },
    {
        "id": "TBS",
        "name": "Тбилиси",
        "airports": [
            {
                "code": "TBS",
                "name": "Тбилиси"
            }
        ],
        "country": "Грузия"
    },
    {
        "id": "ALA",
        "name": "Алматы",
        "airports": [
            {
                "code": "ALA",
                "name": "Алматы"
            }
        ],
        "country": "Казахстан"
    },
    {
        "id": "FRU",
        "name": "Бишкек",
        "airports": [
            {
                "code": "FRU",
                "name": "Манас"
            }
        ],
        "country": "Киргизия"
    },
    {
        "id": "SIP",
        "name": "Симферополь",
        "airports": [
            {
                "code": "SIP",
                "name": "Симферополь"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "AER",
        "name": "Сочи",
        "airports": [
            {
                "code": "AER",
                "name": "Сочи"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "KRR",
        "name": "Краснодар",
        "airports": [
            {
                "code": "KRR",
                "name": "Краснодар"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "ROV",
        "name": "Ростов-на-Дону",
        "airports": [
            {
                "code": "ROV",
                "name": "Платов"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "SVX",
        "name": "Екатеринбург",
        "airports": [
            {
                "code": "SVX",
                "name": "Кольцово"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "KZN",
        "name": "Казань",
        "airports": [
            {
                "code": "KZN",
                "name": "Казань"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "UFA",
        "name": "Уфа",
        "airports": [
            {
                "code": "UFA",
                "name": "Уфа"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "GOJ",
        "name": "Нижний Новгород",
        "airports": [
            {
                "code": "GOJ",
                "name": "Стригино"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "KGD",
        "name": "Калининград",
        "airports": [
            {
                "code": "KGD",
                "name": "Храброво"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "OVB",
        "name": "Новосибирск",
        "airports": [
            {
                "code": "OVB",
                "name": "Толмачёво"
            }
        ],
        "country": "Россия"
    },
    {
        "id": "CDG",
        "name": "Париж",
        "airports": [
            {
                "code": "CDG",
                "name": "Шарль-де-Голль"
            },
            {
                "code": "ORY",
                "name": "Орли"
            }
        ],
        "country": "Франция"
    },
    {
        "id": "FRA",
        "name": "Франкфурт",
        "airports": [
            {
                "code": "FRA",
                "name": "Франкфурт"
            }
        ],
        "country": "Германия"
    },
    {
        "id": "LHR",
        "name": "Лондон",
        "airports": [
            {
                "code": "LHR",
                "name": "Хитроу"
            },
            {
                "code": "LGW",
                "name": "Гатвик"
            }
        ],
        "country": "Великобритания"
    },
    {
        "id": "JFK",
        "name": "Нью-Йорк",
        "airports": [
            {
                "code": "JFK",
                "name": "Джон Кеннеди"
            },
            {
                "code": "EWR",
                "name": "Ньюарк"
            }
        ],
        "country": "США"
    },
    {
        "id": "HKT",
        "name": "Пхукет",
        "airports": [
            {
                "code": "HKT",
                "name": "Пхукет"
            }
        ],
        "country": "Таиланд"
    },
    {
        "id": "MLE",
        "name": "Мале",
        "airports": [
            {
                "code": "MLE",
                "name": "Мале"
            }
        ],
        "country": "Мальдивы"
    },
    {
        "id": "HAJ",
        "name": "Ганновер",
        "airports": [
            {
                "code": "HAJ",
                "name": "Ганновер"
            }
        ],
        "country": "Германия"
    },
    {
        "id": "PRG",
        "name": "Прага",
        "airports": [
            {
                "code": "PRG",
                "name": "Вацлав Гавел"
            }
        ],
        "country": "Чехия"
    },
    {
        "id": "VIE",
        "name": "Вена",
        "airports": [
            {
                "code": "VIE",
                "name": "Вена"
            }
        ],
        "country": "Австрия"
    },
    {
        "id": "ZRH",
        "name": "Цюрих",
        "airports": [
            {
                "code": "ZRH",
                "name": "Цюрих"
            }
        ],
        "country": "Швейцария"
    }
]