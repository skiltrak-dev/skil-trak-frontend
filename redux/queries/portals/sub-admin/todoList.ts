import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginationValues } from '@types'

const PREFIX = 'todos'
export const todoListEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    todoListCount: builder.query<any, void>({
        query: () => `${PREFIX}/count/all`,
        providesTags: ['TODO'],
    }),

    highPriorityTodoList: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/high-priority/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),

    appointmentTodoList: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/appointment/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),

    ticketTodoList: builder.query<any, PaginationValues>({
        query: (params) => ({ url: `${PREFIX}/open-tickets/data`, params }),
        providesTags: ['TODO'],
    }),

    workplaceTodoList: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/workplace-requests/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),

    weeklyFollowUp: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/student-follow-up/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),

    monthlyPartnerIndustriesFollowUp: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/partner-industries/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),
    quarterlyListedIndustries: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/listed-industries/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),

    biMonthlyNonPartnerIndustries: builder.query<any, PaginationValues>({
        query: (params) => ({
            url: `${PREFIX}/non-partner-industries/data`,
            params,
        }),
        providesTags: ['TODO'],
    }),

    updateTodoStatus: builder.mutation<any, { id: number; status: string }>({
        query: ({ id, ...params }) => ({
            url: `${PREFIX}/${id}`,
            method: 'PATCH',
            params,
        }),
        invalidatesTags: ['TODO'],
    }),
})
