import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Rto } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const BlockModal = ({
   rto,
   onCancel,
}: {
   rto: Rto
   onCancel: Function
}) => {
   const { alert } = useAlert()
   const { notification } = useNotification()
   const { onBlock, changeStatusResult } = useChangeStatus()

   const onConfirmClicked = async (rto: Rto) => {
      await onBlock(rto)
   }

   useEffect(() => {
      if (changeStatusResult.isSuccess) {
         alert.error({
            title: `RTO Blocked`,
            description: `RTO "${rto.user.name}" has been blocked.`,
         })
         onCancel()
      }
      if (changeStatusResult.isError) {
         notification.error({
            title: 'Request Failed',
            description: `Your request for blocking RTO was failed`,
         })
      }
   }, [changeStatusResult])

   return (
      <ActionModal
         Icon={FaBan}
         variant="error"
         title="Are you sure!"
         description={`You are about to block <em>"${rto.user.name}"</em>. Do you wish to continue?`}
         onConfirm={onConfirmClicked}
         onCancel={onCancel}
         input
         inputKey={rto.user.email}
         actionObject={rto}
      />
   )
}
