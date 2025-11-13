import { status, User, UserForStore } from '@/interfaces/interfaces'
import { create } from 'zustand'

export interface UserStore {
    user: UserForStore | undefined
    status: status
    addUser: (user: UserForStore) => void
    removeUser: () => void
    setUnavailable: () => void
    setForbidden: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    status: 'undefined',
    user: undefined,

    addUser: (user: UserForStore) => {
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