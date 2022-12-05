import { useNotification } from '@hooks'

export const DisplayNotifications = () => {
    const { notifications } = useNotification()

    return (
        notifications && (
            <div className="flex flex-col-reverse gap-y-1 fixed right-0 bottom-0 z-50 pb-4 pr-4">
                {notifications.map((notification: any) => (
                    <div key={`notification-${notification.id}`}>
                        {notification.element}
                    </div>
                ))}
            </div>
        )
    )
}
