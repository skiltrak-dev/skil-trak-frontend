import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rtoCoordinatorsApi = createApi({
    reducerPath: 'rtoCoordinatorsApi',
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
    tagTypes: ['RTOCoordinator'],
    endpoints: (builder) => ({
        getRtoCoordinators: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'coordinator/list',
                    params,
                }
            },
            providesTags: ['RTOCoordinator'],
        }),
        getRtoCoordinatorsDetail: builder.query<any, number>({
            query: (id) => {
                return {
                    url: `coordinator/profile/${id}`,
                }
            },
            providesTags: ['RTOCoordinator'],
        }),
    }),
})

export const { useGetRtoCoordinatorsQuery, useGetRtoCoordinatorsDetailQuery } =
    rtoCoordinatorsApi
