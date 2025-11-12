interface Entity {
    id: number
    created_at?: string
}


export type role = 'ADMIN' | 'CUSTOMER'
export type status = 'authorized' | "forbidden" | "unauthorized" | "undefined" | "serverunavailable"

export interface User extends Entity{
    phoneNumber: number
    username: string
    roles: role[]
    emailAddress: string
}

export interface UserTicket extends Entity {
    flight_seat: FlightSeat
    user: number
}

export interface UserResponse extends Entity {
    phone_number: number
    username: string
    roles: role[]
    email_address: string
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