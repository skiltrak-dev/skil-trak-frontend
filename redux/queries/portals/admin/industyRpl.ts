import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin/'
export const industryRplEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    rplRequestList: builder.query<any, any>({
        query: (params) => {
            return {
                url: `${PREFIX}rpl-requests/list`,
                params,
            }
        },
        providesTags: ['RPL'],
    }),
    rplDelete: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}rpl-request/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['RPL'],
    }),
})
