import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminRtosApi = createApi({
    reducerPath: 'subAdminRtosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['SubAdminRtos'],
    endpoints: (builder) => ({
        getSubAdminRtos: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'rtos/list',
                    params,
                }
            },
            providesTags: ['SubAdminRtos'],
        }),
        getSubAdminRTODetail: builder.query<any, string>({
            query: (id) => `rto/profile/${id}`,
            providesTags: ['SubAdminRtos'],
        }),
        getSubAdminRtosStudents: builder.query<any, string>({
            query: (id) => {
                return {
                    url: `rto/students/list/${id}`,
                    params: { id },
                }
            },
            providesTags: ['SubAdminRtos'],
        }),
        getSubAdminRtoAppointments: builder.query<any, string>({
            query: (id) => {
                return {
                    url: `rto/appointments/${id}`,
                    params: { id },
                }
            },
            providesTags: ['SubAdminRtos'],
        }),

        updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
            query: ({ id, status }: any) => {
                return {
                    url: `student/update-status/${id}`,
                    method: 'PATCH',
                    body: { status },
                }
            },
            invalidatesTags: ['SubAdminRtos'],
        }),
        getRTOAssessmentTools: builder.query<
            any,
            { id: number; status: string }
        >({
            query: ({ id, status }) => {
                return {
                    url: `rto/assessment-tool/list/${id}`,
                    params: { status },
                }
            },
            providesTags: ['SubAdminRtos'],
        }),
        getSubAdminRTOCourses: builder.query<any, string>({
            query: (id) => `rto/courses/${id}`,
            providesTags: ['SubAdminRtos'],
        }),
        createRtoSubAdminAssessmentTools: builder.mutation<any, any | null>({
            query: ({ body, id }) => {
                return {
                    url: `rto/assessment-tool/create/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SubAdminRtos'],
        }),
        updateRtoSubAdminAssessmentTools: builder.mutation<any, any | null>({
            query: ({ body, assessment }) => {
                return {
                    url: `rto/assessment-tool/update/${assessment}`,
                    method: 'PATCH',
                    body: { title: body },
                }
            },
            invalidatesTags: ['SubAdminRtos'],
        }),
        updateSubAdminAssessmentToolArchive: builder.mutation<any, any | null>({
            query: (id: any) => {
                return {
                    url: `rto/assessment-tool/archived/${id}`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: ['SubAdminRtos'],
        }),
        removeSubAdminRTOAssessmentTools: builder.mutation<any, any | null>({
            query: (id: any) => {
                return {
                    url: `rto/assessment-tool/remove/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['SubAdminRtos'],
        }),
    }),
})

export const {
    useGetSubAdminRtosQuery,
    useGetSubAdminRTODetailQuery,
    useGetRTOAssessmentToolsQuery,
    useGetSubAdminRtosStudentsQuery,
    useGetSubAdminRtoAppointmentsQuery,
    useGetSubAdminRTOCoursesQuery,
    useUpdateSubAdminRtoStudentStatusMutation,
    useCreateRtoSubAdminAssessmentToolsMutation,
    useUpdateSubAdminAssessmentToolArchiveMutation,
    useRemoveSubAdminRTOAssessmentToolsMutation,
    useUpdateRtoSubAdminAssessmentToolsMutation,
} = subAdminRtosApi
