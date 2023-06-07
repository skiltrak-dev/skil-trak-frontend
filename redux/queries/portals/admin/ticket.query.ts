import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'tickets'
export const ticketEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getTicket: builder.query<any, { limit: number; skip: number }>({
        query: (params) => ({
            url: `${PREFIX}`,
            params,
        }),
        providesTags: ['Tickets'],
    }),
    getTicketDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/${id}`,
        providesTags: ['Tickets'],
    }),
    createTicket: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}`,
            body,
            method: 'POST',
        }),
        invalidatesTags: ['Tickets'],
    }),
    closeTicket: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/close/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Tickets'],
    }),
})
