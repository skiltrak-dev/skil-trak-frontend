import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    PaginatedResponse,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'rtos'
export const coordinatorEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    coordinatorCreate: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/coordinator/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rto-Coordinators'],
    }),
    getRtoCoordinators: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/coordinator/list`,
            params,
        }),
        providesTags: ['Rto-Coordinators', 'SubAdmins'],
    }),
    getRtoCoordinatorsDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/coordinator/profile/${id}`,
        providesTags: ['Rto-Coordinators'],
    }),
    removeCoordinator: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/coordinator/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Rto-Coordinators'],
    }),
})
