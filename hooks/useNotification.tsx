import React, { useState, createContext, useContext } from 'react'
import { Notification, NotificationType, NotificationProps } from '@components'

type NotificationObjectType = {
    default: (props: NotificationProps) => void
    success: ({
        title,
        description,
        primaryAction,
        secondaryAction,
        autoDismiss,
        variant,
        icon,
        avatar,
    }: NotificationProps) => void
    info: (props: NotificationProps) => void
    warning: (props: NotificationProps) => void
    error: (props: NotificationProps) => void
    message: (props: NotificationProps) => void
}

interface NotificationContextType {
    notification: NotificationObjectType
    notifications: Object[]
    dismiss: Function
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({ children }: { children: any }) => {
    const [lastId, setLastId] = useState(1)
    const [notifications, setNotification] = useState<any>([])

    const dismiss = (notificationId: number) => {
        const filteredNotifications = notifications.filter((n: any) => {
            return n.id !== notificationId
        })
        setNotification(filteredNotifications)
    }

    const createNotification = ({
        title,
        description,
        primaryAction,
        secondaryAction,
        autoDismiss,
        variant,
        icon,
        avatar,
    }: NotificationProps) => {
        setNotification([
            ...notifications,
            {
                id: lastId,
                element: (
                    <Notification
                        id={lastId}
                        title={title}
                        description={description}
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        variant={variant}
                        autoDismiss={autoDismiss}
                        icon={icon}
                        avatar={avatar}
                    />
                ),
            },
        ])

        setLastId(lastId + 1)
    }

    const notification = {
        default: (notificationProps: NotificationProps) =>
            createNotification({
                ...notificationProps,
                variant: NotificationType.default as any,
            }),
        success: (notificationProps: NotificationProps) =>
            createNotification({
                ...notificationProps,
                variant: NotificationType.success as any,
            }),
        info: (notificationProps: NotificationProps) =>
            createNotification({
                ...notificationProps,
                variant: NotificationType.info as any,
            }),
        error: (notificationProps: NotificationProps) =>
            createNotification({
                ...notificationProps,
                variant: NotificationType.error as any,
            }),
        warning: (notificationProps: NotificationProps) =>
            createNotification({
                ...notificationProps,
                variant: NotificationType.warning as any,
            }),
        message: (notificationProps: NotificationProps) =>
            createNotification({
                ...notificationProps,
                variant: NotificationType.message as any,
            }),
    }

    const value = {
        notification,
        notifications,
        dismiss,
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext) as NotificationContextType
}
