import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from './toast'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const token = ref(localStorage.getItem('token') || null)
    const isLoading = ref(false)
    const error = ref(null)

    const router = useRouter()
    const toastStore = useToastStore()

    const isAuthenticated = computed(() => !!token.value)

    // API URL - Ensure this matches your backend URL
    const API_URL = 'http://localhost:8001/auth'

    const login = async (email, password) => {
        isLoading.value = true
        error.value = null
        try {
            const formData = new FormData()
            formData.append('username', email)
            formData.append('password', password)

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || 'Login failed')
            }

            const data = await response.json()
            token.value = data.access_token
            localStorage.setItem('token', data.access_token)

            // Get User Details
            await fetchUserProfile()

            toastStore.addToast('Welcome back!', 'success')
            router.push('/')
            return true
        } catch (e) {
            error.value = e.message
            toastStore.addToast(e.message, 'error')
            return false
        } finally {
            isLoading.value = false
        }
    }

    const register = async (fullName, email, password) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    full_name: fullName
                })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || 'Registration failed')
            }

            // Auto login after register
            await login(email, password)
            return true
        } catch (e) {
            error.value = e.message
            toastStore.addToast(e.message, 'error')
            return false
        } finally {
            isLoading.value = false
        }
    }

    const fetchUserProfile = async () => {
        if (!token.value) return

        try {
            const response = await fetch('http://localhost:8001/users/me', {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                user.value = data
                localStorage.setItem('user', JSON.stringify(data))
            } else {
                logout()
            }
        } catch (e) {
            logout()
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.push('/login')
        toastStore.addToast('You have been logged out', 'info')
    }

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        fetchUserProfile
    }
})
