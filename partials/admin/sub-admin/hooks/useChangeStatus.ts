import { AdminApi } from '@queries'
import { SubAdmin, UserStatus } from '@types'

export const useChangeStatus = () => {
  const [changeStatus, changeStatusResult] =
    AdminApi.Industries.useStatusChange()

  const onAccept = async (subAdmin: SubAdmin) => {
    await changeStatus({ id: subAdmin.id, status: UserStatus.Approved })
  }

  const onReject = async (subAdmin: SubAdmin) => {
    await changeStatus({ id: subAdmin.id, status: UserStatus.Rejected })
  }

  const onBlock = async (subAdmin: SubAdmin) => {
    await changeStatus({ id: subAdmin.id, status: UserStatus.Blocked })
  }

  return { onAccept, onReject, onBlock, changeStatusResult }
}
