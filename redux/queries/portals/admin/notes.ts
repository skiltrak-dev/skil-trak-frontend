import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'

const PREFIX = 'admin/'
export const notesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    notesPinned: builder.query<Note[], number | any>({
        query: (id) => `${PREFIX}notes/listpinned/${id}`,
        providesTags: ['Notes'],
    }),

    notes: builder.query<Note[], any>({
        query: (id) => `${PREFIX}notes/list/${id}`,
        providesTags: ['Notes'],
    }),

    noteStatusChange: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}notes/update-status/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Notes'],
    }),

    noteCreate: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}notes/add`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Notes'],
    }),

    noteUpdate: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}notes/update/${body.id}`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['Notes'],
    }),

    noteRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}note/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Notes'],
    }),
})
