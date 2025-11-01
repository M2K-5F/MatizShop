export interface Flight {
    id: number
    tag: string
    departure: Location
    arrival: Location
    duration: string
    price: number
    type: string
    seats_count: number
}


export interface City {
    id: number  
    tag: string  
    name: string
    country: string
}

export interface Airport {
    id: number
    code: string
    name: string
    city: City
}

export interface Location {
    id: number
    time: string
    date: string
    airport_tag: Airport
}