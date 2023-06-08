import { allCommunicationEndpoints } from './allCommunication'
import { appointmentsEndpoints } from './appointments'
import { changeProfileImageEndpoints } from './changeProfileImage'
import { coursesEndpoints } from './courses'
import { industriesEndpoints } from './industries'
import { mailsEndpoints } from './mails'
import { notesEndpoints } from './notes'
import { notificationsEndpoints } from './notifications'
import { rtosEndpoints } from './rtos'

import { emptySplitApi } from '@queries/portals/empty.query'
import { UserStatus } from '@types'
import { agreementsEndpoints } from './agreement'
import { draftEndpoints } from './draft'
import { ticketEndpoints } from './ticket.query'

export const commonApi = emptySplitApi.injectEndpoints({
    // ---------- COMMON ENDPOINTS ---------- //
    endpoints: (build) => ({
        getSerchedPlaces: build.query<any, any>({
            query: (text) =>
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=${process.env.NEXT_PUBLIC_MAP_KEY}`,
            providesTags: ['Documents'],
        }),
        downloadAssessmentTool: build.query<any, number>({
            query: (id) => `shared/assessment-tool/download/${id}`,
            providesTags: ['Documents'],
        }),
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
            invalidatesTags: [
                'Students',
                'SubAdminStudents',
                'Notes',
                'AllCommunications',
            ],
        }),
        bulkUserRemove: build.mutation({
            query: (ids: number[]) => ({
                url: `shared/bulk/users/remove`,
                method: 'DELETE',
                params: { users: ids },
            }),
            invalidatesTags: ['BulkUsersDelete'],
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
        getRecentActivities: build.query<
            any,
            {
                currentDate?: number
                startDate?: any
                endDate?: any
                last7days?: any
                skip?: number
                limit?: number
            }
        >({
            query: (params) => ({
                url: `activity-logger`,
                params,
            }),
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
        ...draftEndpoints(build),
        ...notesEndpoints(build),
        ...mailsEndpoints(build),
        ...ticketEndpoints(build),
        ...coursesEndpoints(build),
        ...agreementsEndpoints(build),
        ...industriesEndpoints(build),
        ...appointmentsEndpoints(build),
        ...notificationsEndpoints(build),
        ...allCommunicationEndpoints(build),
        ...changeProfileImageEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    useDownloadAssessmentToolQuery,
    useBulkUserRemoveMutation,

    useGetSerchedPlacesQuery,
    // ---- EXPIRY DATE ---- //
    useUpdateExpiryDateMutation,

    // ------ Industry ------ //
    useGetAllIndustriesQuery,
    useAllGetIndustriesListQuery,

    useGetAllRtosQuery,
    useGetFilterSubAdminRtosQuery,
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

    // ---- AGREEMENT ---- //
    useViewSignedAgreementQuery,

    // ---- DRAFT ---- //
    useSetEmailDarftMutation,
    useGetEmailDarftQuery,
    useSetNoteDarftMutation,
    useGetNoteDarftQuery,

    // ---- TICKETS ---- //
    useGetTicketQuery,
    useAddReplyMutation,
    useGetAllTicketQuery,
    useCloseTicketMutation,
    useCreateTicketMutation,
    useGetTicketDetailQuery,
    useGetTicketRepliesQuery,
    useSeenTicketReplyMutation,
} = commonApi

export const CommonApi = {
    SearchPlaces: {
        useGetSerchedPlaces: useGetSerchedPlacesQuery,
    },
    Download: {
        downloadAssessmentTool: useDownloadAssessmentToolQuery,
    },
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
        useSubAdminRtos: useGetFilterSubAdminRtosQuery,
    },
    Rtos: {
        useRtosList: useGetRtosListQuery,
    },
    Industries: {
        useIndustriesList: useAllGetIndustriesListQuery,
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
        bulkRemove: useBulkUserRemoveMutation,
    },
    Agreement: {
        viewAgreement: useViewSignedAgreementQuery,
    },
    Draft: {
        useEmailDraft: useSetEmailDarftMutation,
        useGetEmailDraft: useGetEmailDarftQuery,
        useSetNoteDarft: useSetNoteDarftMutation,
        getNoteDarft: useGetNoteDarftQuery,
    },
    Tickets: {
        useGetTicket: useGetTicketQuery,
        useAddReply: useAddReplyMutation,
        useGetAllTicket: useGetAllTicketQuery,
        useGetDetail: useGetTicketDetailQuery,
        useCloseTicket: useCloseTicketMutation,
        useCreateTicket: useCreateTicketMutation,
        useGetTicketReplies: useGetTicketRepliesQuery,
        useSeenTicketReply: useSeenTicketReplyMutation,
    },
}
