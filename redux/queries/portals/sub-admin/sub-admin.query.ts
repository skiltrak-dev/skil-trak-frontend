import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { SubAdmin } from '@types'
import { notesEndpoints } from './notes'

export const subAdminApi = createApi({
    reducerPath: 'subAdminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['SubAdmin', 'Notes'],

    // ---------- Sub Admin ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<any, void>({
            query: () => `subadmin/me/profile`,
            providesTags: ['SubAdmin'],
        }),

        ...notesEndpoints(build),
    }),
})

const {
    // ------ SELF ------ //
    useProfileQuery,

    // ------ NOTES ------ //
    useNotesQuery,
    useNoteAddMutation,
    useNoteDeleteMutation,
    useNoteStatusChangeMutation,
} = subAdminApi

export const SubAdminApi = {
    SubAdmin: {
        useProfile: useProfileQuery,
    },
    Notes: {
        useList: useNotesQuery,
        useCreate: useNoteAddMutation,
        useDelete: useNoteDeleteMutation,
        useStatusChange: useNoteStatusChangeMutation,
    },
}
