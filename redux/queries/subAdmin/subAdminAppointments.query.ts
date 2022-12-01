import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminAppointmentApi = createApi({
    reducerPath: 'subAdminAppointmentApi',
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
    tagTypes: ['Appointment'],
    endpoints: (builder) => ({
        searchUser: builder.query<any, any | null>({
            query: (params: any) => {
                return {
                    url: `appointments/user/search`,
                    params,
                }
            },
            providesTags: ['Appointment'],
        }),
        userAvailabilities: builder.query<any, any | null>({
            query: (params: any) => {
                return {
                    url: `subadmin/user/availabilities`,
                    params,
                }
            },
            providesTags: ['Appointment'],
        }),
        subAdminCreateAppointment: builder.mutation({
            query: (body) => ({
                url: `subadmin/appointment/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Appointment'],
        }),
        getSubAdminAppointments: builder.query<any, any>({
            query: (params) => ({
                url: 'subadmin/my-appointments/view',
                params,
            }),
            providesTags: ['Appointment'],
        }),
    }),
})

export const {
    useSearchUserQuery,
    useUserAvailabilitiesQuery,
    useGetSubAdminAppointmentsQuery,
    useSubAdminCreateAppointmentMutation,
} = subAdminAppointmentApi
