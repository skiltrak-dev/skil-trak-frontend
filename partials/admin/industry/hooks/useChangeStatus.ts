import { AdminApi } from '@queries'
import { Industry, UserStatus } from '@types'

export const useChangeStatus = () => {
  const [changeStatus, changeStatusResult] =
    AdminApi.Industries.useStatusChange()

  const onAccept = async (industry: Industry) => {
    await changeStatus({ id: industry.id, status: UserStatus.Approved })
  }

  const onReject = async (industry: Industry) => {
    await changeStatus({ id: industry.id, status: UserStatus.Rejected })
  }

  const onBlock = async (industry: Industry) => {
    await changeStatus({ id: industry.id, status: UserStatus.Blocked })
  }

  return { onAccept, onReject, onBlock, changeStatusResult }
}
