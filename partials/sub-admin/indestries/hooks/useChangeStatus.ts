import { useAssignStudentsToSubAdminMutation, SubAdminApi } from '@queries'
import { Industry, Student, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [assignOrUnAssignStudent, assignOrUnAssignStudentResult] =
        useAssignStudentsToSubAdminMutation()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.Student.changeStatus()

    const onAssignOrUnAssign = async (student: Industry) => {
        await assignOrUnAssignStudent(student?.id)
    }

    const onBlock = async (student: Industry) => {
        await changeStatus({ id: student.id, status: UserStatus.Blocked })
    }
    const onAccept = async (student: Industry) => {
        await changeStatus({ id: student.id, status: UserStatus.Approved })
    }
    const onArchive = async (student: Industry) => {
        await changeStatus({ id: student.id, status: UserStatus.Archived })
    }
    const onReject = async (student: Industry) => {
        await changeStatus({ id: student.id, status: UserStatus.Rejected })
    }

    return {
        onBlock,
        onReject,
        onAccept,
        onArchive,
        changeStatusResult,
        onAssignOrUnAssign,
        assignOrUnAssignStudentResult,
    }
}
