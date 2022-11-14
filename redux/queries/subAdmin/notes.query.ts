import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        getNotes: builder.query<any[], any>({
            query: ({ id, pinned }) => ({
                url: `notes/${id}`,
                params: { pinned },
            }),
            providesTags: ['Notes'],
        }),
        createNote: builder.mutation<any, any | null>({
            query: (body: any) => {
                return {
                    url: `note/add`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Notes'],
        }),
        updateNote: builder.mutation<any, any | null>({
            query: ({ id, status }: any) => {
                return {
                    url: `student/update-status/${id}`,
                    method: 'PATCH',
                    body: { status },
                }
            },
            invalidatesTags: ['Notes'],
        }),
        changeNoteStatus: builder.mutation({
            query: (id) => ({
                url: `notes/update-status/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notes'],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `note/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notes'],
        }),
    }),
})

export const {
    useGetNotesQuery,
    useDeleteNoteMutation,
    useCreateNoteMutation,
    useUpdateNoteMutation,
    useChangeNoteStatusMutation,
} = notesApi
