import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getIndustryWorkplace: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/list`,
            params,
        }),
        providesTags: ['IndustryWorkplace'],
    }),
    getIndustryWorkplaceFolders: builder.query<any, any>({
        query: ({ workplaceId, appliedIndustryId, courseId }) =>
            `${PREFIX}/workplace-request/docs/${workplaceId}/${appliedIndustryId}/${courseId}`,
        providesTags: ['IndustryWorkplace'],
    }),
    addNoteByIndustry: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/workplace-request/note/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    workplaceActions: builder.mutation<any, any>({
        query: ({ id, status }) => ({
            url: `${PREFIX}/workplace-request/action/${id}`,
            method: 'PATCH',
            body: { status },
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    addFeedback: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/workplace-request/feedback/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    addReport: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/workplace-request/report/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    signAgreement: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/workplace-request/sign-agreement/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    startPlacementByIndustry: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/workplace-started/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    completeWorkplace: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/workplace-request/complete/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    terminateWorkplace: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/workplace-request/terminate/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
    cancelWorkplace: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/workplace-request/cancel/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['IndustryWorkplace'],
    }),
})
