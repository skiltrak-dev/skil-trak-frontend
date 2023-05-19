import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin/'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    workplaceCount: builder.query<any, void>({
        query: () => `${PREFIX}workplace-request/count`,
        providesTags: ['SubAdminWorkplace'],
    }),
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
    assignToSubAdmin: builder.mutation<any, { industry: number; id: number }>({
        query: (params) => ({
            url: `${PREFIX}assign-workplace-request`,
            params,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    sendInterviewNotification: builder.mutation<
        any,
        { workIndustry: number; workplace: number }
    >({
        query: (params) => ({
            url: `${PREFIX}interview-case-officer`,
            params,
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
        query: ({ course, studentId, appliedIndustryId, body }) => ({
            url: `${PREFIX}sign/agreement/${appliedIndustryId}`,
            method: 'POST',
            params: { std: studentId, course },
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
    showExistingIndustries: builder.query<any, void>({
        query: () => `${PREFIX}course-industries/list`,
        providesTags: ['SubAdminWorkplace'],
    }),
    addExistingIndustries: builder.mutation<any, any>({
        query: ({ workplaceId, industryId }) => ({
            url: `${PREFIX}industry/select/${workplaceId}/${industryId}`,
            method: 'POST',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    assignSubadminWorkplaceCourse: builder.mutation<any, any>({
        query: ({ workplaceId, courseId }) => ({
            url: `${PREFIX}workplace-request/assign-course/${workplaceId}/${courseId}`,
            method: 'POST',
        }),
        invalidatesTags: ['Workplaces'],
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
        query: ({ industryId, status, workplaceId }) => {
            return {
                url: `${PREFIX}custom-workplace-request/action/${industryId}/${workplaceId}`,
                method: 'PATCH',
                params: { status },
            }
        },
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    removeAppliedIndustry: builder.mutation<
        any,
        { workplaceIndustryId: number; studentId: number }
    >({
        query: ({ workplaceIndustryId, studentId }) => ({
            url: `${PREFIX}workplace-request/remove/work-industry/${workplaceIndustryId}/${studentId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
    removeAppliedIndustryFromWorkplace: builder.mutation<
        any,
        { workplaceIndustryId: number; studentId: number }
    >({
        query: ({ workplaceIndustryId, studentId }) => ({
            url: `${PREFIX}workplace-request/remove/work-industry/${workplaceIndustryId}/${studentId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['SubAdminWorkplace'],
    }),
})
