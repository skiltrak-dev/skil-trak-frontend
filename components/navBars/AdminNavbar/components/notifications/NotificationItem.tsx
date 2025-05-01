import { InitialAvatar, Typography } from '@components'
import { ellipsisText } from '@utils'
import moment from 'moment'
import { MouseEventHandler } from 'react'

interface NotificationItemProps {
    icon?: any
    onClick?: MouseEventHandler
    notification: any
}

export const NotificationItem = ({
    onClick,
    notification,
}: NotificationItemProps) => {
    return (
        <div
            onClick={onClick}
            key={notification?.id}
            className={`shadow-[0px_0px_7px_0px_rgba(0,0,0,0.15)] w-full flex items-center gap-x-4 rounded-md border-b border-secondary px-2 py-1.5 cursor-pointer hover:bg-secondary transition-all`}
        >
            <div className="flex justify-between items-center gap-x-1 w-full">
                <div className="flex items-center gap-x-2">
                    <div className="relative">
                        <InitialAvatar
                            name="Saad"
                            imageUrl={notification?.avatar}
                        />
                    </div>
                    <div>
                        <Typography
                            variant={'label'}
                            color={
                                notification.isRead
                                    ? 'text-[#A5A3A9]'
                                    : 'text-[#156CD7]'
                            }
                            bold
                        >
                            {ellipsisText(notification.title, 20)}
                        </Typography>
                        <Typography
                            variant={'xs'}
                            color={
                                notification.isRead
                                    ? 'text-[#979797]'
                                    : 'text-[#515978]'
                            }
                            normal
                        >
                            {ellipsisText(notification.description, 30)}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <Typography variant="xs" normal whiteSpacePre>
                        {moment(notification?.createdAt).fromNow()}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
