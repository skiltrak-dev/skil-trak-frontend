import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, PaginationWithSearch } from '@types'

const PREFIX = 'rto-observer/'
export const studentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRtoContactPersonStudents: builder.query<
        PaginatedResponse<any>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}students/list`,
            params,
        }),
        providesTags: ['Volunteer'],
    }),
})
