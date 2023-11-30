import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse } from '@types'
import { TicketStatus } from 'pages/portals/admin/tickets'

const PREFIX = 'tickets'
export const ticketEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllTicket: builder.query<
        PaginatedResponse<any>,
        { limit: number; skip: number }
    >({
        query: (params) => ({
            url: `${PREFIX}/list/all`,
            params,
        }),
        providesTags: ['Tickets'],
    }),
    getTicket: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}`,
            params,
        }),
        providesTags: ['Tickets'],
    }),
    getTicketCount: builder.query<any, void>({
        query: (id) => `${PREFIX}/get/count`,
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
    forwardTicket: builder.mutation<any, { id: any; userId: any }>({
        query: ({ id, userId }) => ({
            url: `${PREFIX}/forward/${id}`,
            params: { userId },
            method: 'PATCH',
        }),
        invalidatesTags: ['Tickets'],
    }),
    closeTicket: builder.mutation<any, { id: number; status: TicketStatus }>({
        query: ({ id, status }) => ({
            url: `${PREFIX}/update-status/${id}`,
            params: { status },
            method: 'PATCH',
        }),
        invalidatesTags: ['Tickets'],
    }),
    addReply: builder.mutation<any, { ticket: number; message: string }>({
        query: ({ ticket, message }) => ({
            url: `${PREFIX}/reply-add/${ticket}`,
            method: 'POST',
            body: { message },
        }),
        invalidatesTags: ['Tickets'],
    }),
    getTicketReplies: builder.query<any, number>({
        query: (id) => `${PREFIX}/replies/get/${id}`,
        providesTags: ['Tickets'],
    }),
    seenTicketReply: builder.mutation<any, number>({
        query: (ticket) => ({
            url: `${PREFIX}/read-message/${ticket}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Tickets'],
    }),
    getStudentTicketsList: builder.query<any, number>({
        query: (id) => `students/tickets/list/${id}`,
        providesTags: ['SubAdminStudents'],
    }),
})
