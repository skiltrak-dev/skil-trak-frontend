import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { useCancelWorkplaceStatusMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const CancelWorlplaceModal = ({
    workplaceId,
    onCancel,
}: {
    workplaceId: number
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceStatusMutation()

    const onConfirmUClicked = async (id: number) => {
        await cancelWorkplace(id)
    }

    useEffect(() => {
        if (cancelWorkplaceResult.isSuccess) {
            notification.error({
                title: `Workplace Cancelled`,
                description: `Workplace Cancelled Successfully!`,
            })
            onCancel()
        }
    }, [cancelWorkplaceResult])

    return (
        <>
            <ShowErrorNotifications result={cancelWorkplaceResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to cancel workplace. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(workplaceId)}
                actionObject={workplaceId}
                loading={cancelWorkplaceResult.isLoading}
            />
        </>
    )
}
