import { SessionExpireModal } from '@components'
import { CommonApi, useRefreshTokenMutation } from '@queries'
import { AuthUtils, isBrowser } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import {
    ReactElement,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

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
    const seconds = 25 * 60 * 1000
    // const seconds = 2 * 60 * 1000
    const [isUserActive, setIsUserActive] = useState(seconds)
    const [modal, setModal] = useState<ReactNode | null>(null)

    const [logoutActivity, logoutActivityResult] =
        CommonApi.LogoutActivity.perFormAcivityOnLogout()

    const [refreshToken, refreshTokenResult] = useRefreshTokenMutation()

    const onCancelClicked = () => setModal(null)

    const getExpAndCurrTime = () => {
        const timestamp = moment().valueOf()
        const expTime = AuthUtils.getUserCredentials()?.exp * 1000

        const expireTime = moment(expTime)
        const currentTime = moment(timestamp)

        return { expireTime, currentTime, expTime, timestamp }
    }

    const path = router.asPath?.split('/')

    useEffect(() => {
        let time: any = null

        if (AuthUtils.isAuthenticated() && path?.includes('portals')) {
            const { expTime, timestamp } = getExpAndCurrTime()

            const intervalTime = expTime - 1000 * 1770 - timestamp

            if (timestamp < expTime && !refreshTokenResult.isLoading) {
                time = setInterval(() => {
                    console.log(
                        '1',
                        intervalTime,
                        timestamp && moment(timestamp).format('YYYY-MM-DD')
                    )
                    refreshToken()
                }, 30 * 1000)
            }
        }

        return () => {
            clearInterval(time)
        }
    }, [
        router,
        AuthUtils.getUserCredentials(),
        getExpAndCurrTime(),
        refreshTokenResult,
    ])

    // useEffect(() => {
    //     let time: any = null

    //     if (AuthUtils.isAuthenticated() && path?.includes('portals')) {
    //         const { expTime, timestamp } = getExpAndCurrTime()

    //         const secondIntervalTime = expTime - 1000 * 1725 - timestamp

    //         if (
    //             secondIntervalTime &&
    //             secondIntervalTime > 0 &&
    //             !refreshTokenResult.isLoading
    //         ) {
    //             time = setInterval(() => {
    //                 console.log(
    //                     '2',
    //                     secondIntervalTime,
    //                     timestamp && moment(timestamp).format('YYYY-MM-DD')
    //                 )
    //                 refreshToken()
    //             }, secondIntervalTime)
    //         }
    //     }

    //     return () => {
    //         clearInterval(time)
    //     }
    // }, [router, AuthUtils.getUserCredentials(), refreshTokenResult])

    useEffect(() => {
        const { expireTime, currentTime, expTime, timestamp } =
            getExpAndCurrTime()
        const intervalTime = expTime - 1000 * 1500 - timestamp
        if (
            intervalTime < 0 &&
            currentTime.isBefore(expireTime) &&
            !refreshTokenResult.isLoading
        ) {
            refreshToken()
        }
    }, [])

    useEffect(() => {
        if (AuthUtils.isAuthenticated() && path?.includes('portals')) {
            // Get the timestamp in milliseconds
            const { expireTime, currentTime } = getExpAndCurrTime()
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

        if (AuthUtils.isAuthenticated()) {
            const intervalTime = 31 * 1000

            if (isUserActive > 0) {
                time = setInterval(() => {
                    setIsUserActive(isUserActive - intervalTime)
                }, intervalTime)
            }
            isBrowser()
                ? localStorage.setItem('autoLogout', String(isUserActive))
                : ''
            broadcastData(isUserActive)
        }
        return () => {
            clearInterval(time)
        }
    }, [isUserActive, router])

    useEffect(() => {
        let time: any = null
        if (AuthUtils.isAuthenticated() && path?.includes('portals')) {
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

    const onEventOccur = () => {
        setIsUserActive((preval) =>
            preval <= seconds ? seconds : seconds + 0.1
        )
    }

    const value = {
        isUserActive,
        setIsUserActive,
    }

    return (
        <AutoLogoutContext.Provider value={value}>
            {modal}
            <div
                onClick={() => {
                    onEventOccur()
                }}
                onKeyDown={() => {
                    onEventOccur()
                }}
                onMouseMove={() => {
                    onEventOccur()
                }}
                onScroll={() => {
                    onEventOccur()
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
