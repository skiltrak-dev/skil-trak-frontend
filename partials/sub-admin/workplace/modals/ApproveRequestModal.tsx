import React from 'react'
import { ActionModal } from './ActionModal'

// components
import { ShowErrorNotifications } from '@components'

// query
import { useUpdateWorkplaceStatusMutation } from '@queries'
import { HiCheckBadge } from 'react-icons/hi2'
import { userStatus } from '@utils'

export const ApproveRequestModal = ({
    onCancel,
    appliedIndustryId,
}: {
    appliedIndustryId: number
    onCancel: Function
}) => {
    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()
    return (
        <div>
            <ShowErrorNotifications result={updateStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant={'error'}
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
