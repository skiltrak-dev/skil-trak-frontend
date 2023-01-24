import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
export const volunteerApi = createApi({
    reducerPath: 'volunteerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/industries/`,
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
    tagTypes: ['RequestAVolunteer'],
    endpoints: (builder) => ({
        requestAVolunteer: builder.mutation<any, void>({
            query: (params) => ({
                url: 'volunteer/request',
                method: 'POST',
            }),
            invalidatesTags: ['RequestAVolunteer'],
        }),
        // sendMessage: builder.mutation({
        //     query: (body) => ({
        //         url: `messaging/email`,
        //         method: 'POST',
        //         body: body,
        //     }),
        //     invalidatesTags: ['Message'],
        // }),
    }),
})
export const { useRequestAVolunteerMutation } = volunteerApi
