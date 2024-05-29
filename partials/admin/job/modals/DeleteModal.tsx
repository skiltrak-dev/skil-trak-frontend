import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { useRemoveJobMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    job,
    onCancel,
}: {
    job: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = useRemoveJobMutation()

    const onConfirmUClicked = async (job: any) => {
        await remove(Number(job.id))
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Job Deleted`,
                description: `Job "${job?.title}" has been deleted.`,
            })
            onCancel()
        }
    }, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
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
                loading={removeResult.isLoading}
            />
        </>
    )
}
