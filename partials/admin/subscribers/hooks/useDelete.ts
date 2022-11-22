import { useAlert } from '@hooks'
import { AdminApi } from '@queries'
import { Subscriber } from '@types'
import { useEffect } from 'react'

export const useDelete = () => {
   const { alert } = useAlert()
   const [resubscribe, resubscribeResult] =
      AdminApi.Subscribers.useResubscribeMutation()

   const onDelete = async (subscriber: Subscriber) => {
      await resubscribe(subscriber.id)
   }

   useEffect(() => {
      if (resubscribeResult.isSuccess)
         alert.error({
            title: 'User Deleted',
            description: `User "${resubscribeResult?.data.email}" has been resubscribed`,
         })
   }, [resubscribeResult])

   return { onDelete }
}
