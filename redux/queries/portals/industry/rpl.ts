import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const rplEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRpl: builder.query({
        query: () => `${PREFIX}/rpl/list`,
        providesTags: ['RPL'],
    }),
    addRpl: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/rpl/add`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['RPL'],
    }),
})
