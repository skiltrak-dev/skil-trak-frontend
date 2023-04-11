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

import { AdminStats, UserStatus } from '@types'
import { emptySplitApi } from '@queries/portals/empty.query'

export const commonApi = emptySplitApi.injectEndpoints({
    // export const commonApi = createApi({
    //     reducerPath: 'commonApi',
    //     baseQuery: fetchBaseQuery({
    //         baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
    //         prepareHeaders: (headers, { getState }) => {
    //             const token = AuthUtils.getToken()
    //             if (token) {
    //                 headers.set('authorization', `Bearer ${token}`)
    //             }
    //             return headers
    //         },
    //     }),

    //     tagTypes: [
    //         'RTOS',
    //         'Notes',
    //         'Mails',
    //         'Avatar',
    //         'Course',
    //         'Industry',
    //         'Appointments',
    //         'AllCommunications',
    //         'AllNotifications',
    //         'Students',
    //         'BulkStatus',
    //         'Documents',
    //         'MailCount',
    //         'MailsRecent',
    //         'RecentActivities',
    //         'User',
    //     ],

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
        getCommonDocuments: build.query<any, void>({
            query: () => `admin/documents/list`,
            providesTags: ['Documents'],
        }),
        getRecentActivities: build.query<any, void>({
            query: () => `activity-logger`,
            providesTags: ['RecentActivities'],
        }),

        changeUserStatus: build.mutation<
            any,
            { id: number; status: UserStatus }
        >({
            query: ({ id, status }) => ({
                url: `shared/user/status/update`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }),
            invalidatesTags: ['User'],
        }),

        ...rtosEndpoints(build),
        ...notesEndpoints(build),
        ...mailsEndpoints(build),
        ...coursesEndpoints(build),
        ...industriesEndpoints(build),
        ...appointmentsEndpoints(build),
        ...notificationsEndpoints(build),
        ...allCommunicationEndpoints(build),
        ...changeProfileImageEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    // ---- EXPIRY DATE ---- //
    useUpdateExpiryDateMutation,

    // ------ Industry ------ //
    useGetAllIndustriesQuery,
    useGetIndustriesListQuery,

    useGetAllRtosQuery,
    useGetSubAdminRtosQuery,
    useGetRtosListQuery,

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
    useSendCustomEmailMutation,
    useGetAllConversationsQuery,
    useGetSingleChatQuery,
    useCountUnreadMessageQuery,
    useGetAllMailsListQuery,
    useGetAllSentMailsListQuery,
    useGetMailsByStatusQuery,
    useGetAllTemplatesQuery,
    useGetTemplateQuery,
    useSendBulkMailMutation,
    useUpdateEmailDraftMutation,
    useSearchBulkMailStudentsQuery,
    useCreateNewDraftMutation,
    useRemoveDraftMutation,

    // -- APPOINTMENTS -- //
    useGetAppointmentsTypesQuery,
    useCreateAppointmentMutation,
    useGetBookedAppointmntsQuery,
    useAppointmentDetailQuery,
    useCancellAppointmentMutation,
    useGetAppointmentsAvailableSlotsQuery,
    useGetRescheduleAppointmentsAvailableSlotsQuery,
    useAllCoordinatorsQuery,
    useCoordinatorAvailablityQuery,
    useGetUpcommingAppointmentQuery,
    useRescheduleAppointmentMutation,

    // ------ Notifications ------ //
    useGetNotificationsQuery,
    useIsReadNotificationMutation,

    // ------ Bulk Status ------ //
    useBulkStatusMutation,
    // ------ Recent Activities ------ //
    useGetRecentActivitiesQuery,

    // ---- DOCUMENTS ---- //
    useGetCommonDocumentsQuery,

    // ---- USER ---- //
    useChangeUserStatusMutation,
    // ---- COURSE ---- //
    useGetCoursesListQuery,
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
    Rtos: {
        useRtosList: useGetRtosListQuery,
    },
    Industries: {
        useIndustriesList: useGetIndustriesListQuery,
    },
    Courses: {
        useCoursesList: useGetCoursesListQuery,
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
        sendCustomEmail: useSendCustomEmailMutation,
        useSingleChat: useGetSingleChatQuery,
        useRecentMails: useGetRecentMailsQuery,
        useAllMailsList: useGetAllMailsListQuery,
        useAllSentMails: useGetAllSentMailsListQuery,
        useMailsByStatus: useGetMailsByStatusQuery,
        useAllTemplates: useGetAllTemplatesQuery,
        useGetTemplate: useGetTemplateQuery,
        useSendBulkMail: useSendBulkMailMutation,
        useSearchBulkMailStudents: useSearchBulkMailStudentsQuery,
        useCreateDraft: useCreateNewDraftMutation,
        useRemoveDraft: useRemoveDraftMutation,
        useUpdateEmailDraft: useUpdateEmailDraftMutation,
    },
    Appointments: {
        appointmentType: useGetAppointmentsTypesQuery,
        createAppointment: useCreateAppointmentMutation,
        useAppointmentsAvailableSlots: useGetAppointmentsAvailableSlotsQuery,
        getRescheduleAppointmentsAvailableSlots:
            useGetRescheduleAppointmentsAvailableSlotsQuery,
        appointmentDetail: useAppointmentDetailQuery,
        cancellAppointment: useCancellAppointmentMutation,
        useBookedAppointments: useGetBookedAppointmntsQuery,
        allCoordinators: useAllCoordinatorsQuery,
        useCoordinatorAvailablity: useCoordinatorAvailablityQuery,
        useUpcommingAppointment: useGetUpcommingAppointmentQuery,
        rescheduleAppointment: useRescheduleAppointmentMutation,
    },
    Notifications: {
        useNotifications: useGetNotificationsQuery,
        useIsReadNotification: useIsReadNotificationMutation,
    },
    Documents: {
        useList: useGetCommonDocumentsQuery,
    },
    RecentActivities: {
        useRecentActivities: useGetRecentActivitiesQuery,
    },
    User: {
        changeUserStatus: useChangeUserStatusMutation,
    },
}
