import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi, useRemoveJobMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    job,
    onCancel,
}: {
    job: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = useRemoveJobMutation()
    // const [deleteJob, deleteJobResult] = useRemoveJobMutation()

    const onConfirmUClicked = async (job: any) => {
        await remove(job.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `RTO Deleted`,
                description: `RTO "${job.title}" has been deleted.`,
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
            description={`You are about to delete "${job.title}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={job.title}
            actionObject={job}
        />
    )
}
