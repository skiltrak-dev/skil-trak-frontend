import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { Student } from '@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    item,
    onCancel,
}: {
    item: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = SubAdminApi.AssessmentEvidence.deleteAssessmentEvidence()

    const router = useRouter()

    const onConfirmUClicked = async (item: any) => {
        await remove(item)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Student Deleted`,
                description: `Student "${item.student.user.name}" has been deleted.`,
            })
            onCancel()
            router.push('/portals/sub-admin/tasks/assessment-evidence?tab=archived')
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Student was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${item.student.user.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={item.student.user.email}
            actionObject={item}
            loading={removeResult.isLoading}
        />
    )
}
