import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = '/notifications'
export const notificationsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getNotifications: builder.query<
        any,
        { status?: string | undefined; skip?: number; limit?: number }
    >({
        query: (params: any) => ({
            url: `${PREFIX}`,
            params,
        }),
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
