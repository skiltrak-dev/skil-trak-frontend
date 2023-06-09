import { useAssignStudentsToSubAdminMutation, SubAdminApi } from '@queries'
import { Industry, Student, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [assignOrUnAssignStudent, assignOrUnAssignStudentResult] =
        useAssignStudentsToSubAdminMutation()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.SubAdmin.changeSubAdminUserStatus()

    const onAssignOrUnAssign = async (industry: Industry) => {
        await assignOrUnAssignStudent(industry?.id)
    }

    const onBlock = async (industry: Industry) => {
        await changeStatus({
            id: industry?.user?.id,
            status: UserStatus.Blocked,
        })
    }
    const onAccept = async (industry: Industry) => {
        await changeStatus({
            id: industry?.user?.id,
            status: UserStatus.Approved,
        })
    }
    const onArchive = async (industry: Industry) => {
        await changeStatus({
            id: industry?.user?.id,
            status: UserStatus.Archived,
        })
    }
    const onReject = async (industry: Industry) => {
        await changeStatus({
            id: industry?.user?.id,
            status: UserStatus.Rejected,
        })
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
