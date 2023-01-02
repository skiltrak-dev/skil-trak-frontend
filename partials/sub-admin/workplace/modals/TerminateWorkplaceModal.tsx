import { useTerminatePlacementMutation } from '@queries'
import React, { useEffect } from 'react'

// components
import { ShowErrorNotifications } from '@components'

// hooks
import { useNotification } from '@hooks'
import { FaBan } from 'react-icons/fa'
import { ActionModal } from './ActionModal'

export const TerminateWorkplaceModal = ({
    appliedIndustryId,
    onCancel,
}: {
    appliedIndustryId: number
    onCancel: Function
}) => {
    const [terminatePlacement, terminatePlacementResult] =
        useTerminatePlacementMutation()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (terminatePlacementResult.isSuccess) {
            notification.success({
                title: `Workplace Placement Terminated`,
                description: `Workplace Placement Terminated Successfully`,
            })
        }
    }, [terminatePlacementResult])
    return (
        <div>
            <ShowErrorNotifications result={terminatePlacementResult} />
            <ActionModal
                Icon={FaBan}
                variant={'error'}
                title={'Are you sure'}
                subtitle={'You want to Terminate this workplace'}
                onCancel={onCancel}
                onConfirm={() => {
                    terminatePlacement(appliedIndustryId)
                }}
                loading={terminatePlacementResult?.isLoading}
            />
        </div>
    )
}
