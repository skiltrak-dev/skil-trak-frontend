import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rtoAssessmentToolsApi = createApi({
    reducerPath: 'rtoAssessmentToolsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/rtos/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['RtoAssessmentToolsList'],
    endpoints: (builder) => ({
        getAssessmentToolByCourse: builder.query<
            any,
            { id: number; status: string }
        >({
            query: ({ id, status }) => {
                return {
                    url: `course-assessment-tool/list/${id}`,
                    params: { status },
                }
            },
            providesTags: ['RtoAssessmentToolsList'],
        }),
        createRtoAssessmentTools: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `course-assessment-tool/create`,
                    // url: `create/assessmenttool`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['RtoAssessmentToolsList'],
        }),
        getAssessmentTool: builder.query<any, string>({
            query: (status: string) => {
                return {
                    url: 'assessmenttool/list',
                    params: { status },
                }
            },
            providesTags: ['RtoAssessmentToolsList'],
        }),
        getAssessmentToolDetail: builder.query<any, number | null>({
            query: (id: number | null) => {
                return {
                    url: `assessmenttool/${id}`,
                }
            },
            providesTags: ['RtoAssessmentToolsList'],
        }),
        // getAssessmentToolCourses: builder.query<any, number | null>({
        //     query: (id: number | null) => {
        //         return {
        //             url: `rtos/assessmenttool/${id}`,
        //         }
        //     },
        //     providesTags: ['RtoAssessmentToolsList'],
        // }),

        updateAssessmentToolArchive: builder.mutation<any, any | null>({
            query: (id: any) => {
                return {
                    url: `assessment-tool/archived/${id}`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: ['RtoAssessmentToolsList'],
        }),
        removeRTOAssessmentTools: builder.mutation<any, any | null>({
            query: (id: any) => {
                return {
                    url: `assessment-tool/remove/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['RtoAssessmentToolsList'],
        }),
    }),
})

export const {
    useGetAssessmentToolQuery,
    useGetAssessmentToolDetailQuery,
    useGetAssessmentToolByCourseQuery,
    useCreateRtoAssessmentToolsMutation,
    useUpdateAssessmentToolArchiveMutation,
    useRemoveRTOAssessmentToolsMutation,
} = rtoAssessmentToolsApi
