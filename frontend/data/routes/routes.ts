import { role, status } from "@/interfaces/interfaces"

export const PathDepends: Record<status, string[]> = {
    authorized: ['/', '/flights', "/flight", '/admin', '/user/tickets'],
    unauthorized: ['/users/auth', '/users/reg' ],
    undefined: ['*'],
    serverunavailable: ['/503'],
    forbidden: ['/403']
} as const

const CUSTOMERPATH = ['/', '/flights', '/flight']
const ADMINPATH = ['/admin', ...CUSTOMERPATH]

const RoleDepends = {
    'ADMIN': ADMINPATH,
    'CUSTOMER': CUSTOMERPATH
}


export const isPathAvailable = (status: status, roles: role[] | undefined) => {
    let isAvailable = false
    roles?.map(role => {
        if (RoleDepends[role].includes(window.location.pathname)) {
            isAvailable = true
        }
    })
    return (
        PathDepends[status].includes(window.location.pathname) || PathDepends[status].includes('*') && (roles ? isAvailable : true)
    )
}

export const getPathToRedirect = (status: status) => {
    return  PathDepends[status][0] == '*' ? '/' : PathDepends[status][0]
}