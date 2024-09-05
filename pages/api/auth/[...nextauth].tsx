import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import jwt from 'jwt-decode'

interface User {
    id: string
    name: string
    email: string
    role: string
    accessToken: string
    refreshToken: string
}

interface Token {
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    error: string
    user: User
}

const REFRESH_TOKEN_THRESHOLD = 60 // seconds

const refreshAccessToken = async (token: Token): Promise<Token> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_END_POINT}/auth/refresh/token`,
            {},
            {
                headers: {
                    authorization: `Bearer ${token.refreshToken}`,
                },
            }
        )

        if (!response.data.access_token) {
            throw new Error('Failed to refresh access token')
        }

        return {
            ...token,
            user: {
                ...token?.user,
                accessToken: response.data.access_token,
                refreshToken: response.data.refreshToken ?? token.refreshToken,
            },
            accessToken: response.data.access_token,
            accessTokenExpires: Date.now() + response.data.expiresIn * 1000,
            refreshToken: response.data.refreshToken ?? token.refreshToken,
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error refreshing token:', error.response?.data)
            return error.response?.data
        } else {
            console.error('Unknown error refreshing token:', error)
        }
        // console.error('Error refreshing access token', error)
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required')
                }

                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_END_POINT}/auth/login`,
                        credentials
                    )

                    if (response?.data) {
                        const getUserCredentials: any = () => {
                            const tokenData = response.data.access_token
                            if (tokenData) {
                                return jwt(tokenData)
                            }
                            return null
                        }
                        return {
                            id: response.data.id,
                            role: response.data.role,
                            status: response.data.status,
                            name: response.data.name,
                            email: response.data.email,
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refreshToken,
                            accessTokenExpires:
                                getUserCredentials()?.exp * 1000,
                        }
                    }
                    return null
                } catch (error: any) {
                    console.error('Login error:', error?.response?.data)
                    throw new Error(JSON.stringify(error?.response?.data))
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            // Initial sign in
            if (account && user) {
                return user
                return {
                    accessToken: user.accessToken,
                    accessTokenExpires: user.accessTokenExpires,
                    refreshToken: user.refreshToken,
                    user,
                }
            }

            return token

            // Return previous token if the access token has not expired yet
            // if (
            //     Date.now() <
            //     token.accessTokenExpires - REFRESH_TOKEN_THRESHOLD * 1000
            // ) {
            //     return token
            // }

            // // Access token has expired or will expire soon, try to update it
            // return await refreshAccessToken(token)
        },
        async session({ session, token }: any) {
            session = token
            return session
            session.user = token.user as User
            session.accessToken = token.accessToken
            session.error = token.error
            return session
        },
    },
    pages: {
        // signIn: '/portals/admin',
        signOut: '/auth/login',
    },
    session: {
        strategy: 'jwt',
    },
}

export default NextAuth(authOptions)
