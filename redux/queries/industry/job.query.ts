import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_END_POINT,
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
          url: 'industries/job/list',
          params,
        }
      },
      providesTags: ['Job'],
    }),
    getJobDetail: builder.query({
      query: (id) => `industries/job/view/${id}`,
      providesTags: ['Job'],
    }),
    addJob: builder.mutation({
      query: (body) => ({
        url: `industries/job/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation({
      query: (body) => ({
        url: `industries/job/update/${body.id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Job'],
    }),
    removeJob: builder.mutation({
      query: (id) => ({
        url: `industries/job/remove/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
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
} = jobsApi
