import { ActionModal } from '@components'
import { useNotification } from '@hooks'
import { useRemoveUnAvailabilityMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    unavailability,
    onCancel,
}: {
    unavailability: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = useRemoveUnAvailabilityMutation()

    const onConfirmUClicked = async (unavailability: any) => {
        await remove(unavailability.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Unavailability Deleted`,
                description: `Unavailability "${unavailability.date}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting RTO was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${unavailability.date}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={unavailability.date}
            actionObject={unavailability}
            loading={removeResult.isLoading}
        />
    )
}
