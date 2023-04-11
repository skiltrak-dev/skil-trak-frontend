import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'

const PREFIX = 'admin/'
export const notesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    adminNotesPinned: builder.query<Note[], number | any>({
        query: (id) => `${PREFIX}notes/listpinned/${id}`,
        providesTags: ['Notes'],
    }),

    adminNotes: builder.query<Note[], any>({
        query: (id) => `${PREFIX}notes/list/${id}`,
        providesTags: ['Notes'],
    }),

    adminNoteStatusChange: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}notes/update-status/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Notes'],
    }),

    adminNoteCreate: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}notes/add`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Notes'],
    }),

    adminNoteUpdate: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}notes/update/${body.id}`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['Notes'],
    }),

    adminNoteRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}note/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Notes'],
    }),
})
