import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin/'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getSubAdminWorkplaces: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}workplace-request/list`,
            params,
        }),
        providesTags: ['SubAdminWorkplace'],
    }),
    getSubAdminFilteredWorkplaces: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}workplace-request/filter`,
            params,
        }),
        providesTags: ['SubAdminWorkplace'],
    }),
    getAddedByStudentsWorkplaces: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}workplace-request/list/abn`,
            params,
        }),
        providesTags: ['SubAdminWorkplace'],
    }),
    getMyStudentsWorkplaces: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}my-workplace-request/list`,
            params,
        }),
        providesTags: ['SubAdminWorkplace'],
    }),
    assignToSubAdmin: builder.mutation({
        query: ({ industryId, id }) => ({
            url: `${PREFIX}assign-workplace-request/${industryId}/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    sendInterviewNotification: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}interview-case-officer/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    forwardWorkplaceToIndustry: builder.mutation({
        query: ({ industryId, id }) => ({
            url: `${PREFIX}forward-industry-request/${industryId}/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    industryResponse: builder.mutation({
        query: ({ status, industryId }) => ({
            url: `${PREFIX}industry-response/${industryId}`,
            method: 'PATCH',
            body: { status },
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    agrementSign: builder.mutation({
        query: ({ studentId, appliedIndustryId, body }) => ({
            url: `${PREFIX}sign/agreement/${appliedIndustryId}`,
            method: 'POST',
            params: { std: studentId },
            body,
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    startPlacement: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}workplace-started/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    terminatePlacement: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}terminate-workplace-request/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    completePlacement: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}complete-workplace-request/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    addWorkplaceNote: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}workplace-request/note/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    getWorkplaceFolders: builder.query<any, any>({
        query: ({ workplaceId, appliedIndustryId, courseId }) =>
            `${PREFIX}workplace-request/docs/${workplaceId}/${appliedIndustryId}/${courseId}`,
        providesTags: ['SubAdminWorkplace'],
    }),
    getCancelledWorkplaces: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}cancelled-workplace-request/list`,
            params,
        }),
        providesTags: ['SubAdminWorkplace'],
    }),
    cancelWorkplaceStatus: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}student/workplace/update/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    updateWorkplaceStatus: builder.mutation<
        any,
        { id: number; response: string }
    >({
        query: ({ id, response }) => ({
            url: `${PREFIX}workplace-request/industry-response/${id}`,
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
            url: `${PREFIX}apply-industry-request/${industry}/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    showExistingIndustries: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}course-industries/list/${id}`,
        }),
        providesTags: ['SubAdminWorkplace'],
    }),
    addExistingIndustries: builder.mutation<any, any>({
        query: ({ workplaceId, industryId }) => ({
            url: `${PREFIX}industry/select/${workplaceId}/${industryId}`,
            method: 'POST',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    addCustomIndustry: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}custom-industry/add/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    changeCustomIndustryStatus: builder.mutation<any, any>({
        query: ({ id, status }) => ({
            url: `${PREFIX}custom-workplace-request/action/${id}`,
            method: 'PATCH',
            params: { status },
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
})
