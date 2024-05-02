import { VariantOptions } from '@components/Notification'
import { useEffect } from 'react'
import { useShowErrorNotification } from './useShowErrorNotification'

export const ShowErrorNotifications = ({
    result,
    variant = 'error',
}: {
    result: any
    variant?: (typeof VariantOptions)[number]
}) => {
    const showErrorNotifications = useShowErrorNotification()

    useEffect(() => {
        showErrorNotifications(result, variant)
    }, [result])

    return <></>
}
