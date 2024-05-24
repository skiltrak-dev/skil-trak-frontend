import { Student } from '@types'
import { useEffect } from 'react'
import { ActionModal } from '@components'
import { useChangeStatus } from '../hooks'
import { HiCheckBadge } from 'react-icons/hi2'
import { useAlert, useNotification } from '@hooks'

export const RemoveCoordinator = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (item: Student) => {
        await onAccept(item)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Accepted`,
                description: `Student "${student?.user?.name}" has been accepted.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for accepting Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`You are about to accept <em>"${student?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={student?.user?.email}
            actionObject={student}
            loading={changeStatusResult.isLoading}
        />
    )
}
