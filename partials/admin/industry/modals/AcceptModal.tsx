import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { useChangeStatus } from '../hooks'

export const AcceptModal = ({
   industry,
   onCancel,
}: {
   industry: Industry
   onCancel: Function
}) => {
   const { alert } = useAlert()
   const { notification } = useNotification()
   const { onAccept, changeStatusResult } = useChangeStatus()

   const onConfirmUClicked = async (industry: Industry) => {
      await onAccept(industry)
   }

   useEffect(() => {
      if (changeStatusResult.isSuccess) {
         alert.success({
            title: `Request Accepted`,
            description: `Industry "${industry.user.name}" has been accepted.`,
         })
         onCancel()
      }
      if (changeStatusResult.isError) {
         notification.error({
            title: 'Request Failed',
            description: `Your request for accepting Industry was failed`,
         })
      }
   }, [changeStatusResult])

   return (
      <ActionModal
         Icon={HiCheckBadge}
         variant="success"
         title="Are you sure!"
         description={`You are about to accept <em>"${industry.user.name}"<em>. Do you wish to continue?`}
         onConfirm={onConfirmUClicked}
         onCancel={onCancel}
         input
         inputKey={industry.user.email}
         actionObject={industry}
      />
   )
}
