import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Student, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'

// query
import { useAssignStudentsToSubAdminMutation } from '@queries'
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
        await onAssignOrUnAssign(student)
    }

    useEffect(() => {
        if (assignOrUnAssignStudentResult.isSuccess) {
            alert.error({
                title: `Student UnAssigned`,
                description: `Student "${student?.user?.name}" has been Un Assigned.`,
            })
            onCancel()
        }
        if (assignOrUnAssignStudentResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for Un Assigning Student`,
            })
        }
    }, [assignOrUnAssignStudentResult])

    return (
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
    )
}
