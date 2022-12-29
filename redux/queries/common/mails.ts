import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'

const PREFIX = 'messaging'
export const mailsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getMessages: builder.query<any, any>({
        query: (id) => `${PREFIX}/mail/list/${id}`,
        providesTags: ['Mails'],
    }),
    sendMessage: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/email`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Mails'],
    }),
})
