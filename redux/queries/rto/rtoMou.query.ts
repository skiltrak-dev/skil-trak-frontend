import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rtpMOUApi = createApi({
  reducerPath: 'rtpMOUApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/rtos/`,
    prepareHeaders: (headers, { getState }) => {
      const token = AuthUtils.getToken()

      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['RTOMOU'],
  endpoints: (builder) => ({
    getRtoMOUList: builder.query({
      query: (params) => {
        return {
          url: 'mous/list',
          params,
        }
      },
      providesTags: ['RTOMOU'],
    }),
    getRtoMOUDetail: builder.query<any, string>({
      query: (id) => {
        return {
          url: `mou/view/${id}`,
        }
      },
      providesTags: ['RTOMOU'],
    }),
    createMOUbyRTO: builder.mutation({
      query: (body) => ({
        url: `mou/create`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['RTOMOU'],
    }),
    acceptMOUbyRTO: builder.mutation({
      query: ({ rtoSignature, id }) => ({
        url: `mou/sign/${id}`,
        method: 'PATCH',
        body: { rtoSignature },
      }),
      invalidatesTags: ['RTOMOU'],
    }),
    cancelMOUByRTO: builder.mutation({
      query: (id) => ({
        url: `mou/cancel/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['RTOMOU'],
    }),
    rejectMOUByRTO: builder.mutation({
      query: (id) => ({
        url: `mou/reject/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['RTOMOU'],
    }),
  }),
})

export const {
  useGetRtoMOUListQuery,
  useGetRtoMOUDetailQuery,
  useCreateMOUbyRTOMutation,
  useAcceptMOUbyRTOMutation,
  useCancelMOUByRTOMutation,
  useRejectMOUByRTOMutation,
} = rtpMOUApi
