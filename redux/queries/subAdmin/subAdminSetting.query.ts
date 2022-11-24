import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminSettingApi = createApi({
    reducerPath: 'subAdminSettingApi',
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
    tagTypes: ['Setting'],
    endpoints: (builder) => ({
        getSettingData: builder.query<any, void>({
            query: () => ({
                url: `settings/get`,
            }),
            providesTags: ['Setting'],
        }),
        subAdminSetting: builder.mutation<any, any | null>({
            query: (setting: any) => {
                return {
                    url: `settings/update`,
                    method: 'PATCH',
                    params: { setting },
                }
            },
            invalidatesTags: ['Setting'],
        }),
        // updateNote: builder.mutation<any, any | null>({
        //   query: ({ id, status }: any) => {
        //     return {
        //       url: `student/update-status/${id}`,
        //       method: 'PATCH',
        //       body: { status },
        //     }
        //   },
        //   invalidatesTags: ['Notes'],
        // }),
        // changeNoteStatus: builder.mutation({
        //   query: (id) => ({
        //     url: `notes/update-status/${id}`,
        //     method: 'PATCH',
        //   }),
        //   invalidatesTags: ['Notes'],
        // }),
        // deleteNote: builder.mutation({
        //   query: (id) => ({
        //     url: `note/remove/${id}`,
        //     method: 'DELETE',
        //   }),
        //   invalidatesTags: ['Notes'],
        // }),
    }),
})

export const { useGetSettingDataQuery, useSubAdminSettingMutation } =
    subAdminSettingApi
