import { useEffect, useState } from 'react'
import { AuthUtils, ellipsisText } from '@utils'
import { env } from 'process'

import { io } from 'socket.io-client'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'

export const Socket = ({ children }: any) => {
    const router = useRouter()
    const [socket, setSocket] = useState<any | null>(null)

    const { notification } = useNotification()
    useEffect(() => {
        setSocket(io(`${process.env.NEXT_PUBLIC_SOCKET_END_POINT}`))
    }, [])
   
    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            socket?.emit('join', AuthUtils.getUserCredentials()?.id)

            socket?.on('mouNotification', (notify: any) => {
                // setNotificationList(notify)
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
            })
            socket?.on('mailNotification', (notify: any) => {
                if (AuthUtils.getUserCredentials()?.id !== notify?.sender?.id) {
                    // setMessage(notify)
                    // setNotificationList({
                    //     ...notify,
                    //     title: notify?.subject,
                    //     description: notify?.message,
                    // })
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
            })

            socket?.on('Notification', (notify: any) => { 
                console.log("notify", notify)
                // setNotificationList(notify)
                notification.success({
                    title: notify?.title,
                    description: notify?.message,
                })
            })
        }
        

    }, [socket, router])
    return children
}
