import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rtoAppointmentsApi = createApi({
    reducerPath: 'rtoAppointmentsApi',
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
    tagTypes: ['RTOAppointment'],
    endpoints: (builder) => ({
        createRTOAppointment: builder.mutation<any, any | null>({
            query: (body) => {
                return {
                    url: `appointment/create`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['RTOAppointment'],
        }),
        getRTOAppointments: builder.query<any, any>({
            query: (params) => ({
                url: 'my-appointments/view',
                params,
            }),
            providesTags: ['RTOAppointment'],
        }),
        getCoordinatorsForRTO: builder.query<any, void>({
            query: () => 'assigned/coordinator/list',
            providesTags: ['RTOAppointment'],
        }),
    }),
})

export const {
    useGetRTOAppointmentsQuery,
    useGetCoordinatorsForRTOQuery,
    useCreateRTOAppointmentMutation,
} = rtoAppointmentsApi
