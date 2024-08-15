import { AdminApi, CommonApi } from '@queries'
import { Student, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [changeStatus, changeStatusResult] =
        AdminApi.Students.useChangeStatusMutation()
    const [bulkAction, resultBulkAction] =
        CommonApi.changeUserStatus.useChangeStatus()

    const onBlockMultiStudents = async (studentIds: number[]) => {
        return await bulkAction({ ids: studentIds, status: UserStatus.Blocked })
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

    const onBlock = async (student: Student) => {
        await changeStatus({ id: student.id, status: UserStatus.Blocked })
    }

    return {
        changeStatus,
        onAccept,
        onReject,
        onArchive,
        onBlock,
        changeStatusResult,
        onBlockMultiStudents,
        resultBulkAction,
    }
}
