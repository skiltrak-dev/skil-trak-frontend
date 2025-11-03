import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos/'
export const placementRequestsEndPoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentPlacementRequestList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}placement-requests/list`,
            params,
        }),
        providesTags: ['RTO'],
    }),
    getStudentPlacementRequestStats: builder.query<any, void>({
        query: () => ({
            url: `${PREFIX}dashboard/placements/metrics`,
        }),
        providesTags: ['RTO'],
    }),

    aupdateRTOProfile: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: 'rtos/profile/update',
            method: 'PATCH',
            params: { rto: id },
            body,
        }),
        invalidatesTags: ['RTO'],
    }),
})
