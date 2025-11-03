from core.config import city_config

def create_base_locations(Airport, City):
    for city in city_config.cities_data:
        created_city, _ = City.get_or_create(
            tag = city['id'],
            name = city['name'],
            country = city['country']
        )

        for airport in city['airports']:
            Airport.get_or_create(
                code = airport['code'],
                name = airport['name'],
                city = created_city
            )
