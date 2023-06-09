import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'statistics/sub-admin'
export const subAdminReports = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAssignedStudentsReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/assigned`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getAssignedWorkplaceReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace/assigned`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getActiveStudentsReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/active`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getSubAdminArchivedStudentsReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/archive`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getStudentsCallsReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/called`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getBookAppointmentsReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/appointments/booked`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getSubAdminTerminatedWorkplaceReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-requests/terminated`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getSubAdminCompletedWorkplaceReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-requests/completed`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getSubAdminCancelledWorkplaceReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-requests/cancelled`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getStudentWorkplaceStartedReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-requests/started`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getStudentWithNoWorkplaceReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/no-workplace-requests`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getSubAdminReportDownloadLink: builder.query<any, any>({
        query: ({ userId, ...params }) => ({
            url: `${PREFIX}/summary/generate/${userId}`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
    getStudentProvidedWorkplaceReport: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/student-provided/workplace-requests`,
            params,
        }),
        providesTags: ['SubAdminReports'],
    }),
})
