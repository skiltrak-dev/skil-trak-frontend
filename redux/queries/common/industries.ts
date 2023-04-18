import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Course, PaginatedResponse } from '@types'

export const industriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllIndustries: builder.query<any, void>({
        query: () => `filter/industries/all`,
        providesTags: ['Industry'],
    }),
    allGetIndustriesList: builder.query<any, void>({
        query: () => `shared/industries/list`,
        providesTags: ['Industry'],
    }),
})
