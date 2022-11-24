import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const setUnAvailabilityApi = createApi({
    reducerPath: 'setUnAvailabilityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['SetUnAvailability'],
    endpoints: (builder) => ({
        addUnavailability: builder.mutation<any, any | null>({
            query: (body: any) => {
                return {
                    url: `un-availability/add`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SetUnAvailability'],
        }),
        getUnAvailabilities: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'un-availability/list',
                    params,
                }
            },
            providesTags: ['SetUnAvailability'],
        }),
        removeUnAvailability: builder.mutation<any, number>({
            query: (id) => {
                return {
                    url: `un-availability/remove/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['SetUnAvailability'],
        }),
    }),
})

export const {
    useAddUnavailabilityMutation,
    useGetUnAvailabilitiesQuery,
    useRemoveUnAvailabilityMutation,
} = setUnAvailabilityApi
