import { CommonApi } from '@queries'
import { SubAdmin, User, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [changeStatus, changeStatusResult] = CommonApi.User.changeUserStatus()

    const onAccept = async (user: User) => {
        await changeStatus({ id: user?.id, status: UserStatus.Approved })
    }

    const onArchive = async (user: User) => {
        await changeStatus({ id: user?.id, status: UserStatus.Archived })
    }

    const onReject = async (subAdmin: SubAdmin) => {
        await changeStatus({
            id: subAdmin?.user?.id,
            status: UserStatus.Rejected,
        })
    }

    const onBlock = async (user: User) => {
        await changeStatus({ id: user?.id, status: UserStatus.Blocked })
    }

    return { onArchive, onAccept, onReject, onBlock, changeStatusResult }
}
