import React, { useEffect, useState } from 'react'
import { useAlert } from './useAlert'

export const NetworkProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { alert, setAlerts } = useAlert()

    useEffect(() => {
        const handleOnline = () => {
            setAlerts([])
        }

        const handleOffline = () => {
            alert.error({
                title: 'Network Disconnected',
                description: 'Check your Netowrk',
                autoDismiss: false,
            })
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return <>{children}</>
}
