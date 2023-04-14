import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin/'
export const folderEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    folderAdd: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}folder/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),

    industryChecklistAdd: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}checklist/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),

    assessmentEvidenceAdd: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}assessment-evidence/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),

    folderUpdate: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}folder/update/${body.id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),

    assessmentEvidenceUpdate: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}assessment-evidence/update/${body.id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),

    folderRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}folder/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),
    removeAssessment: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}assessment-evidence/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Folders', 'Courses'],
    }),
})
