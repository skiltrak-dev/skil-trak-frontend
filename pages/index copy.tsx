import { PhoneInputWithCountry } from '@components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import UnderConstruction from './under-construction'

const Home: NextPage = () => {
    const router = useRouter()
    function updateOnlineStatus(event: any) {
        const status = navigator.onLine ? 'online' : 'offline'
        return status === 'offline' ? router.push('404') : ''
    }

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)
        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
    }, [])

    return (
        <>
            <UnderConstruction />
        </>
    )
}

export default Home
