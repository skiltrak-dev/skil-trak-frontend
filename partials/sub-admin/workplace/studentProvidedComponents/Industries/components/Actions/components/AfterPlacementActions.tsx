import React, { useEffect } from 'react'

// components
import { Button, ShowErrorNotifications } from '@components'

// query
import {
    useTerminatePlacementMutation,
    useCompletePlacementMutation,
} from '@queries'
import { useNotification } from '@hooks'

export const AfterPlacementActions = ({ appliedIndustry }: any) => {
    const [terminatePlacement, terminatePlacementResult] =
        useTerminatePlacementMutation()
    const [completePlacement, completePlacementResult] =
        useCompletePlacementMutation()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (completePlacementResult.isSuccess) {
            notification.success({
                title: 'Workplace Placement Completed',
                description: 'Workplace Placement Completed Successfully',
            })
        }
        if (terminatePlacementResult.isSuccess) {
            notification.success({
                title: `Workplace Placement Terminated`,
                description: `Workplace Placement Terminated Successfully`,
            })
        }
    }, [terminatePlacementResult, completePlacementResult])

    return (
        <div className="flex items-center gap-x-2">
            <ShowErrorNotifications result={terminatePlacementResult} />
            <ShowErrorNotifications result={completePlacementResult} />

            <Button
                text={'TERMINATE'}
                variant={'error'}
                onClick={() => {
                    terminatePlacement(appliedIndustry?.id)
                }}
                loading={terminatePlacementResult.isLoading}
                disabled={terminatePlacementResult.isLoading}
            />
            <Button
                text={'COMPLETE'}
                variant={'success'}
                onClick={() => {
                    completePlacement(appliedIndustry?.id)
                }}
                loading={completePlacementResult.isLoading}
                disabled={completePlacementResult.isLoading}
            />
        </div>
    )
}
