import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const industryWorkplaceApi = createApi({
    reducerPath: 'industryWorkplaceApi',
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
    tagTypes: ['IndustryWorkplace'],
    endpoints: (builder) => ({
        getIndustryWorkplace: builder.query<any, any>({
            query: (params) => ({
                url: 'workplace-request/list',
                params,
            }),
            providesTags: ['IndustryWorkplace'],
        }),
        workplaceActions: builder.mutation({
            query: ({ id, status }) => ({
                url: `workplace-request/action/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        signAgreement: builder.mutation({
            query: (id) => ({
                url: `workplace-request/sign-agreement/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        completeWorkplace: builder.mutation({
            query: (id) => ({
                url: `workplace-request/complete/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        terminateWorkplace: builder.mutation({
            query: (id) => ({
                url: `workplace-request/terminate/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        cancelWorkplace: builder.mutation({
            query: (id) => ({
                url: `workplace-request/cancel/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        // getStudentPastAppointments: builder.query({
        //     query: () => 'pastappointments/list',
        //     providesTags: ['IndustryWorkplace'],
        // }),
        // getStudentUpcomingAppointments: builder.query({
        //     query: () => 'futureappointments/list',
        //     providesTags: ['StudentAppointments'],
        // }),
        // getCoordinatorsForStudent: builder.query({
        //     query: (params: any) => {
        //         return {
        //             url: 'coordinator/list',
        //             params,
        //         }
        //     },
        //     providesTags: ['StudentAppointments'],
        // }),
        // getCoordinatorsAvailability: builder.query({
        //     query: (params: any) => {
        //         return {
        //             url: 'coordinator/availabilities',
        //             params,
        //         }
        //     },
        //     providesTags: ['StudentAppointments'],
        // }),
        // getJobs: builder.query({
        //     query: (params) => {
        //         return {
        //             url: 'industries/job/list',
        //             params,
        //         }
        //     },
        //     providesTags: ['StudentAppointments'],
        // }),
        // createAppointment: builder.mutation({
        //     query: (body) => ({
        //         url: `appointment/create`,
        //         method: 'POST',
        //         body,
        //     }),
        //     invalidatesTags: ['StudentAppointments'],
        // }),
    }),
})

export const {
    useSignAgreementMutation,
    useCompleteWorkplaceMutation,
    useTerminateWorkplaceMutation,
    useCancelWorkplaceMutation,
    useGetIndustryWorkplaceQuery,
    useWorkplaceActionsMutation,
    // useGetCoordinatorsAvailabilityQuery,
    // useGetAppointmentsTypesQuery,
    // useGetCoordinatorsForStudentQuery,
    // useGetStudentPastAppointmentsQuery,
    // useGetStudentUpcomingAppointmentsQuery,
} = industryWorkplaceApi
