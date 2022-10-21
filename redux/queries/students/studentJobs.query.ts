import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { StudentJobsType } from 'redux/queryTypes'

export const studentJobsApi = createApi({
    reducerPath: 'studentJobsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/students/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentJobs'],
    endpoints: (builder) => ({
        getStudentJobs: builder.query<StudentJobsType[], void>({
            query: (params: any) => {
                return {
                    url: 'jobs/list',
                    params,
                }
            },
            providesTags: ['StudentJobs'],
        }),
        getStudentJobDetail: builder.query<StudentJobsType, string>({
            query: (id: string) => `jobs/view/${id}`,
            providesTags: ['StudentJobs'],
        }),
        saveJob: builder.mutation({
            query: (id) => ({
                url: `jobs/save/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['StudentJobs'],
        }),
        // jobChangeStatus: builder.mutation({
        //   query: (id) => ({
        //     url: `admin/jobs/approve/${id}`,
        //     method: "PATCH",
        //   }),
        //   invalidatesTags: ["Job"],
        // }),
        // getJobs: builder.query({
        //   query: (params) => {
        //     return {
        //       url: "industries/job/list",
        //       params,
        //     };
        //   },
        //   providesTags: ["Job"],
        // }),

        // updateJob: builder.mutation({
        //   query: (body) => ({
        //     url: `industries/job/update/${body.id}`,
        //     method: "PATCH",
        //     body: body,
        //   }),
        //   invalidatesTags: ["Job"],
        // }),
        // removeJob: builder.mutation({
        //   query: (id) => ({
        //     url: `industries/job/remove/${id}`,
        //     method: "DELETE",
        //   }),
        //   invalidatesTags: ["Job"],
        // }),
    }),
})

export const {
    useGetStudentJobsQuery,
    useGetStudentJobDetailQuery,
    useSaveJobMutation,
    //   useGetJobsQuery,
    //   useJobChangeStatusMutation,
    //   useUpdateJobMutation,
    //   useRemoveJobMutation,
} = studentJobsApi
