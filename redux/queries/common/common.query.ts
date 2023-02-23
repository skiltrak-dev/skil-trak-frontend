import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { rtosEndpoints } from './rtos'
import { mailsEndpoints } from './mails'
import { notesEndpoints } from './notes'
import { coursesEndpoints } from './courses'
import { industriesEndpoints } from './industries'
import { appointmentsEndpoints } from './appointments'
import { allCommunicationEndpoints } from './allCommunication'
import { changeProfileImageEndpoints } from './changeProfileImage'
import { notificationsEndpoints } from './notifications'

import { AdminStats } from '@types'
import { emptySplitApi } from '@queries/portals/empty.query'

// export const commonApi = emptySplitApi.injectEndpoints({
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
        'Avatar',
        'Course',
        'Industry',
        'Appointments',
        'AllCommunications',
        'AllNotifications',
        'Students',
        'BulkStatus',
        'Documents',
        'MailCount',
        'MailsRecent',
    ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        updateExpiryDate: build.mutation<
            any,
            {
                id: number | undefined
                body: { expiryDate: Date; comment: string }
            }
        >({
            query: ({ id, body }) => ({
                url: `shared/student/update-expiry/${id}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Students', 'Notes', 'AllCommunications'],
        }),
        bulkStatus: build.mutation({
            query: ({ ids, status }: any) => ({
                url: `admin/user/status/update`,
                method: 'PATCH',
                params: { status },
                body: { ids },
            }),
            invalidatesTags: ['BulkStatus'],
        }),
        getDocuments: build.query<any, void>({
            query: () => `admin/documents/list`,
            providesTags: ['Documents'],
        }),

        ...rtosEndpoints(build),
        ...notesEndpoints(build),
        ...mailsEndpoints(build),
        ...coursesEndpoints(build),
        ...industriesEndpoints(build),
        ...appointmentsEndpoints(build),
        ...allCommunicationEndpoints(build),
        ...changeProfileImageEndpoints(build),
        ...notificationsEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    // ---- EXPIRY DATE ---- //
    useUpdateExpiryDateMutation,

    // ------ Industry ------ //
    useGetAllIndustriesQuery,

    useGetAllRtosQuery,
    useGetSubAdminRtosQuery,

    useGetAllCoursesQuery,

    // ----- AVATAR ----- //
    useChangeProfileMutation,
    useRemoveProfileMutation,

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
    useGetAllMailsQuery,
    useIsSeenMutation,
    useGetRecentMailsQuery,
    useGetAllConversationsQuery,
    useGetSingleChatQuery,
    useCountUnreadMessageQuery,

    // -- APPOINTMENTS -- //
    useCreateAppointmentMutation,
    useGetBookedAppointmntsQuery,
    useGetAppointmentsAvailableSlotsQuery,
    useAllCoordinatorsQuery,
    useCoordinatorAvailablityQuery,
    useGetUpcommingAppointmentQuery,

    // ------ Notifications ------ //
    useGetNotificationsQuery,
    useIsReadNotificationMutation,

    // ------ Bulk Status ------ //
    useBulkStatusMutation,

    // ---- DOCUMENTS ---- //
    useGetDocumentsQuery,
} = commonApi

export const CommonApi = {
    changeUserStatus: {
        useChangeStatus: useBulkStatusMutation,
    },
    Expiry: {
        useExpiryDate: useUpdateExpiryDateMutation,
    },
    Avatar: {
        useChangeProfile: useChangeProfileMutation,
        useRemoveProfile: useRemoveProfileMutation,
    },
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
        useAllMails: useGetAllMailsQuery,
        useMailCount: useCountUnreadMessageQuery,
        useIsSeen: useIsSeenMutation,
        useAllConversations: useGetAllConversationsQuery,
        useSingleChat: useGetSingleChatQuery,
        useRecentMails: useGetRecentMailsQuery,
    },
    Appointments: {
        createAppointment: useCreateAppointmentMutation,
        useAppointmentsAvailableSlots: useGetAppointmentsAvailableSlotsQuery,
        useBookedAppointments: useGetBookedAppointmntsQuery,
        allCoordinators: useAllCoordinatorsQuery,
        useCoordinatorAvailablity: useCoordinatorAvailablityQuery,
        useUpcommingAppointment: useGetUpcommingAppointmentQuery,
    },
    Notifications: {
        useNotifications: useGetNotificationsQuery,
        useIsReadNotification: useIsReadNotificationMutation,
    },
    Documents: {
        useList: useGetDocumentsQuery,
    },
}
