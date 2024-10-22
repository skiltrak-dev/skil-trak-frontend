import { useAssignStudentsToSubAdminMutation, SubAdminApi } from '@queries'
import { Student, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [assignOrUnAssignStudent, assignOrUnAssignStudentResult] =
        useAssignStudentsToSubAdminMutation()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.Student.changeStatus()

    const onAssignOrUnAssign = async (student: Student) => {
        await assignOrUnAssignStudent(student?.id)
    }

    const onBlock = async (student: Student) => {
        return await changeStatus({
            id: student.id,
            status: UserStatus.Blocked,
        })
    }
    const onAccept = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Approved })
    }
    const onArchive = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Archived })
    }
    const onReject = async (student: Student) => {
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
