import React, { useEffect } from 'react'
import moment from 'moment-timezone'
import { isBrowser } from '@utils'
import { useRouter } from 'next/router'

export const LogoutAfterHours = ({ children }: { children: any }) => {
    const melbourneTime = +moment.tz('Australia/Melbourne').format('HH')
    const { pathname } = useRouter()

    useEffect(() => {
        if (melbourneTime >= 17) {
            if (isBrowser()) {
                localStorage.clear()
                sessionStorage.clear()
            }
        }
    }, [melbourneTime, pathname])

    console.log({ melbourneTime })

    return <div>{children}</div>
}
