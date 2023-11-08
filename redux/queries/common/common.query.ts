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
import { studentAssessmentGalleryEndpoints } from './studentAssessmentGallery'
import { LogoutType } from '@hooks'
import { findWorkplaceEndpoints } from './findWorkplaces'

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
        bulkStatus: build.mutation<any, any>({
            query: ({ ids, status }) => ({
                url: `admin/user/status/update`,
                method: 'PATCH',
                params: { status },
                body: { ids },
            }),
            invalidatesTags: ['BulkStatus', 'Industries', 'Students'],
        }),
        getCommonDocuments: build.query<any, void>({
            query: () => `admin/documents/list`,
            providesTags: ['Documents'],
        }),

        getSpecificUserDocuments: build.query<any, number>({
            query: (id) => ({
                url: `admin/documents/for-student/list`,
                params: { rto: id },
            }),
            providesTags: ['Documents'],
        }),

        getRecentActivities: build.query<
            any,
            {
                search?: string
                currentDate?: number
                startDate?: string
                endDate?: string
                last7days?: any
                skip?: number
                limit?: number
                coordinator?: number
                objectId?: number
            }
        >({
            query: (params) => ({
                url: `activity-logger`,
                params,
            }),
            providesTags: ['RecentActivities'],
        }),

        perFormAcivityOnLogout: build.mutation<
            any,
            { type?: LogoutType | undefined }
        >({
            query: (body) => ({
                url: 'auth/log/out',
                method: 'POST',
                body,
            }),
        }),

        getRecentActivitiesCount: build.query<
            any,
            {
                search?: string
                currentDate?: number
                startDate?: string
                endDate?: string
                last7days?: any
                user?: number
            }
        >({
            query: (params) => ({
                url: `subadmin/activity-logger/count`,
                params,
            }),
            providesTags: ['RecentActivities'],
        }),
        getIndustryRecentActivities: build.query<
            any,
            {
                search?: string
                currentDate?: number
                startDate?: string
                endDate?: string
                last7days?: any
                skip?: number
                limit?: number
                id?: number
            }
        >({
            query: ({ id, ...params }) => ({
                url: `shared/industry/history/${id}`,
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

        getUserPassword: build.query<any, number>({
            query: (id) => `auth/view/password/${id}`,
            providesTags: ['User'],
        }),
        contactUs: build.mutation<any, any>({
            query: (body) => ({
                url: 'website-messages/create',
                method: 'POST',
                body,
            }),
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
        ...studentAssessmentGalleryEndpoints(build),
        ...findWorkplaceEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    useGetUserPasswordQuery,

    usePerFormAcivityOnLogoutMutation,

    useDownloadAssessmentToolQuery,
    useBulkUserRemoveMutation,
    useContactUsMutation,

    useGetSerchedPlacesQuery,
    // ---- EXPIRY DATE ---- //
    useUpdateExpiryDateMutation,

    // ------ Industry ------ //
    useGetAllIndustriesQuery,
    useSnoozeIndustryMutation,
    useAllGetIndustriesListQuery,
    useGetAllAdvertisedJobsQuery,
    useGetAdvertisedJobDetailQuery,
    useApplyForJobFromHomePageMutation,
    useGetBulkEmailSubadminIndustriesQuery,

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
    useSearchBulkMailSubadminRTOsQuery,
    useSearchBulkMailSubadminStudentsQuery,
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
    useGetPlacementNotificationsQuery,

    // ------ Bulk Status ------ //
    useBulkStatusMutation,
    // ------ Recent Activities ------ //
    useGetRecentActivitiesQuery,
    useGetRecentActivitiesCountQuery,
    useGetIndustryRecentActivitiesQuery,

    // ---- DOCUMENTS ---- //
    useGetCommonDocumentsQuery,
    useGetSpecificUserDocumentsQuery,

    // ---- USER ---- //
    useChangeUserStatusMutation,
    // ---- COURSE ---- //
    useGetCoursesListQuery,
    useGetSubadminCoursesListQuery,

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
    useGetTicketCountQuery,
    useCloseTicketMutation,
    useCreateTicketMutation,
    useGetTicketDetailQuery,
    useGetTicketRepliesQuery,
    useSeenTicketReplyMutation,
    useGetStudentTicketsListQuery,

    // ----- STUDENTASSESSMENTFILES ----- //
    useGalleryFileViewDetailQuery,
    useGetAllRtoGalleryStudentsQuery,
    useGetAllStudentAssessmentFilesQuery,

    // ----- FIND WORKPLACE ----- //
    useAddIndustryMutation,
    useAddToSignupMutation,
    useUpdateIndustryMutation,
    useFindIndustriesCountQuery,
    useGetAllFindWorkplacesQuery,
    useGetFindWorkplacesCountQuery,
    useRemoveFutureIndustryMutation,
    useIndustriesStatusChangeMutation,
    useRemoveMultiFutureIndustryMutation,
} = commonApi

export const CommonApi = {
    ViewPassword: {
        getUserPassword: useGetUserPasswordQuery,
    },
    LogoutActivity: {
        perFormAcivityOnLogout: usePerFormAcivityOnLogoutMutation,
    },
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
        useSnoozeIndustry: useSnoozeIndustryMutation,
        useIndustriesList: useAllGetIndustriesListQuery,
        useApplyForJob: useApplyForJobFromHomePageMutation,
        getAllAdvertisedJobs: useGetAllAdvertisedJobsQuery,
        getAdvertisedJobDetail: useGetAdvertisedJobDetailQuery,
        bulkEmailSubadminIndustries: useGetBulkEmailSubadminIndustriesQuery,
    },
    Courses: {
        useCoursesList: useGetCoursesListQuery,
        subadminCoursesList: useGetSubadminCoursesListQuery,
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
        bulkMailSubadminStudents: useSearchBulkMailSubadminStudentsQuery,
        bulkMailSubadminRTOs: useSearchBulkMailSubadminRTOsQuery,
        useRemoveDraft: useRemoveDraftMutation,
        useUpdateEmailDraft: useUpdateEmailDraftMutation,
        useContactUs: useContactUsMutation,
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
        usePlacementNotifications: useGetPlacementNotificationsQuery,
    },
    Documents: {
        useList: useGetCommonDocumentsQuery,
        useGetSpecificUserDocuments: useGetSpecificUserDocumentsQuery,
    },
    RecentActivities: {
        useRecentActivities: useGetRecentActivitiesQuery,
        useRecentActivitiesCount: useGetRecentActivitiesCountQuery,
        useIndustryRecentActivities: useGetIndustryRecentActivitiesQuery,
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
        useStudentTicketsList: useGetStudentTicketsListQuery,

        useGetTicket: useGetTicketQuery,
        useAddReply: useAddReplyMutation,
        useGetAllTicket: useGetAllTicketQuery,
        useGetDetail: useGetTicketDetailQuery,
        useCloseTicket: useCloseTicketMutation,
        useCreateTicket: useCreateTicketMutation,
        useGetTicketReplies: useGetTicketRepliesQuery,
        useSeenTicketReply: useSeenTicketReplyMutation,
        useGetTicketCountQuery: useGetTicketCountQuery,
    },
    StudentAssessmentFiles: {
        useGalleryFileViewDetail: useGalleryFileViewDetailQuery,
        useGetAllRtoGalleryStudents: useGetAllRtoGalleryStudentsQuery,
        useAllStudentAssessmentFiles: useGetAllStudentAssessmentFilesQuery,
    },
    FindWorkplace: {
        useAddIndustry: useAddIndustryMutation,
        useAddToSignup: useAddToSignupMutation,
        useUpdateIndustry: useUpdateIndustryMutation,
        useFindIndustriesCount: useFindIndustriesCountQuery,
        useGetAllFindWorkplaces: useGetAllFindWorkplacesQuery,
        useGetFindWorkplacesCount: useGetFindWorkplacesCountQuery,
        useIndustriesStatusChange: useIndustriesStatusChangeMutation,
        useRemoveFutureIndustryMutation: useRemoveFutureIndustryMutation,
        useRemoveMultiFutureIndustry: useRemoveMultiFutureIndustryMutation,
    },
}
