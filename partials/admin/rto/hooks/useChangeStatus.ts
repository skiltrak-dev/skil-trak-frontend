import { AdminApi } from '@queries'
import { Rto, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [changeStatus, changeStatusResult] =
        AdminApi.Rtos.useChangeStatusMutation()

    const onArchive = async (rto: Rto) => {
        return await changeStatus({ id: rto.id, status: UserStatus.Archived })
    }

    const onAccept = async (rto: Rto) => {
        await changeStatus({ id: rto.id, status: UserStatus.Approved })
    }

    const onReject = async (rto: Rto) => {
        await changeStatus({ id: rto.id, status: UserStatus.Rejected })
    }

    const onBlock = async (rto: Rto) => {
        return await changeStatus({ id: rto.id, status: UserStatus.Blocked })
    }

    return { onAccept, onArchive, onReject, onBlock, changeStatusResult }
}
