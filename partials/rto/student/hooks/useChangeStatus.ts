import { AdminApi } from '@queries'
import { Student, UserStatus } from '@types'

export const useChangeStatus = () => {
   const [changeStatus, changeStatusResult] =
      AdminApi.Students.useChangeStatusMutation()

   const onAccept = async (student: Student) => {
      await changeStatus({ id: student.id, status: UserStatus.Approved })
   }

   const onReject = async (student: Student) => {
      await changeStatus({ id: student.id, status: UserStatus.Rejected })
   }

   const onBlock = async (student: Student) => {
      await changeStatus({ id: student.id, status: UserStatus.Blocked })
   }

   return { onAccept, onReject, onBlock, changeStatusResult }
}
