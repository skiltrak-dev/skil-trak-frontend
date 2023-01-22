import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos'
export const industriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getIndustriesList: builder.query<any, string>({
        query: (status) => {
            return {
                url: `${PREFIX}/industries/list`,
                params: { status },
            }
        },
        providesTags: ['RTOIndustries'],
    }),
})
