interface Entity {
    id: number
    created_at?: string
}


export type role = 'ADMIN' | 'CUSTOMER'
export type status = 'authorized' | "forbidden" | "unauthorized" | "undefined" | "serverunavailable"

export interface User extends Entity{
    phone_number: number
    username: string
    roles: role[]
    email_address: string
}


export interface UserForStore extends Entity {
    phoneNumber: number
    username: string
    roles: role[]
    emailAddress: string
}

export interface UserTicket extends Entity {
    flight_seat: FlightSeat
    user: number
}

export interface UserResponse extends User {}


export interface AdminStatsResponse {
    users_count: number
    flights_count: number
    tickets_count: number
    total_revenue: number
}


export interface AuthForm {
    phone_number: string
    password: string
    remember: boolean
}

export interface RegistrationForm {
    username: string
    phone_number: number
    email_address: string
    password: string
}

export interface Plane extends Entity {
    name: string
    business_class_count: number
    economy_class_count: number
}

export interface GetFlightsByCitiesResponse {
    flights: Flight[]
    departure: string
    arrival: string
}


export interface Seat extends Entity {
    seat_class: 'BUSINESS' | 'ECONOMY'
    seat_name: string
    seat_number: number
    plane: Plane
}


export interface Airport extends Entity {
    id: number
    code: string
    name: string
    city: City
}

export interface Flight extends Entity {
    tag: string
    departure: Airport
    arrival: Airport
    departure_time: string
    arrival_time: string
    duration: string
    seats_left: number
    plane: Plane
    min_price: number
    allowed_business: boolean
}


export interface FlightSeat extends Entity {
    seat: Seat
    flight: Flight
    price: number
    is_occupied: boolean
}


export interface City extends Entity {
    id: number  
    tag: string  
    name: string
    country: string
}


export interface GetFlightByIdResponse {
    flight: Flight
    seats: FlightSeat[]
}

export interface CreateFlightForm {
    tag: string
    departure_city: City | null
    arrival_city: City | null
    departure_airport_id: number | null
    arrival_airport_id: number | null
    departure_time: string
    arrival_time: string
    plane_id: number
    min_price: string
    allowed_business: boolean
}