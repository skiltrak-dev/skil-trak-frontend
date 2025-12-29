// support-team
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
const PREFIX = 'support'
export const teamsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    // ==============================================================
    //   ---------------------- QUERIES -------------------------
    // ==============================================================
    getAllSupportTeams: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}-team`,
            params,
        }),
        providesTags: ['Team'],
    }),
    getTeamCounts: builder.query<any, void>({
        query: () => ({
            url: `${PREFIX}-team/statistics/get`,
        }),
        providesTags: ['Team'],
    }),
    // Auto tickets
    getAutomatedTickets: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}-task`,
            params,
        }),
        providesTags: ['Team'],
    }),
    getAutomatedTicketDetails: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}-task/${id}`,
        }),
        providesTags: ['Team'],
    }),
    getAutomatedTicketNotes: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}-task/${id}/notes/get-all`,
        }),
        providesTags: ['Team'],
    }),
    // ==============================================================
    //   ---------------------- MUTATIONS -------------------------
    // ==============================================================
    // support-team post request
    createSupportTeam: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}-team`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Team'],
    }),
    deleteSupportTeam: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}-team/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Team'],
    }),
    // id/severity-update
    updateAutoTicketPriority: builder.mutation<any, any>({
        query: ({ id, params }) => ({
            url: `${PREFIX}-task/${id}/severity-update`,
            method: 'PATCH',
            params,
        }),
        invalidatesTags: ['Team'],
    }),
    updateAutoTicketStatus: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}-task/${id}/status-update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Team'],
    }),
    addAutoTicketNote: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}-task/${id}/add-note`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Team'],
    }),
})
