import React from 'react'

// components
import { Button } from '@components'

// query
import {
    useCancelPlacementMutation,
    useTerminatePlacementMutation,
    useCompletePlacementMutation,
} from '@queries'

export const AfterPlacementActions = ({ appliedIndustry }: any) => {
    const [cancelPlacement, cancelPlacementResult] =
        useCancelPlacementMutation()
    const [terminatePlacement, terminatePlacementResult] =
        useTerminatePlacementMutation()
    const [completePlacement, completePlacementResult] =
        useCompletePlacementMutation()
    return (
        <div className="flex items-center gap-x-2">
            <Button
                text={'CANCEL'}
                variant={'secondary'}
                onClick={() => {
                    cancelPlacement(appliedIndustry?.id)
                }}
                loading={cancelPlacementResult.isLoading}
                disabled={cancelPlacementResult.isLoading}
            />
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
