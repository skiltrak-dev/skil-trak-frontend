import { useEffect, useRef } from 'react'
import { useNotification } from 'hooks'

export const ShowErrorNotifications = ({ result }: { result: any }) => {
    const { notification } = useNotification()
    const notificationRef = useRef(notification)
    notificationRef.current = notification
    
    useEffect(() => {
        const showErrorNotifications = async () => {
            if (result?.isError) {
                const errorTitle = result.error?.data?.error
                if (errorTitle && Array.isArray(result.error?.data?.message)) {
                    for (let msg of result.error?.data?.message) {
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        notificationRef.current.error({
                            title: errorTitle,
                            description: msg,
                            autoDismiss: true,
                        })
                    }
                } else {
                    notificationRef.current.error({
                        title: errorTitle || 'Some thing is not right',
                        description:
                            result.error?.data?.message ||
                            'Please check your network connection',
                        autoDismiss: true,
                    })
                }
            }
        }

        showErrorNotifications()
    }, [result])

    return <></>
}
