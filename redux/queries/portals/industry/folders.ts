import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const foldersEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    addFolder: builder.mutation({
        query: (body) => ({
            url: `admin/folder/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Document'],
    }),
    updateFolder: builder.mutation<any, any>({
        query: (body) => ({
            url: `admin/folder/update/${body.id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Document'],
    }),
    removeFolder: builder.mutation({
        query: (id) => ({
            url: `admin/folder/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Document'],
    }),
    addChecklist: builder.mutation({
        query: (body) => ({
            url: `admin/checklist/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Document'],
    }),
    updateChecklist: builder.mutation({
        query: ({ id, body }) => ({
            url: `admin/checklist/update/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Document'],
    }),
    removeChecklist: builder.mutation({
        query: (id) => ({
            url: `admin/checklist/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Document'],
    }),
    getIndustryDocuments: builder.query<any, any>({
        query: (course) => {
            return {
                url: 'industries/folder/list',
                params: { course },
            }
        },
        providesTags: ['Document'],
    }),
    addOrUpdateRequiredDocument: builder.mutation<any, any>({
        query: (body) => ({
            url: `industries/folder/add-or-update`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Document'],
    }),
    addDocument: builder.mutation({
        query: (body) => ({
            url: `industries/folder/add`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Document'],
    }),
    deleteDocument: builder.mutation({
        query: (body) => ({
            url: `industries/folder/delete`,
            method: 'DELETE',
            body: body,
        }),
        invalidatesTags: ['Document'],
    }),
    editDocument: builder.mutation({
        query: (body) => ({
            url: `industries/folder/edit`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['Document'],
    }),
})
