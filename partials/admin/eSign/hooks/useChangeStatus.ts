import { AdminApi, CommonApi } from '@queries'
import { Student, UserStatus } from '@types'

export const useChangeStatus = () => {
    const [changeStatus, changeStatusResult] = AdminApi.ESign.useChangeStatus()

    const onAccept = async (eSign: any) => {
        await changeStatus({ id: eSign?.id, status: UserStatus.Approved })
    }

    const onArchive = async (eSign: any) => {
        await changeStatus({ id: eSign?.id, status: UserStatus.Archived })
    }

    return {
        changeStatus,
        onAccept,
        onArchive,
        changeStatusResult,
    }
}
