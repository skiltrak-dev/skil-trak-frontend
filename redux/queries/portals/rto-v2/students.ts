import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginationWithSearch } from '@types'

const PREFIX = 'rtos/'
export const studentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    rtoStudentHistory: builder.query<any, PaginationWithSearch>({
        query: (params) => ({
            url: `${PREFIX}students/history/list`,
            params,
        }),
        providesTags: ['RTO'],
    }),
})
