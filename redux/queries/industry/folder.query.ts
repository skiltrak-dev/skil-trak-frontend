import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const folderApi = createApi({
  reducerPath: 'folderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_END_POINT,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState()).usersSlice.token;
      const token = AuthUtils.getToken()
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Document'],
  endpoints: (builder) => ({
    addFolder: builder.mutation({
      query: (body) => ({
        url: `admin/folder/add`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Document'],
    }),
    updateFolder: builder.mutation({
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
    getDocuments: builder.query({
      query: (course) => {
        return {
          url: 'industries/folder/list',
          params: { course },
        }
      },
      providesTags: ['Document'],
    }),
    addOrUpdateRequiredDocument: builder.mutation({
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
  }),
})

export const {
  useAddFolderMutation,
  useUpdateFolderMutation,
  useRemoveFolderMutation,
  useAddChecklistMutation,
  useUpdateChecklistMutation,

  useRemoveChecklistMutation,
  useGetDocumentsQuery,
  useAddDocumentMutation,
  useAddOrUpdateRequiredDocumentMutation,
  useDeleteDocumentMutation,
  useEditDocumentMutation,
} = folderApi
