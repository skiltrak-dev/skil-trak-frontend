import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const studentAssessmentToolsApi = createApi({
    reducerPath: 'studentAssessmentToolsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentAssessmentToolsList'],
    endpoints: (builder) => ({

        getAssessmentTool: builder.query<any, string>({
            query: (status:string) => {
                return {
                    url: 'rtos/assessmenttool/list',
                    params: {status}  
                }
            },
            providesTags: ['StudentAssessmentToolsList'],
        }),
        // getAssessmentToolDetail: builder.query<any, number | null>({
        //     query: (id: number | null) => {
        //         return {
        //             url: `rtos/assessmenttool/${id}`,
        //         }
        //     },
        //     providesTags: ['StudentAssessmentToolsList'],
        // }),
        // getAssessmentToolCourses: builder.query<any, number | null>({
        //     query: (id: number | null) => {
        //         return {
        //             url: `rtos/assessmenttool/${id}`,
        //         }
        //     },
        //     providesTags: ['StudentAssessmentToolsList'],
        // }),

        // updateAssessmentToolArchive: builder.mutation<any, any | null>({
        //     query: (id:any) => {
        //         return {
        //             url: `rtos/assessmenttool/archived/${id}`,
        //             method: 'PATCH',
        //         }
        //     },
        //     invalidatesTags: ['StudentAssessmentToolsList'],
        // }),

    }),
})

export const {
    
} = studentAssessmentToolsApi