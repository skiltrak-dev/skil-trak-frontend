import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    workPlaceRequest: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/workplace-requests`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Workplace'],
    }),
    getWorkplaceIndustries: builder.query<any, void>({
        query: () => `${PREFIX}/workindustry/list`,
        providesTags: ['Workplace'],
    }),
    getPlacementProgress: builder.query<any, void>({
        query: () => `${PREFIX}/work-place-request/view`,
        providesTags: ['Workplace'],
    }),
    getCourseDocuments: builder.query<any, any>({
        query: ({ id, course }) => {
            return {
                url: `${PREFIX}/requireddocs/${id}`,
                params: { course },
            }
        },
        providesTags: ['Workplace'],
    }),
    getIndustryFolders:builder.query<any, any>({
        query: (params) => {
            return {
                url: `/industries/document/required-by-industry/list`,
                params,
            }
        },
        providesTags: ['Workplace'],
    }),
    getStudentIndustries: builder.query<any, void>({
        query: () => `${PREFIX}/industries/list`,
        providesTags: ['Workplace'],
    }),

    uploadDocuments: builder.mutation({
        query: ({ id, body, workplaceId }) => {
            return {
                url: `${PREFIX}/workplace/response`,
                method: 'POST',
                params: { docs: [id], wpId: workplaceId },
                body,
            }
        },
        invalidatesTags: ['Workplace'],
    }),
    cancelWorkplaceRequest: builder.mutation<any, void>({
        query: () => ({
            url: `${PREFIX}/workplace/cancel`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Workplace'],
    }),
    applyForWorkplace: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/workplace/apply/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Workplace'],
    }),
    applyWorkplaceWithAbnIndustry: builder.mutation<
        any,
        { IndustryId: number; courseId: number }
    >({
        query: ({ IndustryId, courseId }) => ({
            url: `${PREFIX}/add/work-place/existing-industry/${IndustryId}`,
            params: { courseId },
            method: 'POST',
        }),
        invalidatesTags: ['Workplace'],
    }),
    uploadAgreement: builder.mutation({
        query: ({ appliedIndustryId, course, body }) => ({
            url: `${PREFIX}/sign/agreement/${appliedIndustryId}`,
            method: 'POST',
            params: { course },
            body,
        }),
        invalidatesTags: ['Workplace'],
    }),
    updateFindAbn: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/industry/find-abn`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Workplace'],
    }),
    addWorkplace: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/add/work-place`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Workplace'],
    }),
})
