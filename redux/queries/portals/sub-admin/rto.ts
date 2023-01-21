import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const subAdminRtoEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getSubAdminRtos: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/rtos/list`,
            params,
        }),
        providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRTODetail: builder.query<any, string>({
        query: (id) => `${PREFIX}/rto/profile/${id}`,
        providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRtosStudents: builder.query<any, string>({
        query: (id) => ({
            url: `${PREFIX}/rto/students/list/${id}`,
            params: { id },
        }),
        providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRtoAppointments: builder.query<any, string>({
        query: (id) => ({
            url: `${PREFIX}/rto/appointments/${id}`,
            params: { id },
        }),
        providesTags: ['SubAdminRtos'],
    }),

    updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
        query: ({ id, status }: any) => ({
            url: `${PREFIX}/student/update-status/${id}`,
            method: 'PATCH',
            body: { status },
        }),
        invalidatesTags: ['SubAdminRtos'],
    }),
    getRTOAssessmentTools: builder.query<any, { id: number; status: string }>({
        query: ({ id, status }) => ({
            url: `${PREFIX}/rto/assessment-tool/list/${id}`,
            params: { status },
        }),
        providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRTOCourses: builder.query<any, string>({
        query: (id) => `${PREFIX}/rto/courses/${id}`,
        providesTags: ['SubAdminRtos'],
    }),
    createRtoSubAdminAssessmentTools: builder.mutation<any, any | null>({
        query: ({ body, id }) => ({
            url: `${PREFIX}/rto/assessment-tool/create/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminRtos'],
    }),
    updateRtoSubAdminAssessmentTools: builder.mutation<any, any | null>({
        query: ({ body, assessment }) => ({
            url: `${PREFIX}/rto/assessment-tool/update/${assessment}`,
            method: 'PATCH',
            body: { title: body },
        }),
        invalidatesTags: ['SubAdminRtos'],
    }),
    updateSubAdminAssessmentToolArchive: builder.mutation<any, any | null>({
        query: (id: any) => ({
            url: `${PREFIX}/rto/assessment-tool/archived/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminRtos'],
    }),
    removeSubAdminRTOAssessmentTools: builder.mutation<any, any | null>({
        query: (id: any) => ({
            url: `${PREFIX}/rto/assessment-tool/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['SubAdminRtos'],
    }),
})
