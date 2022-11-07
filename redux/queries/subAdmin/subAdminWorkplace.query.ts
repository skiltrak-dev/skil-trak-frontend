import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const subAdminWorkplaceApi = createApi({
    reducerPath: 'subAdminWorkplaceApi',
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
    tagTypes: ['SubAdminWorkplace'],
    endpoints: (builder) => ({
        getSubAdminWorkplaces: builder.query<any[], void>({
            query: () => 'workplace-request/list',
            providesTags: ['SubAdminWorkplace'],
        }),
        assignToSubAdmin: builder.mutation({
            query: ({ industryId, id }) => ({
                url: `assign-workplace-request/${industryId}/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        sendInterviewNotification: builder.mutation({
            query: (id) => ({
                url: `interview-case-officer/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        forwardWorkplaceToIndustry: builder.mutation({
            query: ({ industryId, id }) => ({
                url: `forward-industry-request/${industryId}/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        industryResponse: builder.mutation({
            query: ({ status, industryId }) => ({
                url: `industry-response/${industryId}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
    }),
})

export const {
    useIndustryResponseMutation,
    useAssignToSubAdminMutation,
    useGetSubAdminWorkplacesQuery,
    useSendInterviewNotificationMutation,
    useForwardWorkplaceToIndustryMutation,
    // useGetCoordinatorsAvailabilityQuery,
    // useGetAppointmentsTypesQuery,
    // useGetCoordinatorsForStudentQuery,
    // useGetStudentPastAppointmentsQuery,
    // useGetStudentUpcomingAppointmentsQuery,
} = subAdminWorkplaceApi
