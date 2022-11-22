import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
   sector,
   onCancel,
}: {
   sector: Sector
   onCancel: Function
}) => {
   const { alert } = useAlert()
   const { notification } = useNotification()
   const [remove, removeResult] = AdminApi.Sectors.useRemoveMutation()

   const onConfirmUClicked = async (rto: Rto) => {
      await remove(rto.id)
   }

   useEffect(() => {
      if (removeResult.isSuccess) {
         alert.error({
            title: `Sector Deleted`,
            description: `Sector "${sector.name}" has been deleted.`,
         })
         onCancel()
      }
      if (removeResult.isError) {
         notification.error({
            title: 'Request Failed',
            description: `Your request for deleting RTO was failed`,
         })
      }
   }, [removeResult])

   return (
      <ActionModal
         Icon={FaTrash}
         variant="error"
         title="Are you sure!"
         description={`You are about to delete "${sector.name}". Do you wish to continue?`}
         onConfirm={onConfirmUClicked}
         onCancel={onCancel}
         input
         inputKey={sector.name}
         actionObject={sector}
      />
   )
}
