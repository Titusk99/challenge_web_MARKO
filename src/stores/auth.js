import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)

    const isAuthenticated = computed(() => !!token.value)

    function login(userData, userToken) {
        user.value = userData
        token.value = userToken
        localStorage.setItem('auth_token', userToken)
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('auth_token')
    }

    function checkAuth() {
        const storedToken = localStorage.getItem('auth_token')
        if (storedToken) {
            token.value = storedToken
            // Here we would typically fetch the user profile verify the token
            // For now, we'll simulate a user if a token exists
            if (!user.value) {
                user.value = { name: 'Client', role: 'client' }
            }
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        checkAuth
    }
})
