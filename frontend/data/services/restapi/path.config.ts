const BaseURL = 'http://localhost:8000/api'

export const ApiEndpoints = {
    getCities: BaseURL + '/flights/search/cities',
    getFlightsByCities: BaseURL + '/flights/search/flights',
    getUserMe: BaseURL + '/auth/me',
    logout: BaseURL + '/auth/logout',
    login: BaseURL + '/auth/login',
    register: BaseURL + '/auth/register',
    getFlightById: BaseURL + '/flights/flight',
    getUserFlights: BaseURL + '/flights/user/flights',
    buySeat: (seat_id: number) => BaseURL + '/flights/occupie/' + seat_id,
    getSummaryStats: BaseURL + '/admin/summary',
    getAdminsStats: BaseURL + '/admin/users',
    getFlightsStats: BaseURL + '/admin/flights',
    getAirportsByTag: BaseURL + '/admin/airports',
    createFlight: BaseURL + '/admin/create_flight'
}