import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { industriesEndpoints } from './industries'
import { rtosEndpoints } from './rtos'
import { coursesEndpoints } from './courses'
import {notesEndpoints} from './notes'
import { AdminStats } from '@types'

export const commonApi = createApi({
    reducerPath: 'commonApi',
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
    tagTypes: ['RTOS'],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        ...industriesEndpoints(build),
        ...rtosEndpoints(build),
        ...coursesEndpoints(build),
        ...notesEndpoints(build),
    }),
})

const {
    // ------ Industry ------ //
    useGetAllIndustriesQuery,

    useGetAllRtosQuery,

    useGetAllCoursesQuery,

    // ------ NOTES ------ //
    useNotesQuery,
    useNotesPinnedQuery,
    useNoteCreateMutation,
    useNoteUpdateMutation,
    useNoteRemoveMutation,
    useNoteStatusChangeMutation,
} = commonApi

export const CommonApi = {
    Filter: {
        useIndustries: useGetAllIndustriesQuery,
        useRtos: useGetAllRtosQuery,
        useCourses: useGetAllCoursesQuery,
    },

    Notes: {
        useList: useNotesQuery,
        usePinned: useNotesPinnedQuery,
        useCreate: useNoteCreateMutation,
        useUpdate: useNoteUpdateMutation,
        useRemove: useNoteRemoveMutation,
        useStatusChange: useNoteStatusChangeMutation,
    },
}
