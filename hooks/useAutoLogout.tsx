import { CommonApi, useRefreshTokenMutation } from '@queries'
import { AuthUtils, isBrowser } from '@utils'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, {
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { createContext } from 'react'
import moment from 'moment'
import { SessionExpireModal } from '@components'

// utils

interface AutoLogoutType {
    isUserActive: number
    setIsUserActive: any
}

export const AutoLogoutContext = createContext<AutoLogoutType | null>(null)

export enum LogoutType {
    Auto = 'auto',
    Manual = 'manual',
}

export const AutoLogoutProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const router = useRouter()
    const seconds = 10 * 60 * 1000
    // const seconds = 2 * 60 * 1000
    const [isUserActive, setIsUserActive] = useState(seconds)
    const [modal, setModal] = useState<ReactNode | null>(null)

    const [logoutActivity, logoutActivityResult] =
        CommonApi.LogoutActivity.perFormAcivityOnLogout()

    const [refreshToken, refreshTokenResult] = useRefreshTokenMutation()

    const onCancelClicked = () => setModal(null)

    useEffect(() => {
        let time: any = null

        const intervalTime = 250000

        time = setInterval(() => {
            refreshToken()
        }, intervalTime)

        return () => {
            clearInterval(time)
        }
    }, [])

    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            // Get the timestamp in milliseconds
            const timestamp = moment().valueOf()

            const expireTime = moment(
                AuthUtils.getUserCredentials()?.exp * 1000
            )
            const currentTime = moment(timestamp)

            if (expireTime.isBefore(currentTime)) {
                setModal(<SessionExpireModal onCancel={onCancelClicked} />)
            }
        }
    }, [router])

    useEffect(() => {
        if (refreshTokenResult.isSuccess) {
            if (refreshTokenResult.data) {
                if (isBrowser()) {
                    const rememberLogin = localStorage.getItem('rememberMe')
                    if (rememberLogin) {
                        AuthUtils.setToken(refreshTokenResult.data.access_token)
                        AuthUtils.setRefreshToken(
                            refreshTokenResult.data.refreshToken
                        )
                    } else {
                        AuthUtils.setTokenToSession(
                            refreshTokenResult.data.access_token
                        )
                        AuthUtils.setRefreshTokenToSessionStorage(
                            refreshTokenResult.data.refreshToken
                        )
                    }
                }
            }
        }
    }, [refreshTokenResult.isSuccess])

    useEffect(() => {
        let time: any = null

        const intervalTime = 101000

        if (isUserActive > 0) {
            time = setInterval(() => {
                setIsUserActive(isUserActive - intervalTime)
            }, intervalTime)
        }
        isBrowser()
            ? localStorage.setItem('autoLogout', String(isUserActive))
            : ''
        broadcastData(isUserActive)
        return () => {
            clearInterval(time)
        }
    }, [isUserActive])

    useEffect(() => {
        let time: any = null
        if (AuthUtils.isAuthenticated()) {
            time = setTimeout(async () => {
                if (AuthUtils.getToken()) {
                    await logoutActivity({ type: LogoutType.Auto })
                }
                setModal(<SessionExpireModal onCancel={onCancelClicked} />)
                AuthUtils.logout()
                setIsUserActive(0)
            }, isUserActive)
        }

        return () => {
            clearTimeout(time)
        }
    }, [isUserActive])

    const broadcastData = (data: any) => {
        const channel = new BroadcastChannel('sharedDataChannel')
        channel.postMessage(data)
    }

    useEffect(() => {
        const handleIncomingMessage = (e: any) => {
            setIsUserActive(e?.data)
        }

        const channel = new BroadcastChannel('sharedDataChannel')
        channel.addEventListener('message', handleIncomingMessage)

        return () => {
            channel.removeEventListener('message', handleIncomingMessage)
        }
    }, [])

    const value = {
        isUserActive,
        setIsUserActive,
    }

    return (
        <AutoLogoutContext.Provider value={value}>
            {modal}
            <div
                onClick={() => {
                    setIsUserActive((preval) =>
                        preval <= seconds ? seconds : seconds + 0.1
                    )
                }}
            >
                {children}
            </div>
        </AutoLogoutContext.Provider>
    )
}

export const useAutoLogout = () => {
    return useContext(AutoLogoutContext) as AutoLogoutType
}
