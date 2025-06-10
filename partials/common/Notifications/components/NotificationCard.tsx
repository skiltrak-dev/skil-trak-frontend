import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { LuClock4 } from 'react-icons/lu'
import { GoDotFill } from 'react-icons/go'
import { InitialAvatar, Typography } from '@components'
import { smartDateFormat, smartDateTimeFormat } from '../functions'

export const NotificationCard = ({
    userId,
    notification,
}: {
    userId?: number
    notification: any
}) => {
    const router = useRouter()

    const [readNotifications] = CommonApi.Notifications.useIsReadNotification()

    const handleNotificationClick = async (e: any) => {
        e.preventDefault()

        try {
            // First mark the notification as read
            if (!notification.isRead && notification?.id) {
                await readNotifications(notification?.id)
            }

            // Then navigate to the link
            if (notification?.link) {
                router.push(notification.link)
            }
        } catch (error) {
            console.error('Error handling notification click:', error)
        }
    }

    return (
        <div
            key={notification?.id}
            onClick={(e: any) => {
                if (!userId) {
                    handleNotificationClick(e)
                }
            }}
            className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] w-full flex items-center gap-x-4 rounded-md border-b border-secondary px-3 py-2.5 cursor-pointer hover:bg-secondary transition-all`}
        >
            <GoDotFill
                className={`text-2xl ${
                    notification.isRead ? 'text-white' : 'text-[#4779ED]'
                } `}
            />
            <div className="w-12 h-11 relative">
                <InitialAvatar
                    large
                    name="Saad"
                    imageUrl={notification?.avatar}
                />
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <Typography
                        variant={'subtitle'}
                        color={
                            notification.isRead
                                ? '!text-[#979797]'
                                : '!text-[#156CD7]'
                        }
                        bold
                    >
                        {notification?.title}
                    </Typography>
                    <Typography
                        variant={'muted'}
                        color={
                            notification.isRead
                                ? 'text-[#979797]'
                                : 'text-[#515978]'
                        }
                        medium
                    >
                        {notification.description}
                        {/* {ellipsisText(notification.description, 70)} */}
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <LuClock4
                        size={22}
                        className={
                            notification.isRead
                                ? 'text-[#A5A3A9]'
                                : 'text-[#156CD7]'
                        }
                    />
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            bold={!notification.isRead}
                            color={
                                notification.isRead
                                    ? 'text-[#A5A3A9]'
                                    : 'text-[#156CD7]'
                            }
                            whiteSpacePre
                        >
                            {smartDateFormat(notification?.createdAt)}
                        </Typography>
                        <Typography
                            variant="small"
                            bold={!notification.isRead}
                            color={
                                notification.isRead
                                    ? 'text-[#A5A3A9]'
                                    : 'text-[#156CD7]'
                            }
                            whiteSpacePre
                        >
                            {smartDateTimeFormat(notification?.createdAt)}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
