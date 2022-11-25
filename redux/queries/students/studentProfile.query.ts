import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const studentProfileApi = createApi({
  reducerPath: 'studentProfileApi',
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
  tagTypes: ['StudentProfile'],
  endpoints: (builder) => ({
    getStudentProfileDetail: builder.query<any, void>({
      query: () => 'profile',
      providesTags: ['StudentProfile'],
    }),
  }),
})

export const { useGetStudentProfileDetailQuery } = studentProfileApi
