import { rtosEndpoints } from './rtos'
import { notesEndpoints } from './notes'
import { mailsEndpoints } from './mails'
import { coursesEndpoints } from './courses'
import { industriesEndpoints } from './industries'
import { appointmentsEndpoints } from './appointments'
import { impersonationEndpoints } from './impersonation'
import { notificationsEndpoints } from './notifications'
import { allCommunicationEndpoints } from './allCommunication'
import { changeProfileImageEndpoints } from './changeProfileImage'

import { UserStatus } from '@types'
import { LogoutType } from '@hooks'
import { draftEndpoints } from './draft'
import { eSignEndpoints } from './eSign'
import { allowLoginEndpoints } from './allowLogin'
import { ticketEndpoints } from './ticket.query'
import { agreementsEndpoints } from './agreement'
import { findWorkplaceEndpoints } from './findWorkplaces'
import { studentFeedbackEndpoints } from './studentFeedback'
import { emptySplitApi } from '@queries/portals/empty.query'
import { workBasedProgramEndpoints } from './workBasedProgram'
import { traineeshipProgramEndpoints } from './traineeshipProgram'
import { studentAssessmentGalleryEndpoints } from './studentAssessmentGallery'

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
            invalidatesTags: ['User', 'SubAdmins'],
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

        registerByFutureIndustry: build.mutation<any, any>({
            query: (body) => ({
                url: `industries/create/by-listing`,
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
        ...allowLoginEndpoints(build),
        ...agreementsEndpoints(build),
        ...appointmentsEndpoints(build),
        ...notificationsEndpoints(build),
        ...findWorkplaceEndpoints(build),
        ...impersonationEndpoints(build),
        ...studentFeedbackEndpoints(build),
        ...workBasedProgramEndpoints(build),
        ...allCommunicationEndpoints(build),
        ...changeProfileImageEndpoints(build),
        ...traineeshipProgramEndpoints(build),
        ...studentAssessmentGalleryEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    useRegisterByFutureIndustryMutation,

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
    useIsIndustryHiringMutation,
    useAllGetIndustriesListQuery,
    useGetAllAdvertisedJobsQuery,
    useGetAdvertisedJobCountQuery,
    useGetAdvertisedJobDetailQuery,
    useApplyForJobFromHomePageMutation,
    useIndustryBranchesAddressListQuery,
    useRemoveIndustryBranchAddressMutation,
    useUpdateIndustryBranchAddressMutation,
    useAddIndustryBranchesAddressMutation,
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
    useMultiplesMailsSeenMutation,
    useGetMailDetailQuery,
    useGetRecentMailsQuery,
    useSendCustomEmailMutation,
    useGetAllConversationsQuery,
    useGetUsersAllMailQuery,
    useRemoveMailMutation,
    useRemoveMultipleMailMutation,
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
    useAddNoteOnAppointmentMutation,
    useApprovePendingAppointmentMutation,
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
    useGetTicketsListByUserQuery,
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
    useGetMapFutureIndustriesQuery,
    useGetFindWorkplacesCountQuery,
    useImportIndustriesListMutation,
    useRemoveFutureIndustryMutation,
    useIndustriesStatusChangeMutation,
    useRemoveMultiFutureIndustryMutation,
    useAddFutureIndustryListingNoteMutation,
    useMultipleIndustriesStatusChangeMutation,

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
    useResendEmailToUserMutation,
    usePendingDocumentsCountQuery,
    useGetEsignTemplateDetailQuery,
    useGetESignTemplateDetailQuery,
    useCancelEsignDocumentMutation,
    useGetCoordinatorsByCourseQuery,
    useDownloadTemplateTabsQuery,
    useDownloadEsignDocumentQuery,
    useToggleReminderEmailMutation,
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

    // ---- Traineeship ---- //
    useGetTraineeshipProgramQuery,
    useAddTraineeshipProgramMutation,
    useGetTraineeshipProgramCountQuery,
    useContactTraineeshipProgramMutation,

    // ---- WORK BASED ---- //
    useGetWorkBasedProgramQuery,
    useGetContactUsQueriesQuery,
    useGetContactUsQueriesCountQuery,
    useAddWorkBasedProgramMutation,
    useGetWorkBasedProgramCountQuery,
    useContactWorkBasedProgramMutation,
    useContactContactUsQueriesMutation,
    useGetWorkBasedProgramAndTraineeshipCountQuery,

    // ---- FEEDBACK ---- //
    useStudentFeedbackMutation,
    useGetStudentCoordinatorFeedbackQuery,

    // ---- ALLOW LOGIN ---- //
    useAllowAsLoginMutation,
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
        getFolders: useGetCoursesFoldersQuery,
        jobsCount: useGetAdvertisedJobCountQuery,
        useList: useIndustryBranchesAddressListQuery,
        useSnoozeIndustry: useSnoozeIndustryMutation,
        useUnSnoozeIndustry: useUnSnoozeIndustryMutation,
        useIndustriesList: useAllGetIndustriesListQuery,
        useIsIndustryHiring: useIsIndustryHiringMutation,
        useApplyForJob: useApplyForJobFromHomePageMutation,
        getAllAdvertisedJobs: useGetAllAdvertisedJobsQuery,
        getAdvertisedJobDetail: useGetAdvertisedJobDetailQuery,
        addBranchesAddress: useAddIndustryBranchesAddressMutation,
        useUpdateIndustryBranch: useUpdateIndustryBranchAddressMutation,
        useRegisterByFutureIndustry: useRegisterByFutureIndustryMutation,
        useRemoveIndustryBranch: useRemoveIndustryBranchAddressMutation,
        bulkEmailSubadminIndustries: useGetBulkEmailSubadminIndustriesQuery,
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
        multiplesMailsSeen: useMultiplesMailsSeenMutation,
        useMailDetail: useGetMailDetailQuery,
        useAllConversations: useGetAllConversationsQuery,
        useUserMails: useGetUsersAllMailQuery,
        sendCustomEmail: useSendCustomEmailMutation,
        useSingleChat: useGetSingleChatQuery,
        useRemoveMail: useRemoveMailMutation,
        useRemoveMultipleMails: useRemoveMultipleMailMutation,
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
        useApproveAppointment: useApprovePendingAppointmentMutation,
        useAppointmentsAvailableSlots: useGetAppointmentsAvailableSlotsQuery,
        getRescheduleAppointmentsAvailableSlots:
            useGetRescheduleAppointmentsAvailableSlotsQuery,
        appointmentDetail: useAppointmentDetailQuery,
        cancellAppointment: useCancellAppointmentMutation,
        addNoteOnAppointment: useAddNoteOnAppointmentMutation,
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
        useTicketListByUser: useGetTicketsListByUserQuery,
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
        useAddFutureIndustryListingNote:
            useAddFutureIndustryListingNoteMutation,
        useUpdateIndustry: useUpdateIndustryMutation,
        useFindIndustriesCount: useFindIndustriesCountQuery,
        mapFutureIndustries: useGetMapFutureIndustriesQuery,
        importIndustriesList: useImportIndustriesListMutation,
        useGetAllFindWorkplaces: useGetAllFindWorkplacesQuery,
        useGetFindWorkplacesCount: useGetFindWorkplacesCountQuery,
        useIndustriesStatusChange: useIndustriesStatusChangeMutation,
        useRemoveFutureIndustryMutation: useRemoveFutureIndustryMutation,
        useRemoveMultiFutureIndustry: useRemoveMultiFutureIndustryMutation,
        useMultipleStatusChange: useMultipleIndustriesStatusChangeMutation,
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
        pendingDocsCount: usePendingDocumentsCountQuery,
        useGetESignStudent: useGetESignStudentDetailQuery,
        addCustomFieldData: useAddCustomFieldDataMutation,
        useResendEmailToUser: useResendEmailToUserMutation,
        useSubadminEsignList: useGetSubadminEsignListQuery,
        cancelEsignDocument: useCancelEsignDocumentMutation,
        useSignDocumentByUser: useSignDocumentByUserMutation,
        useTamplatePagesCount: useGetTemplatePagesCountQuery,
        useGetEsignTemplateTabs: useGetEsignTemplateTabsQuery,
        useToggleReminderEmail: useToggleReminderEmailMutation,
        useEsignTemplateDetail: useGetEsignTemplateDetailQuery,
        useESignTemplateDetail: useGetESignTemplateDetailQuery,
        useEsignCounts: useGetSubadminEsignDocumentsCountQuery,
        requestResignForESign: useRequestResignForESignMutation,
        useDownloadTemplateTabs: useDownloadTemplateTabsQuery,
        useDownloadEsignDocument: useDownloadEsignDocumentQuery,
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
    Traineeship: {
        useGetList: useGetTraineeshipProgramQuery,
        useCount: useGetTraineeshipProgramCountQuery,
        useAddTraineeship: useAddTraineeshipProgramMutation,
        useContactTraineeship: useContactTraineeshipProgramMutation,
    },
    WorkBased: {
        useCount: useGetWorkBasedProgramCountQuery,
        useWorkBasedList: useGetWorkBasedProgramQuery,
        useContactUsQueries: useGetContactUsQueriesQuery,
        useContactUsQueriesCount: useGetContactUsQueriesCountQuery,
        useAddWorkBased: useAddWorkBasedProgramMutation,
        useContactWorkBase: useContactWorkBasedProgramMutation,
        useContactContactUsQueries: useContactContactUsQueriesMutation,
        useWorkBaseAndTraineeCount:
            useGetWorkBasedProgramAndTraineeshipCountQuery,
    },
    Feedback: {
        useStudentFeedback: useStudentFeedbackMutation,
        useStudentFeedbackList: useGetStudentCoordinatorFeedbackQuery,
    },
    AllowLogin: {
        useAllowAsLogin: useAllowAsLoginMutation,
    },
}
