import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi, useRemoveJobMutation } from '@queries'
import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    job,
    onCancel,
}: {
    job: any
    onCancel: Function
}) => {
    const router = useRouter()
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
                title: `Job Deleted`,
                description: `Job "${job.title}" has been deleted.`,
            })
            onCancel()
            router.push('/portals/industry/jobs/advertised-jobs')
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
            loading={removeResult.isLoading}
        />
    )
}
