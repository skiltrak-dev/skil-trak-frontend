import React, { useEffect } from 'react'
import { ActionModal } from './ActionModal'

// components
import { ShowErrorNotifications } from '@components'

// queries
import { useCompletePlacementMutation } from '@queries'

// hooks
import { useNotification } from '@hooks'
import { HiCheckBadge } from 'react-icons/hi2'

export const CompleteWorkplaceModal = ({
    onCancel,
    appliedIndustryId,
}: {
    onCancel: () => void
    appliedIndustryId: number
}) => {
    const [completePlacement, completePlacementResult] =
        useCompletePlacementMutation()

    // hooks
    const { notification } = useNotification()
    useEffect(() => {
        if (completePlacementResult.isSuccess) {
            notification.success({
                title: 'Workplace Schedule Completed',
                description: 'Workplace Schedule Completed Successfully',
            })
            onCancel()
        }
    }, [completePlacementResult])
    return (
        <div>
            <ShowErrorNotifications result={completePlacementResult} />
            <ActionModal
                Icon={HiCheckBadge}
                title={'Are you sure'}
                subtitle={'You want to Complete this workplace'}
                onCancel={onCancel}
                onConfirm={() => {
                    completePlacement(appliedIndustryId)
                }}
                loading={completePlacementResult?.isLoading}
            />
        </div>
    )
}
