import { ActionModal } from '@components'
import { useAlert } from '@hooks'
import { AdminApi } from '@queries'
import { Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'

export const UnsubscribeModal = ({
   subscriber,
   onCancel,
}: {
   subscriber: Subscriber
   onCancel: Function
}) => {
   const { alert } = useAlert()
   const [unsubscribe, unsubscribeResult] =
      AdminApi.Subscribers.useUnsubscribeMutation()

   const onConfirmUClicked = async (subscriber: Subscriber) => {
      await unsubscribe(subscriber.id)
   }

   useEffect(() => {
      if (unsubscribeResult.isSuccess) {
         alert.info({
            title: `User Unsubscribed`,
            description: `User "${subscriber.email}" has been unsubscribed successfully.`,
         })
         onCancel()
      }
      if (unsubscribeResult.isError) {
         // show notification
      }
   }, [unsubscribeResult])

   return (
      <ActionModal
         Icon={FaBan}
         variant="error"
         title="Are you sure!"
         description={`You are about to unsubscribe "${subscriber.email}". This mean, user will no longer be able to hear from you. Do you wish to continue?`}
         onConfirm={onConfirmUClicked}
         onCancel={onCancel}
         input
         inputKey={subscriber.email}
         actionObject={subscriber}
      />
   )
}
