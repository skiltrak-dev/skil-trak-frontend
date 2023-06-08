import { AuthUtils, ellipsisText } from '@utils'
import { useEffect, useState } from 'react'

import { useNotification, useSocketListener } from '@hooks'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'

export enum SocketNotificationsEvents {
    TicketNotification = 'ticketNotification',
    MouNotification = 'mouNotification',
    Notification = 'Notification',
    MailNotification = 'mailNotification',
}

export const Socket = ({ children }: any) => {
    const router = useRouter()
    const [socket, setSocket] = useState<any | null>(null)

    const { seteventListener } = useSocketListener()

    const { notification } = useNotification()
    useEffect(() => {
        setSocket(io(`${process.env.NEXT_PUBLIC_SOCKET_END_POINT}`))
    }, [])

    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            socket?.emit('join', AuthUtils.getUserCredentials()?.id)

            socket?.on(
                SocketNotificationsEvents.MouNotification,
                (notify: any) => {
                    notification.success({
                        title: notify.title,
                        description: notify.description,
                        primaryAction: {
                            text: 'View',
                            onClick: async () => {
                                // await readNotification(notify.id)
                                // setNotificationList(null)
                                // navigate(notify.link)
                            },
                        },
                    })
                }
            )
            socket?.on(
                SocketNotificationsEvents.MailNotification,
                (notify: any) => {
                    if (
                        AuthUtils.getUserCredentials()?.id !==
                        notify?.sender?.id
                    ) {
                        notification.success({
                            title: notify?.subject,
                            description: ellipsisText(notify?.message, 60),
                            primaryAction: {
                                text: 'View',
                                onClick: async () => {
                                    // await readNotification(notify.notificationId)
                                    // setMessage(null)
                                    // navigate(`/messages`)
                                },
                            },
                        })
                    }
                }
            )

            socket?.on(
                SocketNotificationsEvents.Notification,
                (notify: any) => {
                    // setNotificationList(notify)
                    notification.success({
                        title: notify?.title,
                        description: notify?.message,
                    })
                }
            )

            socket?.on(
                SocketNotificationsEvents.TicketNotification,
                (notify: any) => {
                    seteventListener({
                        eventName: SocketNotificationsEvents.TicketNotification,
                        eventListener: notify,
                    })
                    notification.success({
                        title: notify?.title,
                        description: notify?.message,
                    })
                }
            )
        }
    }, [socket, router])

    return children
}
