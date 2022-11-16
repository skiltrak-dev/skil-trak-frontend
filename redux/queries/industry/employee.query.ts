import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_END_POINT,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState()).usersSlice.token;
      const token = AuthUtils.getToken()

      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: (params) => {
        return {
          url: 'industries/employee/list',
          params: { ...params },
        }
      },
      providesTags: ['Employee'],
    }),
    addEmployee: builder.mutation({
      query: (body) => ({
        url: `industries/employee/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `industries/employee/${id}`,
          method: 'PATCH',
          body,
        }
      },

      invalidatesTags: ['Employee'],
    }),
    updateEmployeeTaskOnDrag: builder.mutation({
      query: (body) => ({
        url: `industries/task/update`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Employee'],
    }),
    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `industries/employee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
    addEmployeeTask: builder.mutation({
      query: (body) => ({
        url: `industries/task/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Employee'],
    }),
    changeEmployeeTaskPriority: builder.mutation({
      query: ({ id, priority }) => ({
        url: `industries/task/${id}`,
        method: 'PATCH',
        body: { priority },
      }),
      invalidatesTags: ['Employee'],
    }),
    deleteEmployeeTask: builder.mutation({
      query: (id) => ({
        url: `industries/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
})
export const {
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useRemoveEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeTaskMutation,
  useAddEmployeeTaskMutation,
  useUpdateEmployeeTaskOnDragMutation,
  useChangeEmployeeTaskPriorityMutation,
} = employeeApi
