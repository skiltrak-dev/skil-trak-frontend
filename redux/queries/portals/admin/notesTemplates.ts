import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { PaginatedResponse, PaginationWithSearch } from '@types'

const PREFIX = 'admin'
export const notesTemplatesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    notesTemplates: builder.query<
        PaginatedResponse<any>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace/types-list`,
            params,
        }),
        providesTags: ['NotesTemplates'],
    }),

    notesTemplateDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/workplace-type/${id}/detail`,
        providesTags: ['NotesTemplates'],
    }),

    addNoteTemplate: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/workplace/type-add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['NotesTemplates'],
    }),

    updateNoteTemplate: builder.mutation<any, { id: number; name: string }>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/workplace-type/${id}/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['NotesTemplates'],
    }),

    removeNoteTemplate: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/workplace-type/${id}/remove`,
            method: 'DELETE',
        }),
        invalidatesTags: ['NotesTemplates'],
    }),
})
