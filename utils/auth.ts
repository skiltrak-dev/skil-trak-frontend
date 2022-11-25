import jwt from 'jwt-decode'
import { isBrowser } from './browser-supported'

const KEYS = {
    TOKEN: 'user-token',
}

type UserCredentials = {
    username: string
    role: 'admin' | 'subadmin' | 'rto' | 'student' | 'industry'
    id: number
    email: string
    status: 'approved' | 'rejected' | 'pending'
    avatar: string | null
    name: string
}

export const setToken = (token: string) => {
    if (isBrowser()) {
        localStorage.setItem(KEYS.TOKEN, token)
    }
}

export const getToken = () => {
    if (isBrowser()) {
        return localStorage.getItem(KEYS.TOKEN)
    }
}

export const getUserCredentials: any = () => {
    const token = getToken()
    if (token) {
        return jwt(token)
    }
    return null
}

export const isAuthenticated = () => {
    return getToken() !== null
}

export const logout = () => {
    if (isBrowser()) {
        localStorage.removeItem(KEYS.TOKEN)
    }
}

export const AuthUtils = {
    setToken,
    getToken,
    getUserCredentials,
    isAuthenticated,
    logout,
}
