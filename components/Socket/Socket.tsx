import { AuthUtils } from '@utils'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { socketEventToTagMapping } from './data'
import { SocketNotificationsEvents } from './enum'
import { useNotification, useSocketListener } from '@hooks'
import { emptySplitApi } from '@queries/portals/empty.query'
import { CommonApi } from '@queries'

export const Socket = ({ children }: any) => {
    const router = useRouter()
    const [socket, setSocket] = useState<any | null>(null)

    const { notification } = useNotification()
    const { setEventListener } = useSocketListener()

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect()
            console.log('Socket disconnected')
        }
    }

    useEffect(() => {
        setSocket(
            io(`${process.env.NEXT_PUBLIC_SOCKET_END_POINT}`, { secure: true })
        )

        return () => {
            setSocket(null)
        }
    }, [])

    const dispatch = useDispatch()

    const invalidateCacheForEvent = (eventName: SocketNotificationsEvents) => {
        const tagsToInvalidate = (socketEventToTagMapping as any)[eventName]
        if (tagsToInvalidate) {
            tagsToInvalidate.forEach((tag: any) => {
                dispatch(emptySplitApi.util.invalidateTags([tag]))
            })
        }
    }

    const [readNotifications] = CommonApi.Notifications.useIsReadNotification()

    const handleNotificationClick = async (e: any, notification: any) => {
        e?.preventDefault()

        try {
            // First mark the notification as read
            if (!notification.isRead && notification?.notificationId) {
                await readNotifications(notification?.notificationId)
            }

            // Then navigate to the link
            if (notification?.link) {
                router.push(notification?.link)
            }
        } catch (error) {
            console.error('Error handling notification click:', error)
        }
    }

    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            socket?.emit('join', AuthUtils.getUserCredentials()?.id)

            socket?.on('joined', () => {})

            socket?.on('off', () => {})

            Object.values(SocketNotificationsEvents)?.forEach(
                (eventName: SocketNotificationsEvents) => {
                    socket?.on(eventName, (notify: any) => {
                        setEventListener({
                            eventName,
                            eventListener: notify,
                        })
                        dispatch(
                            emptySplitApi.util.invalidateTags([
                                'AllNotifications',
                            ])
                        )
                        invalidateCacheForEvent(eventName)

                        notification.success({
                            title: notify?.type,
                            description: notify?.message,
                            dissmissTimer: 6000,
                            primaryAction: {
                                text: 'View',
                                onClick: (e: any) => {
                                    handleNotificationClick(e, notify)
                                },
                            },
                            position: 'topright',
                        })
                    })
                }
            )
        }

        return () => {
            if (socket) {
                Object.values(SocketNotificationsEvents).forEach((event) => {
                    socket.off(event)
                })
                socket.off('joined')
                disconnectSocket()
            }
        }
    }, [socket, router])

    return children
}
