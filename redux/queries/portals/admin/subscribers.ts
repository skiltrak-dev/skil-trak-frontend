import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { PaginatedResponse, Subscriber } from '@types'

export const subscriberEndpoints = (
   builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
   listSubscribers: builder.query<PaginatedResponse<Subscriber>, any>({
      query: (params) => {
         return {
            url: 'subscribers',
            params,
         }
      },
      providesTags: ['Subscribers'],
   }),

   unsubscribe: builder.mutation({
      query: (id: number) => ({
         url: `subscribers/unsubscribe/${id}`,
         method: 'PATCH',
      }),
      invalidatesTags: ['Subscribers'],
   }),

   resubscribe: builder.mutation<Subscriber, number>({
      query: (id: number) => ({
         url: `subscribers/subscribe/${id}`,
         method: 'PATCH',
      }),
      invalidatesTags: ['Subscribers'],
   }),
})
