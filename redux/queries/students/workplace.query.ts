import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const workplaceRequestApi = createApi({
    reducerPath: 'workplaceRequestApi',
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
    tagTypes: ['Workplace'],
    endpoints: (builder) => ({
        workPlaceRequest: builder.mutation({
            query: (body) => ({
                url: `workplace-requests`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Workplace'],
        }),
        getWorkplaceIndustries: builder.query<any, void>({
            query: () => 'workindustry/list',
            providesTags: ['Workplace'],
        }),
        getPlacementProgress: builder.query<any, void>({
            query: () => 'work-place-request/view',
            providesTags: ['Workplace'],
        }),
        getCourseDocuments: builder.query({
            query: ({ id, course }: any) => {
                return {
                    url: `requireddocs/${id}`,
                    params: { course },
                }
            },
            providesTags: ['Workplace'],
        }),
        getStudentIndustries: builder.query<any, void>({
            query: () => `industries/list`,
            providesTags: ['Workplace'],
        }),

        uploadDocuments: builder.mutation({
            query: ({ id, body, workplaceId }) => {
                return {
                    url: `workplace/response`,
                    method: 'POST',
                    params: { docs: [id], wpId: workplaceId },
                    body,
                }
            },
            invalidatesTags: ['Workplace'],
        }),
        cancelWorkplaceRequest: builder.mutation<any, void>({
            query: () => ({
                url: `workplace/cancel`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Workplace'],
        }),
        applyForWorkplace: builder.mutation({
            query: (id) => ({
                url: `workplace/apply/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Workplace'],
        }),
        applyWorkplaceWithAbnIndustry: builder.mutation({
            query: (id) => ({
                url: `add/work-place/existing-industry/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Workplace'],
        }),
        uploadAgreement: builder.mutation({
            query: ({ appliedIndustryId, body }) => ({
                url: `sign/agreement/${appliedIndustryId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Workplace'],
        }),
        updateFindAbn: builder.mutation({
            query: (body: any) => ({
                url: `industry/find-abn`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Workplace'],
        }),
        addWorkplace: builder.mutation({
            query: (body: any) => ({
                url: `add/work-place`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Workplace'],
        }),
    }),
})

export const {
    useGetStudentIndustriesQuery,
    useGetCourseDocumentsQuery,
    useGetWorkplaceIndustriesQuery,
    useGetPlacementProgressQuery,
    useWorkPlaceRequestMutation,
    useUploadDocumentsMutation,
    useUploadAgreementMutation,
    useCancelWorkplaceRequestMutation,
    useApplyForWorkplaceMutation,
    useUpdateFindAbnMutation,
    useAddWorkplaceMutation,
    useApplyWorkplaceWithAbnIndustryMutation,
} = workplaceRequestApi
