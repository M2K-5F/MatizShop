import { status } from "@/interfaces/interfaces"

export const PathDepends: Record<status, string[]> = {
    authorized: ['/', '/flights'],
    unauthorized: ['/users/auth', '/users/reg'],
    undefined: ['*'],
    serverunavailable: ['/503'],
    forbidden: ['/403']
} as const

export const isPathAvailable = (status: status) => {
    return PathDepends[status].includes(window.location.pathname) ?? PathDepends[status].includes('*')
}

export const getPathToRedirect = (status: status) => {
    return  PathDepends[status][0] == '*' ? '/' : PathDepends[status][0]
}