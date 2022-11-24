import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Job, PaginatedResponse } from '@types'

const PREFIX = 'admin/'
export const jobEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    jobs: builder.query<PaginatedResponse<Job>, any>({
        query: (params) => {
            return {
                url: `${PREFIX}jobs/list`,
                params,
            }
        },
        providesTags: ['Jobs'],
    }),

    jobStatusChange: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}jobs/approve/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Jobs'],
    }),
})
