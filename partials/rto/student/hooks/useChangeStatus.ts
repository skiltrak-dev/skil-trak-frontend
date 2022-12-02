import { useChangeRTOStudentsStatusMutation } from '@queries'
import { Student, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [changeStatus, changeStatusResult] =
        useChangeRTOStudentsStatusMutation()

    const onAccept = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Approved })
    }

    const onArchive = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Archived })
    }

    const onReject = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Rejected })
    }

    const onBlock = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Blocked })
    }

    return { onAccept, onReject, onBlock, onArchive, changeStatusResult }
}
