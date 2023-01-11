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
        await changeStatus({ id: student.id, status: UserStatus.Blocked })
    }

    return {
        onBlock,
        changeStatusResult,
        onAssignOrUnAssign,
        assignOrUnAssignStudentResult,
    }
}
