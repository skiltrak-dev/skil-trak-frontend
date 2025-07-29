import { useEffect } from 'react'
import { ActionModal } from './ActionModal'

// components
import { ShowErrorNotifications } from '@components'

// query
import { SubAdminApi } from '@queries'
import { HiCheckBadge } from 'react-icons/hi2'

// hooks
import { useNotification } from '@hooks'

export const ApproveRequestModal = ({
    onCancel,
    workplaceId,
}: {
    workplaceId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [updateStatus, updateStatusResult] =
        SubAdminApi.Workplace.updateWpIndustryStatus()

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
                        id: Number(workplaceId),
                        status: 'accept',
                    })
                }}
                loading={updateStatusResult?.isLoading}
            />
        </div>
    )
}
