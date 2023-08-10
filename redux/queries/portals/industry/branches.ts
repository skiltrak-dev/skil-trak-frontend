import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginationValues } from '@types'

const PREFIX = 'industries'
export const branchesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getBranches: builder.query<any, PaginationValues>({
        query: () => `${PREFIX}/branches/list`,
        providesTags: ['Branches'],
    }),
})
