import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'

const PREFIX = 'subadmin/'
export const notesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    notes: builder.query<Note[], { id: number; pinned?: boolean }>({
        query: ({ id, pinned }) => ({
            url: `${PREFIX}notes/${id}`,
            params: { pinned },
        }),
        providesTags: ['Notes'],
    }),
    noteAdd: builder.mutation<any, any | null>({
        query: (body: any) => {
            return {
                url: `${PREFIX}note/add`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['Notes'],
    }),
    noteStatusChange: builder.mutation<Note, number>({
        query: (id) => ({
            url: `${PREFIX}notes/update-status/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Notes'],
    }),
    noteDelete: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}note/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Notes'],
    }),
})
