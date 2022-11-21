import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Rto } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const RejectModal = ({
   rto,
   onCancel,
}: {
   rto: Rto
   onCancel: Function
}) => {
   const { alert } = useAlert()
   const { notification } = useNotification()
   const { onReject, changeStatusResult } = useChangeStatus()

   const onConfirmUClicked = async (rto: Rto) => {
      await onReject(rto)
   }

   useEffect(() => {
      if (changeStatusResult.isSuccess) {
         alert.error({
            title: `Request Rejected`,
            description: `RTO "${rto.user.name}" has been rejected.`,
         })
         onCancel()
      }
      if (changeStatusResult.isError) {
         notification.error({
            title: 'Request Failed',
            description: `Your request for rejecting RTO was failed`,
         })
      }
   }, [changeStatusResult])

   return (
      <ActionModal
         Icon={FaBan}
         variant="error"
         title="Are you sure!"
         description={`You are about to reject "${rto.user.name}". Do you wish to continue?`}
         onConfirm={onConfirmUClicked}
         onCancel={onCancel}
         input
         inputKey={rto.user.email}
         actionObject={rto}
      />
   )
}
