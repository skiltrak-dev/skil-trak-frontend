import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PaginatedResponse } from '@types'
import { AuthUtils } from '@utils'

export const subAdminStudentsApi = createApi({
    reducerPath: 'subAdminStudentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['SubAdminStudents'],

    endpoints: (builder) => ({
        getSubAdminStudents: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'subadmin/students/list-all',
                    params,
                }
            },
            providesTags: ['SubAdminStudents'],
        }),

        subAdminFilteredStudents: builder.query<PaginatedResponse<any>, any>({
            query: (params: any) => {
                return {
                    url: `subadmin/student-list/filter`,
                    params,
                }
            },
            providesTags: ['SubAdminStudents'],
        }),

        getSubAdminMyStudents: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'subadmin/my-students/list',
                    params,
                }
            },
            providesTags: ['SubAdminStudents'],
        }),

        updateSubAdminCourseDuration: builder.mutation<any, any | null>({
            query: ({ id, body }: any) => {
                return {
                    url: `subadmin/student/course/timing/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SubAdminStudents'],
        }),

        getSubAdminMyRto: builder.query<any, string>({
            query: (id) => {
                return {
                    url: `subadmin/student/view/${id}`,
                    params: { id },
                }
            },
            providesTags: ['SubAdminStudents'],
        }),
        getSubAdminStudentDetail: builder.query<any, string>({
            query: (id) => {
                return {
                    url: `subadmin/student/view/${id}`,
                    params: { id },
                }
            },
            providesTags: ['SubAdminStudents'],
        }),

        getSubAdminStudentWorkplace: builder.query<any, number>({
            query: (id) => `subadmin/student/workplace-request/${id}`,
            providesTags: ['SubAdminStudents'],
        }),

        assignStudentsToSubAdmin: builder.mutation<any, number>({
            query: (id) => ({
                url: `subadmin/student/assign-subadmin/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminStudents'],
        }),
        subAdminRequestWorkplace: builder.mutation<any, any>({
            query: (body) => ({
                url: `students/workplace-requests`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SubAdminStudents'],
        }),

        subAdminRequestIndustryWorkplace: builder.mutation<any, any>({
            query: (id) => ({
                url: `subadmin/student/workplace-request/apply/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminStudents'],
        }),

        subAdminCancelStudentWorkplaceRequest: builder.mutation<any, any>({
            query: (id) => ({
                url: `subadmin/student/workplace-request/cancel/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminStudents'],
        }),

        getRequiredDocs: builder.query<any, any>({
            query: ({ id, course, user }) => ({
                url: `subadmin/student/required-document/${id}`,
                params: { course, user },
            }),
            providesTags: ['SubAdminStudents'],
        }),

        uploadRequiredDocs: builder.mutation<any, any>({
            query: ({ id, workplaceId, user, body }) => ({
                url: `subadmin/student/workplace/response`,
                method: 'POST',
                params: { docs: [id], wpId: workplaceId, user },
                body,
            }),
            invalidatesTags: ['SubAdminStudents'],
        }),

        findByAbnWorkplace: builder.mutation<any, any>({
            query: (body) => ({
                url: `subadmin/student/industry/find-by-abn`,
                method: 'POST',
                params: { abn: body },
            }),
            invalidatesTags: ['SubAdminStudents'],
        }),

        // updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
        //     query: ({id, status}:any) => {
        //         return {
        //             url: `subadmin/student/update-status/${id}`,
        //             method: 'PATCH',
        //             body: {status}
        //         }
        //     },
        //     invalidatesTags: ['SubAdminRtos'],
        // }),
    }),
})

export const {
    useGetSubAdminStudentsQuery,
    useSubAdminRequestWorkplaceMutation,
    useSubAdminFilteredStudentsQuery,
    useGetSubAdminStudentWorkplaceQuery,
    useGetSubAdminMyRtoQuery,
    useGetSubAdminStudentDetailQuery,
    useUpdateSubAdminCourseDurationMutation,
    useGetSubAdminMyStudentsQuery,
    useAssignStudentsToSubAdminMutation,
    useSubAdminRequestIndustryWorkplaceMutation,
    useSubAdminCancelStudentWorkplaceRequestMutation,
    useGetRequiredDocsQuery,
    useUploadRequiredDocsMutation,
    useFindByAbnWorkplaceMutation,
} = subAdminStudentsApi
