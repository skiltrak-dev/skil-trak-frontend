import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'notes'
export const allCommunicationEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    communications: builder.query<any, any>({
        query: (id) => `${PREFIX}/all-communication/${id}`,
        providesTags: ['AllCommunications'],
    }),

    allCommunicationCreate: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['AllCommunications'],
    }),

    allCommunicationUpdate: builder.mutation<any, any>({
        query: (body: any) => ({
            url: `${PREFIX}/${body.id}`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['AllCommunications'],
    }),

    allCommunicationRemove: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['AllCommunications'],
    }),
})
