import { status, User } from '@/interfaces/interfaces'
import { create } from 'zustand'

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