import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    PaginatedResponse,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'rtos/'
export const coordinatorEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    coordinatorCreate: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}coordinator/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rto-Coordinators'],
    }),

})
