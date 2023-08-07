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

export const setTokenToSession = (token: string) => {
    if (isBrowser()) {
        sessionStorage.setItem(KEYS.TOKEN, token)
    }
}
export const getToken = () => {
    if (isBrowser()) {
        return localStorage.getItem(KEYS.TOKEN)
    }
}

export const getTokenFromSession = () => {
    if (isBrowser()) {
        return sessionStorage.getItem(KEYS.TOKEN)
    }
}

const token = () => getToken() || getTokenFromSession()
export const getUserCredentials: any = () => {
    const tokenData = token()
    if (tokenData) {
        return jwt(tokenData)
    }
    return null
}

export const isAuthenticated = () => {
    const tokenData = token()
    return tokenData !== null
}

export const logout = (router?: any) => {
    if (isBrowser()) {
        localStorage.clear()
        sessionStorage.clear()
        // localStorage.removeItem(KEYS.TOKEN)

        if (router) {
            router.push('/auth/login')
        }
    }
}

export const AuthUtils = {
    token,
    setToken,
    getToken,
    getUserCredentials,
    isAuthenticated,
    logout,
    setTokenToSession,
}
