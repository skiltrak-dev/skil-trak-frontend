import { useAssignStudentsToSubAdminMutation } from '@queries'
import { Student } from '@types'

export const useChangeStatus = () => {
    const [assignOrUnAssignStudent, assignOrUnAssignStudentResult] =
        useAssignStudentsToSubAdminMutation()

    const onAssignOrUnAssign = async (student: Student) => {
        await assignOrUnAssignStudent(student?.id)
    }

    return { onAssignOrUnAssign, assignOrUnAssignStudentResult }
}
