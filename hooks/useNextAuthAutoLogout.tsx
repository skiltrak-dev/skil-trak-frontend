import { SessionExpireModal } from '@components'
import { CommonApi } from '@queries'
import { isBrowser } from '@utils'
import moment from 'moment'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
    ReactElement,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { LogoutType } from './useAutoLogout'

// utils

interface AutoLogoutType {
    isUserActive: number
    setIsUserActive: any
}

export const NextAuthAutoLogoutContext = createContext<AutoLogoutType | null>(
    null
)

export const NextAuthAutoLogoutProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const router = useRouter()
    const seconds = 10 * 60 * 1000
    const { data }: any = useSession()
    const [isUserActive, setIsUserActive] = useState(seconds)
    const [modal, setModal] = useState<ReactNode | null>(null)

    const [logoutActivity] = CommonApi.LogoutActivity.perFormAcivityOnLogout()

    const onCancelClicked = () => setModal(null)

    const getExpAndCurrTime = () => {
        const timestamp = moment().valueOf()
        const expTime = data?.accessTokenExpires

        const expireTime = moment(expTime)
        const currentTime = moment(timestamp)

        return { expireTime, currentTime, expTime, timestamp }
    }

    const path = router.asPath?.split('/')

    useEffect(() => {
        if (!!data?.accessToken && path?.includes('portals')) {
            // Get the timestamp in milliseconds
            const { expireTime, currentTime } = getExpAndCurrTime()
            if (expireTime.isBefore(currentTime)) {
                setModal(<SessionExpireModal onCancel={onCancelClicked} />)
            }
        }
    }, [router])

    useEffect(() => {
        let time: any = null

        if (!!data?.accessToken) {
            const intervalTime = 5 * 1000

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
        const abc = async () => {
            if (!!data?.accessToken && path?.includes('portals')) {
                time = setTimeout(async () => {
                    if (data?.accessToken) {
                        await logoutActivity({ type: LogoutType.Auto })
                    }
                    setModal(<SessionExpireModal onCancel={onCancelClicked} />)
                    // AuthUtils.logout()
                    await signOut({ redirect: false })
                    setIsUserActive(0)
                }, isUserActive)
            }
        }
        abc()

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
        <NextAuthAutoLogoutContext.Provider value={value}>
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
        </NextAuthAutoLogoutContext.Provider>
    )
}

export const useNextAuthAutoLogout = () => {
    return useContext(NextAuthAutoLogoutContext) as AutoLogoutType
}
