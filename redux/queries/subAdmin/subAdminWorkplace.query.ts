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
        getSubAdminWorkplaces: builder.query<any, void>({
            query: () => 'workplace-request/list',
            providesTags: ['SubAdminWorkplace'],
        }),
        getSubAdminFilteredWorkplaces: builder.query<any, any>({
            query: (params) => ({
                url: 'workplace-request/filter',
                params,
            }),
            providesTags: ['SubAdminWorkplace'],
        }),
        getAddedByStudentsWorkplaces: builder.query<any, void>({
            query: () => 'workplace-request/list/abn',
            providesTags: ['SubAdminWorkplace'],
        }),
        getMyStudentsWorkplaces: builder.query<any, void>({
            query: () => 'my-workplace-request/list',
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
        agrementSign: builder.mutation({
            query: (id) => ({
                url: `sign-workplace-request-agreement/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        startPlacement: builder.mutation({
            query: (id) => ({
                url: `workplace-started/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        terminatePlacement: builder.mutation({
            query: (id) => ({
                url: `terminate-workplace-request/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        completePlacement: builder.mutation({
            query: (id) => ({
                url: `complete-workplace-request/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        addWorkplaceNote: builder.mutation({
            query: (body) => ({
                url: `workplace-request/note/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        getWorkplaceFolders: builder.query<any, any>({
            query: ({ workplaceId, appliedIndustryId, courseId }) =>
                `workplace-request/docs/${workplaceId}/${appliedIndustryId}/${courseId}`,
            providesTags: ['SubAdminWorkplace'],
        }),
        getCancelledWorkplaces: builder.query<any, void>({
            query: () => 'cancelled-workplace-request/list',
            providesTags: ['SubAdminWorkplace'],
        }),
        cancelWorkplaceStatus: builder.mutation<any, number>({
            query: (id) => ({
                url: `student/workplace/update/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        updateWorkplaceStatus: builder.mutation<
            any,
            { id: number; response: string }
        >({
            query: ({ id, response }) => ({
                url: `workplace-request/industry-response/${id}`,
                params: { response },
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        subAdminApplyStudentWorkplace: builder.mutation<
            any,
            { industry: number; id: number }
        >({
            query: ({ industry, id }) => ({
                url: `apply-industry-request/${industry}/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        showExistingIndustries: builder.query<any, any>({
            query: (id) => ({
                url: `course-industries/list/${id}`,
            }),
            providesTags: ['SubAdminWorkplace'],
        }),
        addExistingIndustries: builder.mutation<any, any>({
            query: ({ workplaceId, industryId }) => ({
                url: `industry/select/${workplaceId}/${industryId}`,
                method: 'POST',
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        addCustomIndustry: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `custom-industry/add/${id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
        changeCustomIndustryStatus: builder.mutation<any, any>({
            query: ({ id, status }) => ({
                url: `custom-workplace-request/action/${id}`,
                method: 'PATCH',
                params: { status },
            }),
            invalidatesTags: ['SubAdminWorkplace'],
        }),
    }),
})

export const {
    useAgrementSignMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useAssignToSubAdminMutation,
    useCompletePlacementMutation,
    useTerminatePlacementMutation,
    useGetMyStudentsWorkplacesQuery,
    useGetSubAdminWorkplacesQuery,
    useGetCancelledWorkplacesQuery,
    useGetSubAdminFilteredWorkplacesQuery,
    useSendInterviewNotificationMutation,
    useForwardWorkplaceToIndustryMutation,
    useAddWorkplaceNoteMutation,
    useGetWorkplaceFoldersQuery,
    useUpdateWorkplaceStatusMutation,
    useCancelWorkplaceStatusMutation,
    useGetAddedByStudentsWorkplacesQuery,
    useSubAdminApplyStudentWorkplaceMutation,
    useAddCustomIndustryMutation,
    useShowExistingIndustriesQuery,
    useAddExistingIndustriesMutation,
    useChangeCustomIndustryStatusMutation,
} = subAdminWorkplaceApi
