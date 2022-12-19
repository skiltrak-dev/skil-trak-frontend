import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'

const PREFIX = 'notes'
export const notesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    notesPinned: builder.query<Note[], number | any>({
        query: (id) => `${PREFIX}/pinned/${id}`,
        providesTags: ['Notes'],
    }),

    notes: builder.query<Note[], any>({
        query: (id) => `${PREFIX}/${id}`,
        providesTags: ['Notes'],
    }),

    noteStatusChange: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/pin/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Notes', 'AllCommunications'],
    }),

    noteCreate: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Notes', 'AllCommunications'],
    }),

    noteUpdate: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/${body.id}`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['Notes'],
    }),

    noteRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Notes'],
    }),
})
