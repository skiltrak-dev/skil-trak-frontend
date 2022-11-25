import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Course, PaginatedResponse } from '@types'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const studentCoursesApi = createApi({
  reducerPath: 'studentCoursesApi',
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
    tagTypes: ['StudentCourses'],
    endpoints: (builder) => ({
        getStudentCourses: builder.query<any, void>({
            query: (params: any) => {
                return {
                    url: 'courses/view',
                    params,
                }
            },
            providesTags: ['StudentCourses'],
        }),
    getStudentCoursesLs: builder.query<any, void>({
      query: (params: any) => {
        return {
          url: 'courses/list',
          params,
        }
      },
      providesTags: ['StudentCourses'],
    }),
  }),
})

export const {
  useGetStudentCoursesQuery,
  //   useGetJobsQuery,
  //   useJobChangeStatusMutation,
  //   useUpdateJobMutation,
} = studentCoursesApi
