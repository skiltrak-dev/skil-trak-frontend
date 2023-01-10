import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/industries/`,
    prepareHeaders: (headers, { getState }) => {
      const token = AuthUtils.getToken()

      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (params) => {
        return {
          url: 'admin/jobs/list',
          params,
        }
      },
      providesTags: ['Job'],
    }),
    jobChangeStatus: builder.mutation({
      query: (id) => ({
        url: `admin/jobs/approve/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Job'],
    }),
    getIndustryJobs: builder.query({
      query: (params) => {
        return {
          url: 'job/list',
          params,
        }
      },
      providesTags: ['Job'],
    }),
    getJobDetail: builder.query({
      query: (id) => `job/view/${id}`,
      providesTags: ['Job'],
    }),
    addJob: builder.mutation({
      query: (body) => ({
        url: `job/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation({
      query: (body) => ({
        url: `job/update/${body.id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Job'],
    }),
    removeJob: builder.mutation({
      query: (id) => ({
        url: `job/remove/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
    getBrowseCandidates: builder.query<any, any>({
      query: (params:any) => {
        return {
          url: 'browse-candidate/list',
          params,
        }
      },
      providesTags: ['Job'],
    }),
  }),
})

export const {
  useAddJobMutation,
  useGetAllJobsQuery,
  useUpdateJobMutation,
  useRemoveJobMutation,
  useGetJobDetailQuery,
  useGetIndustryJobsQuery,
  useJobChangeStatusMutation,
  useGetBrowseCandidatesQuery,
} = jobsApi
