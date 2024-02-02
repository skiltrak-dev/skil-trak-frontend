import { allCommunicationEndpoints } from './allCommunication'
import { appointmentsEndpoints } from './appointments'
import { changeProfileImageEndpoints } from './changeProfileImage'
import { coursesEndpoints } from './courses'
import { impersonationEndpoints } from './impersonation'
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
import { eSignEndpoints } from './eSign'

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
        getCountries: build.query<any, any>({
            query: () => `country`,
            providesTags: ['Country'],
        }),
        getCountriesList: build.query<any, void>({
            query: () => `country/list/name`,
            providesTags: ['Country'],
        }),
        getStates: build.query<any, any>({
            query: () => `country/states`,
            providesTags: ['States'],
        }),
        getCountryStates: build.query<any, any>({
            query: (id) => `country/states/list/${id}`,
            providesTags: ['States'],
        }),
        countryAdd: build.mutation<any, any>({
            query: (body: any) => ({
                url: `country`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Country'],
        }),
        stateAdd: build.mutation<any, any>({
            query: (body: any) => ({
                url: `country/states`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Country'],
        }),
        deleteState: build.mutation<any, any>({
            query: (id: any) => ({
                url: `country/state/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Country'],
        }),
        deleteCountry: build.mutation<any, any>({
            query: (id: any) => ({
                url: `country/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Country'],
        }),
        getSpecificUserDocuments: build.query<any, number>({
            query: (id) => ({
                url: `admin/documents/for-student/list`,
                params: { rto: id },
            }),
            providesTags: ['Documents'],
        }),
        getCoursesFolders: build.query<any, void>({
            query: () => ({
                url: `shared/industry/courses/folder`,
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
        getSubAdminActivitiesAsAdmin: build.query<
            any,
            {
                search?: string
                currentDate?: number
                startDate?: string
                endDate?: string
                last7days?: any
                skip?: number
                limit?: number
                coordinator?: any
                // objectId?: number
            }
        >({
            query: (params) => ({
                url: `activity-logger/list`,
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
        ...eSignEndpoints(build),
        ...ticketEndpoints(build),
        ...coursesEndpoints(build),
        ...industriesEndpoints(build),
        ...agreementsEndpoints(build),
        ...appointmentsEndpoints(build),
        ...notificationsEndpoints(build),
        ...findWorkplaceEndpoints(build),
        ...impersonationEndpoints(build),
        ...allCommunicationEndpoints(build),
        ...changeProfileImageEndpoints(build),
        ...studentAssessmentGalleryEndpoints(build),
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
    useUnSnoozeIndustryMutation,
    useAllGetIndustriesListQuery,
    useGetAllAdvertisedJobsQuery,
    useGetAdvertisedJobCountQuery,
    useGetAdvertisedJobDetailQuery,
    useApplyForJobFromHomePageMutation,
    useGetBulkEmailSubadminIndustriesQuery,
    useGetCoursesFoldersQuery,

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
    useGetSubAdminActivitiesAsAdminQuery,
    useGetRecentActivitiesCountQuery,
    useGetIndustryRecentActivitiesQuery,

    // ---- DOCUMENTS ---- //
    useGetCommonDocumentsQuery,
    useGetSpecificUserDocumentsQuery,
    // ---- COUNTRIES ---- //
    useGetCountriesQuery,
    useGetCountriesListQuery,
    useGetStatesQuery,
    useGetCountryStatesQuery,
    useCountryAddMutation,
    useStateAddMutation,
    useDeleteStateMutation,
    useDeleteCountryMutation,

    // ---- USER ---- //
    useChangeUserStatusMutation,
    // ---- COURSE ---- //
    useGetCoursesListQuery,
    useGetAllCoursesByRtoQuery,
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
    useUpdateReplyMutation,
    useGetAllTicketQuery,
    useGetTicketCountQuery,
    useCloseTicketMutation,
    useCreateTicketMutation,
    useGetTicketDetailQuery,
    useForwardTicketMutation,
    useGetTicketRepliesQuery,
    useSeenTicketReplyMutation,
    useGetStudentTicketsListQuery,

    // ----- STUDENTASSESSMENTFILES ----- //
    useGalleryFileViewDetailQuery,
    useGetAllRtoGalleryStudentsQuery,
    useGetAllStudentAssessmentFilesQuery,
    useMakeAsHighPriorityMutation,

    // ----- FIND WORKPLACE ----- //
    useAddIndustryMutation,
    useAddToSignupMutation,
    useUpdateIndustryMutation,
    useFindIndustriesCountQuery,
    useGetAllFindWorkplacesQuery,
    useGetFindWorkplacesCountQuery,
    useImportIndustriesListMutation,
    useRemoveFutureIndustryMutation,
    useIndustriesStatusChangeMutation,
    useRemoveMultiFutureIndustryMutation,

    // Impersonation
    useImpersonationToggleMutation,
    useAllowAsAdminMutation,

    // ---- ESIGN ---- //
    useGetEsignListQuery,
    useSaveEsignMutation,
    useGetEsignRtosQuery,
    useCancelESignMutation,
    useGetTabsForUsersQuery,
    useInitiateESignMutation,
    useGetEsignTemplateQuery,
    useAddSignForUserMutation,
    useUpdateSignDateMutation,
    useRemoveTemplateMutation,
    useCheckIfUserSignedQuery,
    useGetDocumentForUsersQuery,
    useSaveEsignTemplateMutation,
    useChangeEsignStatusMutation,
    useGetEsignTemplateTabsQuery,
    useGetSubadminEsignListQuery,
    useGetESignStudentDetailQuery,
    useRemoveTemplateTabsMutation,
    useGetTemplatePagesCountQuery,
    useSignDocumentByUserMutation,
    useAddCustomFieldDataMutation,
    useGetEsignTemplateDetailQuery,
    useGetESignTemplateDetailQuery,
    useCancelEsignDocumentMutation,
    useGetCoordinatorsByCourseQuery,
    usePreviewAsSignerTemplateQuery,
    useRequestResignForESignMutation,
    useViewStudentEsignDocumentQuery,
    useGetTotalPagesForDocumentsQuery,
    useUsersPendingDocumentsListQuery,
    useAddEmailCustomFieldDataMutation,
    useUpdateEsignTemplateDetailMutation,
    useGetUserTemplateDocumentForSignQuery,
    useGetUserSignatureTabForTemplateQuery,
    useGetSubadminEsignDocumentsCountQuery,
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
        jobsCount: useGetAdvertisedJobCountQuery,
        useSnoozeIndustry: useSnoozeIndustryMutation,
        useUnSnoozeIndustry: useUnSnoozeIndustryMutation,
        useIndustriesList: useAllGetIndustriesListQuery,
        useApplyForJob: useApplyForJobFromHomePageMutation,
        getAllAdvertisedJobs: useGetAllAdvertisedJobsQuery,
        getAdvertisedJobDetail: useGetAdvertisedJobDetailQuery,
        bulkEmailSubadminIndustries: useGetBulkEmailSubadminIndustriesQuery,
        getFolders: useGetCoursesFoldersQuery,
    },
    Courses: {
        useCoursesList: useGetCoursesListQuery,
        getCoursesByRto: useGetAllCoursesByRtoQuery,
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
    Countries: {
        useCountries: useGetCountriesQuery,
        useStatesList: useGetStatesQuery,
        useCountryStatesList: useGetCountryStatesQuery,
        useAddCountry: useCountryAddMutation,
        useAddState: useStateAddMutation,
        useDeleteState: useDeleteStateMutation,
        useDelateCountry: useDeleteCountryMutation,
        useCountriesList: useGetCountriesListQuery,
    },
    RecentActivities: {
        useRecentActivities: useGetRecentActivitiesQuery,
        useSubAdminActivitiesAsAdmin: useGetSubAdminActivitiesAsAdminQuery,
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
        useGetTicket: useGetTicketQuery,
        useAddReply: useAddReplyMutation,
        useUpdateReply: useUpdateReplyMutation,
        useGetAllTicket: useGetAllTicketQuery,
        useGetDetail: useGetTicketDetailQuery,
        useCloseTicket: useCloseTicketMutation,
        useCreateTicket: useCreateTicketMutation,
        useForwardTicket: useForwardTicketMutation,
        useGetTicketReplies: useGetTicketRepliesQuery,
        useSeenTicketReply: useSeenTicketReplyMutation,
        useGetTicketCountQuery: useGetTicketCountQuery,
        useStudentTicketsList: useGetStudentTicketsListQuery,
    },
    StudentAssessmentFiles: {
        useMakeAsHighPriority: useMakeAsHighPriorityMutation,
        useGalleryFileViewDetail: useGalleryFileViewDetailQuery,
        useGetAllRtoGalleryStudents: useGetAllRtoGalleryStudentsQuery,
        useAllStudentAssessmentFiles: useGetAllStudentAssessmentFilesQuery,
    },
    FindWorkplace: {
        useAddIndustry: useAddIndustryMutation,
        useAddToSignup: useAddToSignupMutation,
        useUpdateIndustry: useUpdateIndustryMutation,
        useFindIndustriesCount: useFindIndustriesCountQuery,
        importIndustriesList: useImportIndustriesListMutation,
        useGetAllFindWorkplaces: useGetAllFindWorkplacesQuery,
        useGetFindWorkplacesCount: useGetFindWorkplacesCountQuery,
        useIndustriesStatusChange: useIndustriesStatusChangeMutation,
        useRemoveFutureIndustryMutation: useRemoveFutureIndustryMutation,
        useRemoveMultiFutureIndustry: useRemoveMultiFutureIndustryMutation,
    },
    Impersonation: {
        useImpersonationToggle: useImpersonationToggleMutation,
        useAllowAsAdmin: useAllowAsAdminMutation,
    },
    ESign: {
        useGetEsign: useGetEsignListQuery,
        useSaveEsign: useSaveEsignMutation,
        useGetTabs: useGetTabsForUsersQuery,
        useGetEsignRtos: useGetEsignRtosQuery,
        useAddSign: useAddSignForUserMutation,
        useCancelESign: useCancelESignMutation,
        useInitiateESign: useInitiateESignMutation,
        useEsignTemplate: useGetEsignTemplateQuery,
        useGetDocument: useGetDocumentForUsersQuery,
        checkIfUserSigned: useCheckIfUserSignedQuery,
        useUpdateSignDate: useUpdateSignDateMutation,
        useRemoveTemplate: useRemoveTemplateMutation,
        useRemoveTabs: useRemoveTemplateTabsMutation,
        useSaveTemplate: useSaveEsignTemplateMutation,
        useChangeStatus: useChangeEsignStatusMutation,
        useGetESignStudent: useGetESignStudentDetailQuery,
        addCustomFieldData: useAddCustomFieldDataMutation,
        useSubadminEsignList: useGetSubadminEsignListQuery,
        cancelEsignDocument: useCancelEsignDocumentMutation,
        useSignDocumentByUser: useSignDocumentByUserMutation,
        useTamplatePagesCount: useGetTemplatePagesCountQuery,
        useGetEsignTemplateTabs: useGetEsignTemplateTabsQuery,
        useEsignTemplateDetail: useGetEsignTemplateDetailQuery,
        useESignTemplateDetail: useGetESignTemplateDetailQuery,
        useEsignCounts: useGetSubadminEsignDocumentsCountQuery,
        requestResignForESign: useRequestResignForESignMutation,
        getCoordinatorsByCourse: useGetCoordinatorsByCourseQuery,
        useStudentEsignDocument: useViewStudentEsignDocumentQuery,
        useUpdateEsignDetail: useUpdateEsignTemplateDetailMutation,
        usePendingDocumentsList: useUsersPendingDocumentsListQuery,
        usePreviewAsSignerTemplate: usePreviewAsSignerTemplateQuery,
        useGetDocumentTotalPages: useGetTotalPagesForDocumentsQuery,
        addEmailCustomFieldData: useAddEmailCustomFieldDataMutation,
        useTemplateDocumentForSign: useGetUserTemplateDocumentForSignQuery,
        useSignatureTabForTemplate: useGetUserSignatureTabForTemplateQuery,
    },
}
