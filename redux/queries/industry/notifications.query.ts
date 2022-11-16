import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
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
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => {
        return {
          url: '/notifications',
          params,
        }
      },
      providesTags: ['Notifications'],
    }),
    getNotificationDetail: builder.query({
      query: (id) => `/notifications/${id}`,
      providesTags: ['Notifications'],
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/read/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useGetNotificationDetailQuery,
  useReadNotificationMutation,
} = notificationsApi
