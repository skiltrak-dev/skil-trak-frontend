import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student, SubAdmin } from '@types'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

// query
import { useChangeStatus } from '../hooks'

interface StudentSubadmin extends Student {
    subadmin?: SubAdmin
}

export const AssignStudentModal = ({
    student,
    onCancel,
}: {
    student: StudentSubadmin
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
            alert.success({
                title: `Student Assigned`,
                description: `Student "${student?.user?.name}" has been Assigned.`,
            })
            onCancel()
        }
        if (assignOrUnAssignStudentResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for Assigning Student`,
            })
        }
    }, [assignOrUnAssignStudentResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`You are about to ${
                student?.subadmin ? 'Un-Assign' : 'Assign'
            }  <em>"${student?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={student?.user?.email}
            actionObject={student}
            loading={assignOrUnAssignStudentResult.isLoading}
        />
    )
}
