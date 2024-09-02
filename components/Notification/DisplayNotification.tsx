import { useNotification } from '@hooks'
import { NotificationPosition } from './notification.enum'
export const DisplayNotifications = () => {
    const { notifications } = useNotification()

    const topLeft = notifications?.filter(
        (nv: any) => nv?.position === NotificationPosition.TopLeft
    )
    const topRight = notifications?.filter(
        (nv: any) => nv?.position === NotificationPosition.TopRight
    )
    const bottomLeft = notifications?.filter(
        (nv: any) => nv?.position === NotificationPosition.BottomLeft
    )
    const bottomRight = notifications?.filter(
        (nv: any) =>
            nv?.position === NotificationPosition.BottomRight || !nv?.position
    )

    const groupedNotifications = notifications.reduce(
        (acc: any, notification: any) => {
            acc[notification.position] = acc[notification.position] || []
            acc[notification.position].push(notification)
            return acc
        },
        {
            [NotificationPosition.TopLeft]: [],
            [NotificationPosition.BottomLeft]: [],
            [NotificationPosition.TopRight]: [],
            [NotificationPosition.BottomRight]: [],
        }
    )

    const NotificationClasses = {
        [NotificationPosition.TopLeft]: 'flex-col top-0 left-0',
        [NotificationPosition.BottomLeft]: 'flex-col-reverse left-0 bottom-0',
        [NotificationPosition.TopRight]: 'flex-col right-0 top-0',
        [NotificationPosition.BottomRight]: 'flex-col-reverse right-0 bottom-0',
    }

    return (
        notifications && (
            <>
                {Object.entries(groupedNotifications).map(
                    ([key, values]: any) => {
                        const classes =
                            NotificationClasses[key as NotificationPosition]

                        if (!values?.length) {
                            return null
                        }

                        return (
                            <div
                                key={key}
                                className={`${classes} flex gap-y-1 fixed z-[49] p-4`}
                            >
                                {values?.map((notification: any) => (
                                    <div
                                        key={`notification-${notification.id}`}
                                    >
                                        {notification.element}
                                    </div>
                                ))}
                            </div>
                        )
                    }
                )}
                {/* <div className="flex flex-col gap-y-1 fixed top-0 left-0 z-50 p-4 pr-4">
                    {topLeft?.map((notification: any) => (
                        <div key={`notification-${notification.id}`}>
                            {notification.element}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-1 fixed right-0 top-0 z-50 p-4 pr-4">
                    {topRight?.map((notification: any) => (
                        <div key={`notification-${notification.id}`}>
                            {notification.element}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col-reverse gap-y-1 fixed left-0 bottom-0 z-50 p-4 pr-4">
                    {bottomLeft?.map((notification: any) => (
                        <div key={`notification-${notification.id}`}>
                            {notification.element}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col-reverse gap-y-1 fixed right-0 bottom-0 z-50 p-4 pr-4">
                    {bottomRight?.map((notification: any) => (
                        <div key={`notification-${notification.id}`}>
                            {notification.element}
                        </div>
                    ))}
                </div> */}
            </>
        )
    )
}
