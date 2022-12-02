import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const messagesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAdminMessages: builder.query<any, any>({
        query: (id) => `${PREFIX}/mail/list/${id}`,
        providesTags: ['Message'],
    }),
    sendAdminMessage: builder.mutation({
        query: (body) => ({
            url: `messaging/email`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Message'],
    }),
})
