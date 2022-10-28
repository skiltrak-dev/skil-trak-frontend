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
        getAppointmentsTypes: builder.query<StudentJobType[], void>({
            query: () => 'appointmenttype/list',
            providesTags: ['StudentAppointments'],
        }),
        getStudentPastAppointments: builder.query({
            query: () => 'pastappointments/list',
        }),
        getStudentUpcomingAppointments: builder.query({
            query: () => 'futureappointments/list',
            providesTags: ['StudentAppointments'],
        }),
        getCoordinatorsForStudent: builder.query({
            query: (params: any) => {
                return {
                    url: 'coordinator/list',
                    params,
                }
            },
            providesTags: ['StudentAppointments'],
        }),
        getCoordinatorsAvailability: builder.query({
            query: (params: any) => {
                return {
                    url: 'coordinator/availabilities',
                    params,
                }
            },
            providesTags: ['StudentAppointments'],
        }),
        getJobs: builder.query({
            query: (params) => {
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
        }),
    }),
})

export const {
    useGetJobsQuery,
    useGetCoordinatorsAvailabilityQuery,
    useCreateAppointmentMutation,
    useGetAppointmentsTypesQuery,
    useGetCoordinatorsForStudentQuery,
    useGetStudentPastAppointmentsQuery,
    useGetStudentUpcomingAppointmentsQuery,
} = studentAppointmentsApi
