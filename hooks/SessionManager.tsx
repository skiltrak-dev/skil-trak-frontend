import React, { useState, useEffect, useCallback, ReactElement } from 'react'
import { CommonApi, useRefreshTokenMutation } from '@queries'
import { AuthUtils, isBrowser } from '@utils'
import { LogoutType } from './useAutoLogout'
import { useRouter } from 'next/router'
import { SessionExpireModal } from '@components'

const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const TOKEN_REFRESH_BEFORE_EXPIRY = 5 * 60 * 1000 // 5 minutes before expiry

const SessionManager: React.FC = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [lastActivity, setLastActivity] = useState(Date.now())

    const [logoutActivity] = CommonApi.LogoutActivity.perFormAcivityOnLogout()
    const [refreshToken] = useRefreshTokenMutation()

    const token = AuthUtils.token()
    const isAuthenticated = AuthUtils.isAuthenticated()

    // Broadcast channel setup for multi-tab synchronization
    const broadcastLogout = useCallback(() => {
        const channel = new BroadcastChannel('autoLogoutChannel')
        channel.postMessage('logout')
        channel.close()
    }, [])

    // Logout handler
    const handleLogout = useCallback(async () => {
        if (AuthUtils.token()) {
            try {
                await logoutActivity({ type: LogoutType.Auto })
                AuthUtils.logout()

                // Trigger logout across tabs
                broadcastLogout()

                // Show session expire modal
                setModal(<SessionExpireModal onCancel={() => setModal(null)} />)
            } catch (error) {
                console.error('Logout failed:', error)
            }
        }
    }, [logoutActivity, broadcastLogout])

    // Reset activity timer and broadcast to other tabs
    const resetActivityTimer = useCallback(() => {
        if (!isAuthenticated) return

        setLastActivity(Date.now())

        // Broadcast activity to other tabs
        const channel = new BroadcastChannel('autoLogoutChannel')
        channel.postMessage('activity')
        channel.close()
    }, [isAuthenticated])

    // Broadcast channel listener effect
    useEffect(() => {
        const channel = new BroadcastChannel('autoLogoutChannel')

        const handleMessage = (event: MessageEvent) => {
            if (event.data === 'activity') {
                // Reset local activity timer when another tab reports activity
                setLastActivity(Date.now())
            } else if (event.data === 'logout') {
                // Trigger logout if another tab signals logout
                handleLogout()
            }
        }

        channel.addEventListener('message', handleMessage)

        return () => {
            channel.removeEventListener('message', handleMessage)
            channel.close()
        }
    }, [handleLogout])

    // Inactivity and token management effect
    useEffect(() => {
        // Add event listeners for user activity
        const activityEvents = ['mousemove', 'keydown', 'scroll', 'click']
        const eventHandler = () => resetActivityTimer()

        activityEvents.forEach((event) =>
            window.addEventListener(event, eventHandler)
        )

        // Interval to check inactivity and token status
        const checkInterval = setInterval(async () => {
            const currentTime = Date.now()

            // Check inactivity
            if (currentTime - lastActivity > INACTIVITY_TIMEOUT) {
                handleLogout()
            }

            // Check token refresh (before expiry)
            if (isAuthenticated) {
                const expirationTime =
                    AuthUtils.getUserCredentials()?.exp * 1000
                const timeRemaining = expirationTime - currentTime

                // Refresh token if within the refresh window and on portal pages
                if (
                    timeRemaining <= TOKEN_REFRESH_BEFORE_EXPIRY &&
                    router.asPath?.split('/').includes('portals')
                ) {
                    try {
                        const result: any = await refreshToken()
                        if (result?.data) {
                            const rememberLogin =
                                isBrowser() &&
                                localStorage.getItem('rememberMe')
                            if (rememberLogin) {
                                AuthUtils.setToken(result?.data?.access_token)
                                AuthUtils.setRefreshToken(
                                    result?.data?.refreshToken
                                )
                            } else {
                                AuthUtils.setTokenToSession(
                                    result?.data?.access_token
                                )
                                AuthUtils.setRefreshTokenToSessionStorage(
                                    result?.data?.refreshToken
                                )
                            }
                        }
                    } catch (error) {
                        // If token refresh fails, logout
                        handleLogout()
                    }
                }
            }
        }, 10000) // Check every 10 seconds

        // Cleanup
        return () => {
            activityEvents.forEach((event) =>
                window.removeEventListener(event, eventHandler)
            )
            clearInterval(checkInterval)
        }
    }, [
        lastActivity,
        isAuthenticated,
        handleLogout,
        resetActivityTimer,
        refreshToken,
        router.asPath,
    ])

    return <>{modal}</>
}

export default SessionManager
