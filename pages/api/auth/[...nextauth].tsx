import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import jwt from 'jwt-decode'
import { debounce } from 'lodash'

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

const REFRESH_TOKEN_THRESHOLD = 60 * 29 // seconds

const getUserCredentials = (access_token: string) => {
    try {
        return jwt(access_token) as { exp: number }
    } catch (error) {
        console.error('Error decoding JWT:', error)
        return null
    }
}

let isRefreshing = false
let refreshPromise: Promise<any> | null = null

const logger = (message: string, data?: any) => {
    console.log(
        `[${new Date().toISOString()}] ${message}`,
        data ? JSON.stringify(data, null, 2) : ''
    )
}

// const refreshAccessToken = async (token: Token): Promise<Token> => {
//     const now = Date.now()
//     if (now - lastRefreshTime < REFRESH_COOLDOWN) {
//         logger('Refresh attempt too soon, returning current token')
//         return token
//     }

//     lastRefreshTime = now
//     logger('Attempting to refresh access token', {
//         tokenExp: token.accessTokenExpires,
//     })

//     try {
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_END_POINT}/auth/refresh/token`,
//             {},
//             {
//                 headers: {
//                     authorization: `Bearer ${token.refreshToken}`,
//                 },
//             }
//         )

//         logger('Refresh token response', {
//             status: response.status,
//             data: response.data,
//         })

//         if (!response.data.access_token) {
//             throw new Error('Failed to refresh access token')
//         }

//         const decodedToken = getUserCredentials(response.data.access_token)
//         if (!decodedToken) {
//             throw new Error('Invalid access token received')
//         }

//         logger('Successfully refreshed token', {
//             newExp: decodedToken.exp * 1000,
//         })

//         return {
//             id: response.data.sub,
//             role: response.data.role,
//             status: response.data.status,
//             name: response.data.name,
//             email: response.data.email,
//             accessToken: response.data.access_token,
//             refreshToken: response.data.refreshToken,
//             accessTokenExpires: decodedToken?.exp * 1000,
//         } as any
//     } catch (error) {
//         logger('Error refreshing access token', error)
//         return {
//             ...token,
//             error: 'RefreshAccessTokenError',
//         }
//     }
// }

// const refreshAccessToken = async (token: Token): Promise<Token> => {
//     logger('Attempting to refresh access token', {
//         tokenExp: token.accessTokenExpires,
//     })

//     try {
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_END_POINT}/auth/refresh/token`,
//             {},
//             {
//                 headers: {
//                     authorization: `Bearer ${token.refreshToken}`,
//                 },
//             }
//         )

//         logger('Refresh token response', {
//             status: response.status,
//             data: response.data,
//         })

//         if (!response.data.access_token) {
//             throw new Error('Failed to refresh access token')
//         }

//         const decodedToken = getUserCredentials(response.data.access_token)
//         if (!decodedToken) {
//             throw new Error('Invalid access token received')
//         }

//         logger('Successfully refreshed token', {
//             newExp: decodedToken.exp * 1000,
//         })

//         return {
//             id: response.data.sub,
//             role: response.data.role,
//             status: response.data.status,
//             name: response.data.name,
//             email: response.data.email,
//             accessToken: response.data.access_token,
//             refreshToken: response.data.refreshToken,
//             accessTokenExpires: decodedToken?.exp * 1000,
//         } as any
//     } catch (error) {
//         logger('Error refreshing access token', error)
//         return {
//             ...token,
//             error: 'RefreshAccessTokenError',
//         }
//     }
// }

let refreshing = false
let lastRefreshAttempt = 0
const REFRESH_COOLDOWN = 5000

const refreshAccessToken = async (token: Token): Promise<Token> => {
    logger('Attempting to refresh access token', {
        tokenExp: token.accessTokenExpires,
        refreshToken: token.refreshToken.slice(-10), // Log last 10 characters of refresh token
    })

    if (refreshing || Date.now() - lastRefreshAttempt < REFRESH_COOLDOWN) {
        return token
    }

    refreshing = true
    lastRefreshAttempt = Date.now()

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

        logger('Refresh token response', {
            status: response.status,
            data: response.data,
        })

        if (!response.data.access_token) {
            throw new Error(
                'Failed to refresh access token: No access_token in response'
            )
        }

        const decodedToken = getUserCredentials(response.data.access_token)
        if (!decodedToken) {
            throw new Error('Invalid access token received')
        }

        logger('Successfully refreshed token', {
            newExp: decodedToken.exp * 1000,
            newRefreshToken: response.data.refreshToken
                ? 'Present'
                : 'Not present',
        })

        return {
            ...token,
            accessToken: response.data.access_token,
            refreshToken: response.data.refreshToken || token.refreshToken,
            accessTokenExpires: decodedToken.exp * 1000,
            error: undefined,
        } as any
    } catch (error) {
        logger('Error refreshing access token', error)
        if (axios.isAxiosError(error)) {
            logger('Axios error details', {
                response: error.response?.data,
                status: error.response?.status,
            })
        }
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

const debouncedRefreshAccessToken = debounce(
    async (token: Token): Promise<Token> => {
        if (refreshing || Date.now() - lastRefreshAttempt < REFRESH_COOLDOWN) {
            return token
        }

        refreshing = true
        lastRefreshAttempt = Date.now()

        try {
            const refreshedToken = await refreshAccessToken(token)
            refreshing = false
            return refreshedToken
        } catch (error) {
            refreshing = false
            return { ...token, error: 'RefreshAccessTokenError' }
        }
    },
    100
)

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

                    const decodedData = getUserCredentials(
                        response.data.access_token
                    )

                    if (response?.data) {
                        return {
                            id: response.data.id,
                            role: response.data.role,
                            status: response.data.status,
                            name: response.data.name,
                            email: response.data.email,
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refreshToken,
                            accessTokenExpires: decodedData
                                ? decodedData?.exp * 1000
                                : null,
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
            console.log({
                tokenExpireeeeeeeeeee:
                    token.accessTokenExpires - REFRESH_TOKEN_THRESHOLD * 1000,
            })
            console.log({ khankabankaToken: token })
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

            // return token

            // Return previous token if the access token has not expired yet
            // if (
            //     token.accessTokenExpires &&
            //     Date.now() <
            //         token.accessTokenExpires - REFRESH_TOKEN_THRESHOLD * 1000
            // ) {
            //     return token // Token is still valid
            // }
            if (
                token.accessTokenExpires &&
                Date.now() >=
                    token.accessTokenExpires - REFRESH_TOKEN_THRESHOLD * 1000
            ) {
                logger('Token expired, attempting refresh')
                // const refreshedToken = await refreshAccessToken(token)

                // if (refreshedToken.error) {
                //     logger('Refresh failed, forcing re-authentication')
                //     // Force re-authentication
                //     return { ...token, error: 'RefreshAccessTokenError' }
                // }

                // return refreshedToken
                let refreshedToken = null
                let abc = true
                if (abc) {
                    abc = false
                    console.log('cheenu peenu')
                    refreshedToken = await refreshAccessToken(token)
                    setTimeout(() => {
                        abc = true
                    }, 5000)
                }
                if (refreshedToken) {
                    return refreshedToken
                }
            }

            return token

            // // Access token has expired or will expire soon, try to update it
        },
        async session({ session, token }: any) {
            if (!token) {
                logger('Token is undefined in session callback')
                return { ...session, error: 'TokenUndefinedError' }
            }

            if (token.error) {
                logger('Error in session callback', { error: token.error })
                return { ...session, error: token.error }
            }
            session = token
            console.log({ session })
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
