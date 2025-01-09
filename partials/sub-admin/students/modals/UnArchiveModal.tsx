import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Student, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { useChangeStatus } from '../hooks'

export const UnArchiveModal = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Student) => {
        await onAccept(item)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Archived`,
                description: `Student "${student?.user?.name}" has been un-archived.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for un-archiving Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={IoWarningOutline}
            variant="primary"
            title="Are you sure!"
            description={`You are about to un-archive <em>"${student?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={student?.user?.email}
            actionObject={student}
            loading={changeStatusResult.isLoading}
        />
    )
}
