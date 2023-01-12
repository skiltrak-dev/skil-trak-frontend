import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const availableShiftsApi = createApi({
    reducerPath: 'availableShiftsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/industries`,
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
    tagTypes: ['AvailableShifts'],
    endpoints: (builder) => ({
        getAvailableShifts: builder.query<any, void>({
            query: () => 'working-hours/list',
            providesTags: ['AvailableShifts'],
        }),
        addWorkingHours: builder.mutation<any, any>({
            query: (body) => ({
                url: 'working-hours/add',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AvailableShifts'],
        }),
    }),
})

export const { useGetAvailableShiftsQuery, useAddWorkingHoursMutation } =
    availableShiftsApi
