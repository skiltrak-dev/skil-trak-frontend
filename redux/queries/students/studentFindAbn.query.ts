import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const studentFindAbnApi = createApi({
  reducerPath: 'studentFindAbnApi',
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
  tagTypes: ['StudentAbn'],
  endpoints: (builder) => ({
    updateFindAbn: builder.mutation({
      query: (body) => ({
        url: `industry/find-abn`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StudentAbn'],
    }),
  }),
})

export const { useUpdateFindAbnMutation } = studentFindAbnApi
