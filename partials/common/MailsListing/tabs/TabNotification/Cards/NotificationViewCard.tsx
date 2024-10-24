import { ShowErrorNotifications, Tooltip, Typography } from '@components'
import { CommonApi } from '@queries'
import { HtmlToPlainText, ellipsisText, plainTextWithSpaces } from '@utils'
import moment from 'moment'
import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { LuClock4 } from 'react-icons/lu'

export const NotificationViewCard = ({
    notification,
}: {
    notification: any
}) => {
    const [readNotifications, resultReadNotifications] =
        CommonApi.Notifications.useIsReadNotification()
    return (
        <>
            <ShowErrorNotifications result={resultReadNotifications} />
            <div
                onClick={() =>
                    !notification.isRead && readNotifications(notification?.id)
                }
                className="bg-white shadow-profiles rounded-lg py-3 px-6 flex items-center justify-between cursor-pointer"
            >
                <div className="flex items-center">
                    <div className="pr-[18px]">
                        <IoNotificationsOutline
                            className={`text-xl ${
                                notification.isRead
                                    ? 'text-[#00000079]'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                    <div className="px-[18px] border-r-2 border-l-2 border-secondary-dark w-64 relative group">
                        <Typography
                            variant="label"
                            cursorPointer
                            color={
                                notification.isRead
                                    ? 'text-[#00000079]'
                                    : 'text-black'
                            }
                            bold={notification.isRead ? false : true}
                        >
                            {ellipsisText(notification?.title, 20)}
                        </Typography>
                        {notification?.title?.length > 20 ? (
                            <Tooltip>{notification?.title}</Tooltip>
                        ) : null}
                    </div>
                    <div className="pl-[18px]">
                        <Typography
                            cursorPointer
                            color={
                                notification.isRead
                                    ? 'text-[#00000079]'
                                    : 'text-black'
                            }
                            variant="small"
                            semibold={notification.isRead ? false : true}
                        >
                            {plainTextWithSpaces(
                                ellipsisText(notification?.description, 450)
                            )}
                        </Typography>
                    </div>
                </div>

                {/*  */}
                <div className="w-32 border-l-2 border-secondary-dark pl-[18px] flex items-center gap-x-3">
                    <LuClock4
                        className={`${
                            notification.isRead
                                ? 'text-[#00000079]'
                                : 'text-black'
                        }`}
                    />
                    <Typography
                        variant="label"
                        bold={notification.isRead ? false : true}
                        color={
                            notification.isRead
                                ? 'text-[#00000079]'
                                : 'text-black'
                        }
                    >
                        {moment(notification?.createdAt).format('HH:MM A')}
                    </Typography>
                </div>
            </div>
        </>
    )
}
