import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

// query
import { useChangeStatus } from '../hooks'

export const UnAssignStudentModal = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const { onAssignOrUnAssign, assignOrUnAssignStudentResult } =
        useChangeStatus()

    const onConfirmClicked = async (student: Student) => {
        const res: any = await onAssignOrUnAssign(student)

        if (res?.data) {
            notification.error({
                title: `Student UnAssigned`,
                description: `Student "${student?.user?.name}" has been Un Assigned.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={assignOrUnAssignStudentResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to UnAssign <em>"${student?.user?.name}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={student?.user?.email}
                actionObject={student}
                loading={assignOrUnAssignStudentResult.isLoading}
            />
        </>
    )
}
