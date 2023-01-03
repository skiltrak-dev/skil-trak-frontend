import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { rtosEndpoints } from './rtos'
import { mailsEndpoints } from './mails'
import { notesEndpoints } from './notes'
import { coursesEndpoints } from './courses'
import { industriesEndpoints } from './industries'
import { appointmentsEndpoints } from './appointments'
import { allCommunicationEndpoints } from './allCommunication'

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

    tagTypes: [
        'RTOS',
        'Notes',
        'Mails',
        'Course',
        'Industry',
        'Appointments',
        'AllCommunications',
    ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        ...rtosEndpoints(build),
        ...notesEndpoints(build),
        ...mailsEndpoints(build),
        ...coursesEndpoints(build),
        ...industriesEndpoints(build),
        ...appointmentsEndpoints(build),
        ...allCommunicationEndpoints(build),
    }),
})

const {
    // ------ Industry ------ //
    useGetAllIndustriesQuery,

    useGetAllRtosQuery,
    useGetSubAdminRtosQuery,

    useGetAllCoursesQuery,

    // ------ NOTES ------ //
    useNotesQuery,
    useNotesPinnedQuery,
    useNoteCreateMutation,
    useNoteUpdateMutation,
    useNoteRemoveMutation,
    useNoteStatusChangeMutation,

    // --- COMMUNICATIONS --- //
    useCommunicationsQuery,

    // --- MAILS --- //
    useGetMessagesQuery,
    useSendMessageMutation,

    // -- APPOINTMENTS -- //
    useGetAppointmentsAvailableSlotsQuery,
} = commonApi

export const CommonApi = {
    Filter: {
        useIndustries: useGetAllIndustriesQuery,
        useRtos: useGetAllRtosQuery,
        useCourses: useGetAllCoursesQuery,
        useSubAdminRtos: useGetSubAdminRtosQuery,
    },

    Notes: {
        useList: useNotesQuery,
        usePinned: useNotesPinnedQuery,
        useCreate: useNoteCreateMutation,
        useUpdate: useNoteUpdateMutation,
        useRemove: useNoteRemoveMutation,
        useStatusChange: useNoteStatusChangeMutation,
    },
    AllCommunication: {
        useCommunications: useCommunicationsQuery,
    },
    Messages: {
        useMessages: useGetMessagesQuery,
        useSendMessage: useSendMessageMutation,
    },
    Appointments: {
        useAppointmentsAvailableSlots: useGetAppointmentsAvailableSlotsQuery,
    },
}
