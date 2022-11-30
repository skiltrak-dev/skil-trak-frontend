import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const industryAppointmentApi = createApi({
    reducerPath: 'industryAppointmentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/industries/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['IndustryAppointment'],
    endpoints: (builder) => ({
        createIndustryAppointment: builder.mutation({
            query: (body) => ({
                url: `appointment/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['IndustryAppointment'],
        }),
        getIndustryAppointments: builder.query<any, any>({
            query: (params) => ({
                url: 'my-appointments/view',
                params,
            }),
            providesTags: ['IndustryAppointment'],
        }),
    }),
})

export const {
    useGetIndustryAppointmentsQuery,
    useCreateIndustryAppointmentMutation,
} = industryAppointmentApi
