import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

interface User {
    id: string
    name: string
    email: string
}

interface Token {
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    error: string
}

const REFRESH_TOKEN_THRESHOLD = 60 // seconds

const refreshAccessToken = async (token: Token): Promise<Token> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_END_POINT}/auth/refresh/token`,
            {
                headers: {
                    Authorization: `Bearer ${token.refreshToken}`,
                },
            }
        )

        if (!response.data.accessToken) {
            throw new Error('Failed to refresh access token')
        }

        return {
            ...token,
            accessToken: response.data.accessToken,
            accessTokenExpires: Date.now() + response.data.expiresIn * 1000,
            refreshToken: response.data.refreshToken ?? token.refreshToken,
        }
    } catch (error) {
        console.error('Error refreshing access token', error)
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
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_END_POINT}/auth/login`,
                        credentials
                    )

                    if (response.data.user) {
                        return {
                            id: response.data.user.id,
                            name: response.data.user.name,
                            email: response.data.user.email,
                            accessToken: response.data.accessToken,
                            refreshToken: response.data.refreshToken,
                            accessTokenExpires:
                                Date.now() + response.data.expiresIn * 1000,
                        }
                    }
                    return null
                } catch (error) {
                    console.error('Login error:', error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: user.accessToken,
                    accessTokenExpires: user.accessTokenExpires,
                    refreshToken: user.refreshToken,
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            if (
                Date.now() <
                token.accessTokenExpires - REFRESH_TOKEN_THRESHOLD * 1000
            ) {
                return token
            }

            // Access token has expired or will expire soon, try to update it
            return refreshAccessToken(token)
        },
        async session({ session, token }: any) {
            session.user = token.user as User
            session.accessToken = token.accessToken
            session.error = token.error
            return session
        },
    },
    pages: {
        signIn: '/portals/admin',
    },
    session: {
        strategy: 'jwt',
    },
}

export default NextAuth(authOptions)
