import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const industryCourseApi = createApi({
  reducerPath: 'industryCourseApi',
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
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (params) => {
        return {
          url: 'admin/course/list',
          params,
        }
      },
      providesTags: ['Course'],
    }),
    getCourseDetail: builder.query({
      query: (id) => `admin/course/view/${id}`,
      providesTags: ['Course'],
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: `admin/course/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: (body) => {
        return {
          url: `admin/course/update/${body.id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: ['Course'],
    }),
    removeCourse: builder.mutation({
      query: (id) => ({
        url: `admin/course/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
    getIndustryCourses: builder.query<any, void>({
      query: () => 'industries/course/list',
      providesTags: ['Course'],
    }),
    addCourses: builder.mutation({
      query: (body) => ({
        url: `industries/folder/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Course'],
    }),
  }),
})

export const {
  useGetAllCoursesQuery,
  useGetCourseDetailQuery,
  useAddCourseMutation,
  useAddCoursesMutation,
  useRemoveCourseMutation,
  useGetIndustryCoursesQuery,
  useUpdateCourseMutation,
} = industryCourseApi
