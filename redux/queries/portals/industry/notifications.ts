import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const notificationsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getNotifications: builder.query<any, any>({
        query: (params) => ({
            url: '/notifications',
            params,
        }),
        providesTags: ['Notifications'],
    }),
    getNotificationDetail: builder.query({
        query: (id) => `/notifications/${id}`,
        providesTags: ['Notifications'],
    }),
    readNotification: builder.mutation({
        query: (id) => ({
            url: `/notifications/read/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Notifications'],
    }),
})
