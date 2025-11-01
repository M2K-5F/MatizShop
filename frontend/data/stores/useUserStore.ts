import { create } from 'zustand'

type role = 'ADMIN' | 'CUSTOMER'
type status = 'authorized' | "forbidden" | "unauthorized" | "undefined" | "serverunavailable"

interface User {
    phoneNumber: number
    username: string
    roles: role[]
    emailAddress: string
}

export interface UserStore {
    user: User | undefined
    status: status
    addUser: (user: User) => void
    removeUser: () => void
    setUnavailable: () => void
    setForbidden: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    status: 'undefined',
    user: undefined,

    addUser: (user: User) => {
        set({status: 'authorized', user: user})
    },

    removeUser: () => {
        set({status: 'unauthorized', user: undefined})
    },

    setUnavailable: () => {
        set({...get(), status: 'serverunavailable'})
    },

    setForbidden: () => {
        set({...get(), status: 'forbidden'})
    }
}))