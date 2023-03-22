import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const studentAppointmentsApi = createApi({
    reducerPath: 'studentAppointmentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/students/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentAppointments'],
    endpoints: (builder) => ({
        getStudentPastAppointments: builder.query<any, void>({
            query: () => 'pastappointments/list',
            providesTags: ['StudentAppointments'],
        }),
        getStudentUpcomingAppointments: builder.query<any, void>({
            query: () => 'futureappointments/list',
            providesTags: ['StudentAppointments'],
        }),
        getCoordinatorsForStudent: builder.query<any, void>({
            query: () => 'coordinator/list',
            providesTags: ['StudentAppointments'],
        }),
        getCoordinatorsAvailability: builder.query<any, number>({
            query: (user) => ({
                url: 'coordinator/availabilities',
                params: { user },
            }),
            providesTags: ['StudentAppointments'],
        }),
        getJobs: builder.query({
            query: (params: any) => {
                return {
                    url: 'industries/job/list',
                    params,
                }
            },
            providesTags: ['StudentAppointments'],
        }),
        createAppointment: builder.mutation({
            query: (body) => ({
                url: `appointment/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['StudentAppointments'],
        }),
        getStudentAppointments: builder.query<any, any>({
            query: (params) => ({
                url: 'my-appointments/view',
                params,
            }),
            providesTags: ['StudentAppointments'],
        }),
        getStudentTimeSlotes: builder.query<any, any>({
            query: (params) => ({
                url: 'coordinator/available/slots',
                params,
            }),
            providesTags: ['StudentAppointments'],
        }),
    }),
})

export const {
    useGetJobsQuery,
    useGetStudentTimeSlotesQuery,
    useGetStudentAppointmentsQuery,
    useCreateAppointmentMutation,

    useGetCoordinatorsForStudentQuery,
    useGetStudentPastAppointmentsQuery,
    useGetCoordinatorsAvailabilityQuery,
    useGetStudentUpcomingAppointmentsQuery,
} = studentAppointmentsApi
