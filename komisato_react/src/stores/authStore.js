// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      currentRole: 'guest',
      authToken: null,
      isAuthenticated: false,
      
      login: (username, role, token) => set({
        currentUser: username,
        currentRole: role,
        authToken: token,
        isAuthenticated: true
      }),
      
      register: (username, role, token) => set({
        currentUser: username,
        currentRole: role,
        authToken: token,
        isAuthenticated: true
      }),
      
      logout: () => set({
        currentUser: null,
        currentRole: 'guest',
        authToken: null,
        isAuthenticated: false
      })
    }),
    {
      name: 'grandhouse-auth-storage'
    }
  )
);