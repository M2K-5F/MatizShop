import { UserStore, useUserStore } from "@/stores/useUserStore";
import { ApiEndpoints } from "./path.config";
import { AuthForm, City, Flight, GetFlightByIdResponse, GetFlightsByCitiesResponse, RegistrationForm, User, UserResponse, UserTicket } from "@/interfaces/interfaces";

export class ApiService {
    userStore: UserStore

    constructor(userStore: UserStore) {
        this.userStore = userStore
    }


    async query (queryUrl: string, init?: RequestInit & {queries?: Record<string, number | string>, ignoreUnautorized?: boolean, ignoreForbidden?: boolean}) {
        if (init?.queries) {
            queryUrl += '?'
            Object.entries(init.queries).map(query => {queryUrl += `${query[0]}=${query[1]}&`})
        }
        let response: Response
        try {
            response = await fetch(queryUrl, {
            credentials: 'include', 
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            ...init
            })
        } catch {
            this.userStore.setUnavailable()
            throw Error('HTTP:503 Server Unavailable')
        }

        if (response.ok) {
            return response.json()
        } else {
            if (response.status === 401 && !(init?.ignoreUnautorized)) {
                this.userStore.removeUser()
                throw Error("HTTP:401 Unautorized")
            }

            if (response.status === 403 && !(init?.ignoreForbidden)) {
                this.userStore.setForbidden()
                throw Error("HTTP:403 Forbidden")
            }
            const data = await response.json()
            throw {
                status: response.status.toString(),
                body: data.detail
            }
        }
    }

    getUsersMe(): Promise<UserResponse> {
        return this.query(
            ApiEndpoints.getUserMe,
        )
    }

    logout(): Promise<Record<string, string>> {
        return this.query(
            ApiEndpoints.logout,
            {
                method: 'delete'
            }
        )
    }

    login(user: AuthForm): Promise<UserResponse> {
        return this.query(
            ApiEndpoints.login,
            {
                method: 'post',
                body: JSON.stringify(user)
            }
        )
    }

    register(user: RegistrationForm): Promise<UserResponse> {
        return this.query(
            ApiEndpoints.register,
            {
                method: 'post',
                body: JSON.stringify(user)
            }
        )
    }

    getCitiesByQuery (query: string): Promise<City[]> {
        return this.query(
            ApiEndpoints.getCities,
            {queries: {
                "query": query
            }}
        )
    }

    getFlightsByCities(departure_city_tag: string, arrival_city_tag: string, date: string): Promise<GetFlightsByCitiesResponse> {
        return this.query(
            ApiEndpoints.getFlightsByCities,
            {
                method: 'post',
                body: JSON.stringify({
                    "departure_city_tag": departure_city_tag,
                    "arrival_city_tag": arrival_city_tag,
                    "date": date
                })
            }
        )
    }


    getFlightById(flight_id: number): Promise<GetFlightByIdResponse> {
        return this.query(
            ApiEndpoints.getFlightById,
            {
                queries: {
                    flight_id: flight_id
                }
            }
        )
    }

    getUserFlights(): Promise<UserTicket[]> {
        return this.query(
            ApiEndpoints.getUserFlights,
        )
    }
} 