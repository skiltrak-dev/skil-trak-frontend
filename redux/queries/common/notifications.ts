import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = '/notifications'
export const notificationsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getNotifications: builder.query<any, void>({
        query: () => `${PREFIX}`,
        providesTags: ['AllNotifications'],
    }),
    isReadNotification: builder.mutation({
      query: (id: any) => ({
          url: `${PREFIX}/read/${id}`,
          method: 'PATCH',
      }),
      invalidatesTags: ['AllNotifications'],
  }),
})
