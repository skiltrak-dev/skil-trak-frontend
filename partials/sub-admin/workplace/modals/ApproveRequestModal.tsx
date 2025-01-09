import React, { useEffect } from 'react'
import { ActionModal } from './ActionModal'

// components
import { ShowErrorNotifications } from '@components'

// query
import { useUpdateWorkplaceStatusMutation } from '@queries'
import { HiCheckBadge } from 'react-icons/hi2'
import { userStatus } from '@utils'

// hooks
import { useNotification } from '@hooks'

export const ApproveRequestModal = ({
    onCancel,
    appliedIndustryId,
}: {
    appliedIndustryId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()

    useEffect(() => {
        if (updateStatusResult.isSuccess) {
            notification.success({
                title: 'Workplace Approved',
                description: 'Workplace Approved Successfully',
            })
            onCancel()
        }
    }, [updateStatusResult])

    return (
        <div>
            <ShowErrorNotifications result={updateStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant={'primary'}
                title={'Are you sure'}
                subtitle={'You want to Approve this workplace'}
                onCancel={onCancel}
                onConfirm={() => {
                    updateStatus({
                        id: Number(appliedIndustryId),
                        response: userStatus.APPROVED,
                    })
                }}
                loading={updateStatusResult?.isLoading}
            />
        </div>
    )
}
