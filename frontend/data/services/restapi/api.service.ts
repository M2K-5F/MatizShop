import { UserStore, useUserStore } from "@/stores/useUserStore";
import { i } from "node_modules/shadcn/dist/index-8c784f6a";
import { ApiEndpoints } from "./path.config";
import { City, Flight } from "@/interfaces/interfaces";

export class ApiService {
    userStore: UserStore

    constructor(userStore: UserStore) {
        this.userStore = userStore
    }


    query (queryUrl: string, init?: RequestInit & {queries?: Record<string, number | string>, ignoreUnautorized?: boolean, ignoreForbidden?: boolean}) {
        if (init?.queries) {
            queryUrl += '?'
            Object.entries(init.queries).map(query => {queryUrl += `${query[0]}=${query[1]}&`})
        }

        return fetch(queryUrl, {
            credentials: 'include', 
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            ...init
        })
            .catch((e) => {
                this.userStore.setUnavailable()
                throw Error('HTTP:503 Server Unavailable')
            })
            .then((response: Response) => {
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
                }
            })
    }

    getCitiesByQuery (query: string): Promise<City[]> {
        return this.query(
            ApiEndpoints.getCities,
            {queries: {
                "query": query
            }}
        )
    }

    getFlightsByCities(departure_city_tag: string, arrival_city_tag: string, date: string): Promise<Flight[]> {
        return this.query(
            ApiEndpoints.getFlightsByCities,
            {
                method: 'post',
                body: JSON.stringify({
                    "departure_city_tag": departure_city_tag,
                    "arrival_city_tag": arrival_city_tag,
                    "date": "2025-11-01T06:26:32.391Z"
                })
            }
        )
    }
}