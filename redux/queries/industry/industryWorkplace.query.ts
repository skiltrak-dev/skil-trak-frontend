import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'
import { AuthUtils } from '@utils'

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
        getIndustryWorkplaceFolders: builder.query<any, any>({
            query: ({ workplaceId, appliedIndustryId, courseId }) =>
                `workplace-request/docs/${workplaceId}/${appliedIndustryId}/${courseId}`,
            providesTags: ['IndustryWorkplace'],
        }),
        addNoteByIndustry: builder.mutation({
            query: (body) => ({
                url: `workplace-request/note/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        workplaceActions: builder.mutation({
            query: ({ id, status }) => ({
                url: `workplace-request/action/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        addFeedback: builder.mutation<any,any>({
            query: (body) => ({
                url: `workplace-request/feedback/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['IndustryWorkplace'],
        }),
        addReport: builder.mutation<any,any>({
            query: (body) => ({
                url: `workplace-request/report/add`,
                method: 'POST',
                body,
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
        startPlacementByIndustry: builder.mutation({
            query: (id) => ({
                url: `workplace-started/${id}`,
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
        
    }),
})

export const {
    useSignAgreementMutation,
    useCompleteWorkplaceMutation,
    useAddNoteByIndustryMutation,
    useTerminateWorkplaceMutation,
    useAddFeedbackMutation,
    useAddReportMutation,
    useCancelWorkplaceMutation,
    useGetIndustryWorkplaceQuery,
    useWorkplaceActionsMutation,
    useGetIndustryWorkplaceFoldersQuery,
    useStartPlacementByIndustryMutation,
} = industryWorkplaceApi
