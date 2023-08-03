import { CommonApi } from '@queries'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'
import React, {
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { createContext } from 'react'

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
    // const seconds = 16000
    const [isUserActive, setIsUserActive] = useState(seconds)

    const [logoutActivity, logoutActivityResult] =
        CommonApi.LogoutActivity.perFormAcivityOnLogout()

    useEffect(() => {
        let time: any = null

        if (isUserActive > 0) {
            time = setTimeout(() => {
                setIsUserActive(isUserActive - 1000)
            }, 100000)
        }
        return () => {
            clearTimeout(time)
        }
    }, [isUserActive])

    useEffect(() => {
        let time: any = null
        time = setTimeout(async () => {
            if (AuthUtils.getToken()) {
                await logoutActivity({ type: LogoutType.Auto })
            }
            AuthUtils.logout(router)
            setIsUserActive(0)
        }, isUserActive)

        return () => {
            clearTimeout(time)
        }
    }, [isUserActive])

    const value = {
        isUserActive,
        setIsUserActive,
    }

    return (
        <AutoLogoutContext.Provider value={value}>
            <div
                onClick={() => {
                    console.log('Saad Khan')
                    setIsUserActive((preval) =>
                        preval <= seconds ? seconds : 1 + 0.1
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
