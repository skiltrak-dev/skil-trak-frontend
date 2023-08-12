import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginationValues } from '@types'

const PREFIX = 'industries'
export const headQuarterEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getIndustryHeadQuarter: builder.query<any, PaginationValues>({
        query: () => `${PREFIX}/head-office/view`,
        providesTags: ['HeadQuarter'],
    }),
})
