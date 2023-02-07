import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const documentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getDocuments: builder.query<any, void>({
        query: () => `${PREFIX}/document/list`,
        providesTags: ['Documents'],
    }),
    addDocuments: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/document/add`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Documents'],
    }),
})
