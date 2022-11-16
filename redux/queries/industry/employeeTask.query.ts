import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const employeeTaskApi = createApi({
  reducerPath: 'employeeTaskApi',
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
  tagTypes: ['EmployeeTask'],
  endpoints: (builder) => ({
    getEmployeeTask: builder.query({
      query: () => {
        return {
          url: 'industries/employeetask/list',
        }
      },
      providesTags: ['EmployeeTask'],
    }),
  }),
})

export const { useGetEmployeeTaskQuery } = employeeTaskApi
