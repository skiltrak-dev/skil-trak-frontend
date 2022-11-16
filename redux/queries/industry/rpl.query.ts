import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rplApi = createApi({
  reducerPath: 'rplApi',
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
  tagTypes: ['rpl'],
  endpoints: (builder) => ({
    getRpl: builder.query({
      query: () => {
        return {
          url: 'industries/rpl/list',
        }
      },
      providesTags: ['rpl'],
    }),
    addRpl: builder.mutation({
      query: (body) => ({
        url: `industries/rpl/add`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['rpl'],
    }),
  }),
})

export const { useGetRplQuery, useAddRplMutation } = rplApi
