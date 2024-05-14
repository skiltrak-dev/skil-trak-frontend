import { ReactNode, createContext, useContext, useState } from 'react'

import { Alert, AlertProps, AlertType } from '@components'
import { useRouter } from 'next/router'

export type AlertObjectType = {
    success: (props: AlertProps) => void
    info: (props: AlertProps) => void
    warning: (props: AlertProps) => void
    error: (props: AlertProps) => void
}

export interface AlertPropType {
    id: number
    element: ReactNode
    existId?: string
}

interface AlertContextType {
    alert: AlertObjectType
    alerts: AlertPropType[]
    dismiss: Function
    setAlerts: Function
}

// { id: number; element: ReactNode }

const AlertContext = createContext<AlertContextType | null>(null)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const [lastId, setLastId] = useState(1)
    const [alerts, setAlerts] = useState<AlertPropType[]>([])

    const dismiss = (alertId: number) => {
        const filteredAlerts = alerts.filter(
            (alert: AlertPropType) => alert.id !== alertId
        )
        setAlerts([...filteredAlerts])
    }

    const createAlert = ({
        title,
        description,
        dismiss = true,
        autoDismiss = true,
        avatar,
        icon,
        variant,
        existId,
    }: AlertProps) => {
        const fff = alerts?.filter((a: AlertPropType) => a?.existId === existId)

        const abc =
            fff && fff?.length > 0
                ? alerts
                : [
                      ...alerts,
                      {
                          id: lastId,
                          element: (
                              <Alert
                                  id={lastId}
                                  title={title}
                                  description={description}
                                  variant={variant}
                                  dismiss={dismiss}
                                  avatar={avatar}
                                  icon={icon}
                                  autoDismiss={autoDismiss}
                              />
                          ),
                          existId,
                      },
                  ]
        setAlerts(abc)
        setLastId(lastId + 1)
    }

    const alert = {
        success: (alertProps: AlertProps) =>
            createAlert({
                ...alertProps,
                variant: AlertType.success as any,
            }),
        info: (alertProps: AlertProps) =>
            createAlert({
                ...alertProps,
                variant: AlertType.info as any,
            }),
        warning: (alertProps: AlertProps) =>
            createAlert({
                ...alertProps,
                variant: AlertType.waning as any,
            }),
        error: (alertProps: AlertProps) =>
            createAlert({ ...alertProps, variant: AlertType.error as any }),
    }

    const values = {
        alert,
        alerts,
        dismiss,
        setAlerts,
    }

    return (
        <AlertContext.Provider value={values}>{children}</AlertContext.Provider>
    )
}

export const useAlert = () => {
    return useContext(AlertContext) as AlertContextType
}
