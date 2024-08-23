import {
    NotificationPositionOptions,
    VariantOptions,
} from '@components/Notification'
import { useEffect } from 'react'
import { useShowErrorNotification } from './useShowErrorNotification'

export const ShowErrorNotifications = ({
    result,
    variant = 'error',
    position,
}: {
    result: any
    variant?: (typeof VariantOptions)[number]
    position?: (typeof NotificationPositionOptions)[number]
}) => {
    const showErrorNotifications = useShowErrorNotification()

    useEffect(() => {
        showErrorNotifications(result, variant, position)
    }, [result])

    return <></>
}
