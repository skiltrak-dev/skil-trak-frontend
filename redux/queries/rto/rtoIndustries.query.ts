import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rtoIndustriesApi = createApi({
  reducerPath: 'rtoIndustriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = AuthUtils.getToken()

      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['RtoAssessmentToolsList'],
  endpoints: (builder) => ({
    getIndustriesList: builder.query<any, string>({
      query: (status: string) => {
        return {
          url: 'rtos/industries/list',
          params: { status },
        }
      },
      providesTags: ['RtoAssessmentToolsList'],
    }),
  }),
})

export const { useGetIndustriesListQuery } = rtoIndustriesApi
