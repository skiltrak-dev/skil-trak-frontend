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
    AppointmentReminder = 'appointmentReminder',
    ExpiryReminder = 'expiryReminder',
    FeedBackNotification = 'feedback',
}

export const Socket = ({ children }: any) => {
    const router = useRouter()
    const [socket, setSocket] = useState<any | null>(null)

    const { notification } = useNotification()
    const { setEventListener } = useSocketListener()
    useEffect(() => {
        setSocket(
            io(`${process.env.NEXT_PUBLIC_SOCKET_END_POINT}`, { secure: true })
        )

        return () => {
            setSocket(null)
        }
    }, [])

    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            socket?.emit('join', AuthUtils.getUserCredentials()?.id)

            socket?.on('joined', (notify: { message: string }) => {})

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
                    setEventListener({
                        eventName: SocketNotificationsEvents.TicketNotification,
                        eventListener: notify,
                    })
                    notification.success({
                        title: notify?.title,
                        description: notify?.message,
                    })
                }
            )

            socket?.on(
                SocketNotificationsEvents.AppointmentReminder,
                (notify: any) => {
                    setEventListener({
                        eventName:
                            SocketNotificationsEvents.AppointmentReminder,
                        eventListener: notify,
                    })
                    notification.success({
                        title: notify?.title,
                        description: notify?.description,
                        primaryAction: {
                            text: 'View',
                            onClick: () => {
                                router.push(notify?.link)
                            },
                        },
                    })
                }
            )

            socket?.on(
                SocketNotificationsEvents.ExpiryReminder,
                (notify: any) => {
                    setEventListener({
                        eventName: SocketNotificationsEvents.ExpiryReminder,
                        eventListener: notify,
                    })
                    notification.success({
                        title: notify?.title,
                        description: notify?.description,
                    })
                }
            )

            socket?.on(
                SocketNotificationsEvents.FeedBackNotification,
                (notify: any) => {
                    setEventListener({
                        eventName:
                            SocketNotificationsEvents.FeedBackNotification,
                        eventListener: notify,
                    })
                    notification.success({
                        title: notify?.title,
                        description: notify?.description,
                    })
                }
            )
        }
    }, [socket, router])

    return children
}
