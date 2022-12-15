import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Course, PaginatedResponse } from '@types'

export const industriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllIndustries: builder.query<any, any>({
        query: (params: any) => `course/list`,
        providesTags: ['Industry'],
    }),
})
