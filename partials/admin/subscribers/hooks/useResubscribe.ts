import { useAlert } from '@hooks'
import { AdminApi } from '@queries'
import { Subscriber } from '@types'
import { useEffect } from 'react'

export const useResubscribe = () => {
   const { alert } = useAlert()
   const [resubscribe, resubscribeResult] =
      AdminApi.Subscribers.useResubscribeMutation()

   const onResubscribe = async (subscriber: Subscriber) => {
      await resubscribe(subscriber.id)
   }

   useEffect(() => {
      if (resubscribeResult.isSuccess)
         alert.info({
            title: 'User Resubscribed',
            description: `User "${resubscribeResult?.data.email}" has been resubscribed`,
         })
   }, [resubscribeResult])

   return { onResubscribe }
}
