import { PaginationValues } from '@types'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = '/notifications'
export const notificationsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getNotifications: builder.query<
        any,
        PaginationValues & { search?: string; id?: number }
    >({
        query: (params: any) => ({
            url: `${PREFIX}`,
            params,
        }),
        providesTags: ['AllNotifications'],
    }),
    isReadNotification: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/read/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AllNotifications'],
    }),
    getPlacementNotifications: builder.query<
        any,
        { status?: string | undefined; skip?: number; limit?: number }
    >({
        query: (params: any) => ({
            url: `${PREFIX}/placement-started`,
            params,
        }),
        providesTags: ['AllNotifications'],
    }),
})
