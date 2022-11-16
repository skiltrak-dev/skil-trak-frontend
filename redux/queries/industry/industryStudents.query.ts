import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const industryStudentsApi = createApi({
  reducerPath: 'industryStudentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_END_POINT,
    prepareHeaders: (headers) => {
      // const token = (getState()).usersSlice.token;
      const token = AuthUtils.getToken()
      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Students'],
  endpoints: (builder) => ({
    getIndustryStudents: builder.query({
      query: (params) => {
        return {
          url: 'industries/student/list',
          params,
        }
      },
      providesTags: ['Students'],
    }),
    getIndustryStudentProfile: builder.query({
      query: (id) => `industries/student/view/${id}`,
      providesTags: ['Students'],
    }),
  }),
})

export const {
  useGetIndustryStudentsQuery,
  useGetIndustryStudentProfileQuery,
} = industryStudentsApi
