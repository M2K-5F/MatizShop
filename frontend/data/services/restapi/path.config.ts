const BaseURL = 'http://localhost:8000/api'

export const ApiEndpoints = {
    getCities: BaseURL + '/flights/search/cities',
    getFlightsByCities: BaseURL + '/flights/search/flights',
    getUserMe: BaseURL + '/auth/me',
    logout: BaseURL + '/auth/logout',
    login: BaseURL + '/auth/login',
    register: BaseURL + '/auth/register'
}