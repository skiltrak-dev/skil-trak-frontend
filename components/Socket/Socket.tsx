import { AuthUtils } from '@utils'
import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useNotification, useSocketListener } from '@hooks'
import { emptySplitApi } from '@queries/portals/empty.query'
import { SocketNotificationsEvents } from './enum'
import { socketEventToTagMapping } from './data'

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

    const dispatch = useDispatch()

    const invalidateCacheForEvent = (eventName: SocketNotificationsEvents) => {
        const tagsToInvalidate = (socketEventToTagMapping as any)[eventName]
        if (tagsToInvalidate) {
            tagsToInvalidate.forEach((tag: any) => {
                dispatch(emptySplitApi.util.invalidateTags([tag]))
            })
        }
    }

    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            socket?.emit('join', AuthUtils.getUserCredentials()?.id)

            socket?.on('joined', (notify: { message: string }) => {})

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
                                onClick: () => router.push(notify?.link),
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
            }
        }
    }, [socket, router])

    return children
}
