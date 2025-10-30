import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Rto } from '@types'

const PREFIX = 'admin/'
export const rtoMessageCenterEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRtosList: builder.query<Rto[], { name?: string }>({
        query: (params) => ({
            url: `${PREFIX}active/rtos-list`,
            params,
        }),
        providesTags: ['RTO-Message'],
    }),

    sendRtoMessage: builder.mutation<any, { id: number; closeNote: string }>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}rto-message/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTO-Enquiry'],
    }),
})
