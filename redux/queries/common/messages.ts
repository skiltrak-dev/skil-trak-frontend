import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
export const messageApi = createApi({
    reducerPath: 'messageApi',
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
    tagTypes: ['Message'],
    endpoints: (builder) => ({
        getMessages: builder.query<any, any>({
            query: (id) => `mail/list/${id}`,
            providesTags: ['Message'],
        }),
        sendMessage: builder.mutation({
            query: (body) => ({
                url: `messaging/email`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Message'],
        }),
    }),
})
export const { useGetMessagesQuery, useSendMessageMutation } = messageApi
