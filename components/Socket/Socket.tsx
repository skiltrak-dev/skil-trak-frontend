import { AuthUtils } from '@utils'
import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useNotification, useSocketListener } from '@hooks'
import { emptySplitApi } from '@queries/portals/empty.query'

export enum SocketNotificationsEvents {
    TicketNotification = 'ticketNotification',
    MouNotification = 'mouNotification',
    Notification = 'Notification',
    MailNotification = 'mailNotification',
    AppointmentReminder = 'appointmentReminder',
    ExpiryReminder = 'expiryReminder',
    FeedBackNotification = 'feedback',
    WorkplaceNotification = 'workplaceRequest',
    NoteAdded = 'newNoteAdded',
    NewStudentAssigned = 'newStudentAssigned',
    StudentUnSnoozed = 'studentUnSnoozed',
}

const socketEventToTagMapping = {
    [SocketNotificationsEvents.NoteAdded]: ['Notes'],
    [SocketNotificationsEvents.MouNotification]: ['Mous'],
    [SocketNotificationsEvents.ExpiryReminder]: ['Reminders'],
    [SocketNotificationsEvents.MailNotification]: ['Messages'],
    [SocketNotificationsEvents.TicketNotification]: ['Tickets'],
    [SocketNotificationsEvents.FeedBackNotification]: ['Feedback'],
    [SocketNotificationsEvents.AppointmentReminder]: ['Appointments'],
    [SocketNotificationsEvents.NewStudentAssigned]: ['SubAdminStudents'],
    [SocketNotificationsEvents.WorkplaceNotification]: ['SubAdminWorkplace'],
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

    const dispatch = useDispatch()

    const invalidateCacheForEvent = (eventName: SocketNotificationsEvents) => {
        console.log({ eventName })
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
