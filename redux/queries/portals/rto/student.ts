import { Students } from '@partials/sub-admin/indestries'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    PaginatedResponse,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'rtos'
export const studentEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    studentsCount: builder.query<any, void>({
        query: () => `${PREFIX}/students/count`,
        providesTags: ['Rto-Students'],
    }),
    studentsImport: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/students/import`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rto-Students'],
    }),
    addStudent: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/student/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rto-Students'],
    }),

    studentsImportedList: builder.query<any, any>({
        query: () => `${PREFIX}/students/imported-lists`,
        providesTags: ['Rto-Students'],
    }),
    getRtoStudents: builder.query<any, any>({
        query: (params) => {
            return {
                url: `${PREFIX}/students/list`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getRtoStudentProfile: builder.query<any, any>({
        query: (id) => {
            return {
                url: `${PREFIX}/student/profile/${id}`,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    removeRTOStudent: builder.mutation<any, any | null>({
        query: (id) => {
            return {
                url: `${PREFIX}/student/remove/${id}`,
                method: 'DELETE',
            }
        },
        invalidatesTags: ['Rto-Students'],
    }),
    changeRTOStudentsStatus: builder.mutation<
        any,
        { id: number; status: string }
    >({
        query: ({ id, status }) => {
            return {
                url: `${PREFIX}/student-status/update/${id}`,
                method: 'PATCH',
                body: { status },
            }
        },
        invalidatesTags: ['Rto-Students'],
    }),
    getNotContactableStudents: builder.query<any, any>({
        query: () => `statistics/rto/student/not-contactable`,
        providesTags: ['Rto-Students'],
    }),
    getBlockedStudentsReport: builder.query<any, any>({
        query: () => `statistics/rto/students/blocked`,
        providesTags: ['Rto-Students'],
    }),
    getArchivedStudentsReport: builder.query<any, any>({
        query: () => `statistics/rto/students/archived`,
        providesTags: ['Rto-Students'],
    }),

    getNewStudentsReport: builder.query<any, any>({
        query: (params) => {
            return {
                url: `statistics/rto/new-students`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getCancelledWorkplaceReport: builder.query<any, any>({
        query: (params) => {
            return {
                url: `statistics/rto/workplace-requests/cancelled`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getCompletedWorkplaceReport: builder.query<any, any>({
        query: (params) => {
            return {
                url: `statistics/rto/workplace-requests/completed`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getTerminatedWorkplaceReport: builder.query<any, any>({
        query: (params) => {
            return {
                url: `statistics/rto/workplace-requests/terminated`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getWorkplaceRequestsReport: builder.query<any, any>({
        query: (params) => {
            return {
                url: `statistics/rto/workplace-requests`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getAppointmentsReport: builder.query<any, any>({
        query: (params) => {
            return {
                url: `statistics/rto/appointments/list`,
                params,
            }
        },
        providesTags: ['Rto-Students'],
    }),
    getWithoutWorkplaceReport: builder.query<any, any>({
        query: () => `statistics/rto/students/list/with-out-workplace`,
        providesTags: ['Rto-Students'],
    }),
    getReportedStudentsReport: builder.query<any, any>({
        query: () => `statistics/rto/students/reported`,
        providesTags: ['Rto-Students'],
    }),
    getReportDownloadLink: builder.query<any, any>({
        query: (id) => ({
            url: `statistics/rto/summary/generate/${id}`,
            responseType: 'arraybuffer',
        }),
        providesTags: ['Rto-Students'],
    }),
})
