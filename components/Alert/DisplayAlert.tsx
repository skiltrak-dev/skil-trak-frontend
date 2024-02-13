import { AlertPropType, useAlert } from '@hooks'

interface AlertTypeProp {
    id: any
    element: any
}

export const DisplayAlerts = () => {
    const { alerts } = useAlert()
    return (
        alerts && (
            <div className="flex flex-col-reverse gap-y-1 px-6">
                {alerts.map((alert: AlertPropType) => (
                    <div key={`alert-${alert?.id}`}>{alert?.element}</div>
                ))}
            </div>
        )
    )
}
