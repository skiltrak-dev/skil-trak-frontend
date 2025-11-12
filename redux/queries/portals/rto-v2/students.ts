import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginationWithSearch } from '@types'
import { IWorkplaceIndustries } from 'redux/queryTypes'

const PREFIX = 'rtos/'
export const studentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    rtoStudentHistory: builder.query<any, PaginationWithSearch>({
        query: (params) => ({
            url: `${PREFIX}students/history/list`,
            params,
        }),
        providesTags: ['RTO'],
    }),

    importStudents: builder.mutation<any, PaginationWithSearch>({
        query: (body) => ({
            url: `${PREFIX}students/import/v2`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTO'],
    }),

    addSingleStudentWithPlacementType: builder.mutation<
        any,
        PaginationWithSearch
    >({
        query: (body) => ({
            url: `${PREFIX}student/add/v2`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTO'],
    }),

    getWpForAutoMatching: builder.query<IWorkplaceIndustries[], void>({
        query: () => `${PREFIX}workplace-request/pending/list`,
        providesTags: ['RTO'],
    }),

    runAutomationForAvailabeleStudents: builder.mutation<
        any,
        { ids: number[] }
    >({
        query: (body) => ({
            url: `students/workplace-requests/pending-workplace-request/process`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTO-WORKPLACE'],
    }),
})
