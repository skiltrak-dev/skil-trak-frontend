import { UserStatus } from '@types'
import { emptySplitApi } from '../empty.query'
import { subAdminAppointmentspoints } from './appointments'
import { assessmentEvidenceEndpoints } from './assessmentEvidence'
import { subAdminIndustriesEndpoints } from './industries'
import { notesEndpoints } from './notes'
import { profileEndpoints } from './profile'
import { subAdminReports } from './reports'
import { subAdminRtoEndpoints } from './rto'
import { setScheduleEndpoints } from './setSchedule'
import { setUnavailabilityEndpoints } from './setUnavailability'
import { subAdminSettingEndpoints } from './setting'
import { studentsEndpoints } from './students'
import { workplaceEndpoints } from './workplace'
export const subAdminApi = emptySplitApi.injectEndpoints({
    // export const subAdminApi = createApi({
    //     reducerPath: 'subAdminApi',
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

    // keepUnusedDataFor: 200,
    // refetchOnMountOrArgChange: true,
    // refetchOnReconnect: true,

    // ---------- Sub Admin ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<any, void>({
            query: () => `subadmin/me/profile`,
            providesTags: ['SubAdmin'],
        }),

        subadminCourses: build.query<any, void>({
            query: () => `subadmin/courses/list`,
            providesTags: ['SubAdmin'],
        }),

        subadminStatistics: build.query<any, void>({
            query: () => `subadmin/dashboard/count`,
            providesTags: ['Statistics'],
        }),

        changeSubAdminUserStatus: build.mutation<
            any,
            { id: number; status: UserStatus }
        >({
            query: ({ id, status }) => ({
                url: `shared/user/status/update`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }),
            invalidatesTags: [
                'Notes',
                'SubAdmin',
                'SubAdminRtos',
                'SubAdminIndustries',
            ],
        }),

        ...notesEndpoints(build),
        ...subAdminReports(build),
        ...profileEndpoints(build),
        ...studentsEndpoints(build),
        ...workplaceEndpoints(build),
        ...setScheduleEndpoints(build),
        ...subAdminRtoEndpoints(build),
        ...subAdminSettingEndpoints(build),
        ...setUnavailabilityEndpoints(build),
        ...subAdminAppointmentspoints(build),
        ...assessmentEvidenceEndpoints(build),
        ...subAdminIndustriesEndpoints(build),
    }),
    // overrideExisting: false,
})

export const {
    // ------ SELF ------ //
    useProfileQuery,
    useSubadminCoursesQuery,
    useUpdateSubAdminProfileMutation,
    useChangeSubAdminUserStatusMutation,

    // ------ NOTES ------ //
    useSubadminNotesQuery,
    useGetNotesQuery,
    useNoteAddMutation,
    useNoteDeleteMutation,
    useUpdateNoteMutation,
    useSubadminNoteStatusChangeMutation,

    // ------ WORKPLACE------ //
    useWorkplaceCountQuery,
    useAgrementSignMutation,
    useViewMoreIndustriesQuery,

    useAssignSubadminWorkplaceCourseMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useAssignToSubAdminMutation,
    useUsAssignSubAdminMutation,
    useCompletePlacementMutation,
    useTerminatePlacementMutation,
    useGetMyStudentsWorkplacesQuery,
    useGetSubAdminWorkplacesQuery,
    useRemoveAppliedIndustryMutation,
    useGetCancelledWorkplacesQuery,
    useGetPlacementStartedWorkplacesQuery,
    useGetSubAdminFilteredWorkplacesQuery,
    useSendInterviewNotificationMutation,
    useForwardWorkplaceToIndustryMutation,
    useAddWorkplaceNoteMutation,
    useRemoveAppliedIndustryFromWorkplaceMutation,
    useGetWorkplaceFoldersQuery,
    useUpdateWorkplaceStatusMutation,
    useCancelWorkplaceStatusMutation,
    useGetAddedByStudentsWorkplacesQuery,
    useSubAdminApplyStudentWorkplaceMutation,
    useAddCustomIndustryMutation,
    useShowExistingIndustriesQuery,
    useAddExistingIndustriesMutation,
    useChangeCustomIndustryStatusMutation,
    useSendMeetingNotificationMutation,

    // ----- STUDENTS-------//
    useGetSubAdminStudentsQuery,
    useGetSubAdminTicketStudentsListQuery,
    useSetNotContactableMutation,
    useCalledStudentMutation,
    useSubAdminStudentCountQuery,
    useSubAdminRequestWorkplaceMutation,
    useSubAdminFilteredStudentsQuery,
    useSubadminStudentAssignCoursesMutation,
    useGetSubAdminNonContactableStudentsQuery,
    useSubadminStudentUnassignCoursesMutation,
    useGetSubAdminStudentWorkplaceQuery,
    useGetSubAdminMyRtoQuery,
    useGetSubAdminStudentCoursesQuery,
    useGetSubAdminStudentDetailQuery,
    useGetSubAdminStudentWorkplaceDetailQuery,
    useUpdateSubAdminCourseDurationMutation,
    useGetSubAdminMyStudentsQuery,
    useAssignStudentsToSubAdminMutation,
    useSubAdminRequestIndustryWorkplaceMutation,
    useSubAdminCancelStudentWorkplaceRequestMutation,
    useGetRequiredDocsQuery,
    useGetRequiredFoldersQuery,
    useGetPlacementStartedStudentsQuery,
    useGetRequiredDocsResponseQuery,
    useUploadRequiredDocsMutation,
    useFindByAbnWorkplaceMutation,
    useApplyWorkplaceOnExistingIndustryMutation,
    useAddCustomIndustyForWorkplaceMutation,
    useStudentCoursesQuery,
    useChangeStudentPasswordMutation,
    useUpdateStudentDetailMutation,
    useChangeStudentStatusMutation,
    useGetSubAdminStudentWorkplaceHistoryQuery,
    useChangeStudentCurrentStatusMutation,
    useAddSecondWorkplaceMutation,
    useAddCustomSecondWorkplaceMutation,
    useAddCourseStartEndDateMutation,
    useUpdateCourseStartEndDateMutation,
    useStudentCallLogMutation,
    useGetStudentCallLogQuery,
    useStudentAnsweredCallMutation,
    useDownloadStudentCSVMutation,
    useFindSuggestedIndustriesQuery,

    // -- COUNT -- //
    useSubadminStatisticsQuery,

    // --- ASSESSMENT EVIDENCE --- //
    useGetAssessmentEvidenceQuery,
    useArchiveAssessmentEvidenceMutation,
    useAssessmentCountQuery,
    useGetAssessmentResponseQuery,

    useGetAgrementFileQuery,
    useGetArchivedAssessmentResponseQuery,
    useStudentAssessmentCoursesQuery,
    useAddCommentOnAssessmentMutation,
    useGetAssessmentEvidenceDetailQuery,
    useGetArchivedAssessmentEvidenceDetailQuery,
    useSubmitAssessmentEvidenceMutation,
    useMaulallyReopenSubmissionRequestMutation,
    useUploadAssessmentDocsMutation,
    useInitiateSigningMutation,
    useGetDocuSignStatusQuery,
    useDownloadAllCourseFilesMutation,
    useDownloadArhiveCourseFilesMutation,
    useArchiveUploadedFileMutation,
    useDeleteAssessmentEvidenceMutation,

    // --- SET SCHEDULE --- //
    useSetScheduleMutation,
    useSetScheduledListQuery,

    // --- SET UNAVAILABILITY -- //
    useAddUnavailabilityMutation,
    useGetUnAvailabilitiesQuery,
    useRemoveUnAvailabilityMutation,

    // --- APOINTMENTS --- //
    useSearchUserQuery,
    useSearchUserByIdQuery,
    useAvailabilityListQuery,
    useSearchSubAdminUsersQuery,
    useUserAvailabilitiesQuery,

    // ---- RTO ---- //
    useSubadminRtoStatisticsCountQuery,
    useSubadminRtoImportStudentsMutation,
    useGetSubAdminRtosFilterListQuery,
    useGetSubAdminRtosQuery,
    useGetSubAdminRTODetailQuery,
    useGetSubAdminRTOCoursesQuery,
    useGetRTOAssessmentToolsQuery,
    useGetSubAdminRtosStudentsQuery,
    useGetSubAdminRtoAppointmentsQuery,
    useUpdateSubAdminRtoStudentStatusMutation,
    useCreateRtoSubAdminAssessmentToolsMutation,
    useRemoveSubAdminRTOAssessmentToolsMutation,
    useUpdateRtoSubAdminAssessmentToolsMutation,
    useUpdateSubAdminAssessmentToolArchiveMutation,

    // --- SETTING --- //
    useGetSettingDataQuery,
    useSubAdminSettingMutation,

    // --- INDUSTRIES --- //
    useSubadminIndustryStatisticsCountQuery,
    useGetSnoozedIndustryQuery,
    useGetSubadminIndustriesCountQuery,
    useGetSubAdminIndustriesQuery,
    useGetFavouriteIndustriesQuery,
    useGetSubAdminIndustryStudentsQuery,
    useGetSubAdminIndustriesProfileQuery,
    useAddToFavoriteMutation,
    useAddToPartnerMutation,
    useIndustryCallLogMutation,
    useGetIndustryCallLogQuery,
    useIndustryAnsweredCallMutation,
    useMakeIndustryHeadquarterMutation,
    useGetIndustryBranchesQuery,
    useRemoveIndustryBranchMutation,

    // --- REPORTS --- //
    useGetAssignedStudentsReportQuery,
    useGetAssignedWorkplaceReportQuery,
    useGetActiveStudentsReportQuery,
    useGetSubAdminArchivedStudentsReportQuery,
    useGetStudentsCallsReportQuery,
    useGetBookAppointmentsReportQuery,
    useGetSubAdminTerminatedWorkplaceReportQuery,
    useGetSubAdminCompletedWorkplaceReportQuery,
    useGetSubAdminCancelledWorkplaceReportQuery,
    useGetStudentWorkplaceStartedReportQuery,
    useGetStudentWithNoWorkplaceReportQuery,
    useGetSubAdminReportDownloadLinkQuery,
    useGetStudentProvidedWorkplaceReportQuery,
} = subAdminApi

export const SubAdminApi = {
    Count: {
        statistics: useSubadminStatisticsQuery,
    },
    SubAdmin: {
        useProfile: useProfileQuery,
        useSubadminCourses: useSubadminCoursesQuery,
        useUpdateProfile: useUpdateSubAdminProfileMutation,
        changeSubAdminUserStatus: useChangeSubAdminUserStatusMutation,
    },
    Notes: {
        useList: useSubadminNotesQuery,
        useCreate: useNoteAddMutation,
        useDelete: useNoteDeleteMutation,
        useStatusChange: useSubadminNoteStatusChangeMutation,
    },

    Student: {
        useCount: useSubAdminStudentCountQuery,
        useList: useGetSubAdminStudentsQuery,
        useSubAdminStudentList: useGetSubAdminTicketStudentsListQuery,
        assignCourse: useSubadminStudentAssignCoursesMutation,
        subadminStudentUnassignCourses:
            useSubadminStudentUnassignCoursesMutation,
        useNotContactable: useSetNotContactableMutation,
        useCalled: useCalledStudentMutation,
        useCourses: useGetSubAdminStudentCoursesQuery,
        useChangePassword: useChangeStudentPasswordMutation,
        useUpdateDetail: useUpdateStudentDetailMutation,
        changeStatus: useChangeStudentStatusMutation,
        studentWorkplaceHistory: useGetSubAdminStudentWorkplaceHistoryQuery,
        useStudentCallLog: useStudentCallLogMutation,
        useGetStudentCallLog: useGetStudentCallLogQuery,
        useAddSecondWorkplace: useAddSecondWorkplaceMutation,
        useDownloadStudentCSV: useDownloadStudentCSVMutation,
        useStudentAnsweredCall: useStudentAnsweredCallMutation,
        changeCurrentStatus: useChangeStudentCurrentStatusMutation,
        useAddCustomWorkplace: useAddCustomSecondWorkplaceMutation,
        addCourseStartEndDate: useAddCourseStartEndDateMutation,
        placementStartedStudents: useGetPlacementStartedStudentsQuery,
        useUpdateCourseStartEndDate: useUpdateCourseStartEndDateMutation,
        useNonContactableStudents: useGetSubAdminNonContactableStudentsQuery,
        useFindSuggestedIndustries: useFindSuggestedIndustriesQuery,
    },
    Industry: {
        useAddToPartner: useAddToPartnerMutation,
        useIndustryCallLog: useIndustryCallLogMutation,
        useGetIndustryCallLog: useGetIndustryCallLogQuery,
        useGetIndustryBranches: useGetIndustryBranchesQuery,
        useIndustryAnsweredCall: useIndustryAnsweredCallMutation,
        useRemoveIndustryBranch: useRemoveIndustryBranchMutation,
        useStatusticsCount: useSubadminIndustryStatisticsCountQuery,
        useMakeIndustryHeadquarter: useMakeIndustryHeadquarterMutation,
    },
    Rto: {
        useRtoStatsCount: useSubadminRtoStatisticsCountQuery,
        useImportStudentList: useSubadminRtoImportStudentsMutation,
        useRtosFilterList: useGetSubAdminRtosFilterListQuery,
    },
    Workplace: {
        count: useWorkplaceCountQuery,
        useViewMoreIndustries: useViewMoreIndustriesQuery,
        assignCourse: useAssignSubadminWorkplaceCourseMutation,
        AgreementSign: useAgrementSignMutation,
        removeAppliedIndustry: useRemoveAppliedIndustryMutation,
        removeAppliedIndustryFromWorkplace:
            useRemoveAppliedIndustryFromWorkplaceMutation,
        useStartPlacementMutation,
        useIndustryResponseMutation,
        useAssignToSubAdminMutation,
        useUsAssignSubAdminMutation,
        useCompletePlacementMutation,
        useTerminatePlacementMutation,
        useGetMyStudentsWorkplacesQuery,
        usePlacementStartedWorkplaces: useGetPlacementStartedWorkplacesQuery,
        useGetSubAdminWorkplacesQuery,
        useGetCancelledWorkplacesQuery,
        useGetSubAdminFilteredWorkplacesQuery,
        useSendInterviewNotificationMutation,
        useForwardWorkplaceToIndustryMutation,
        useAddWorkplaceNoteMutation,
        useGetWorkplaceFoldersQuery,
        useUpdateWorkplaceStatusMutation,
        useCancelWorkplaceStatusMutation,
        useGetAddedByStudentsWorkplacesQuery,
        useSubAdminApplyStudentWorkplaceMutation,
        useAddCustomIndustryMutation,
        useShowExistingIndustriesQuery,
        useAddExistingIndustriesMutation,
        useChangeCustomIndustryStatusMutation,
        useSendMeetingNotification: useSendMeetingNotificationMutation,
    },

    Courses: {
        useStudentCourses: useStudentCoursesQuery,
    },

    Docs: {
        useRequiredDocs: useGetRequiredDocsQuery,
        useRequiredFolders: useGetRequiredFoldersQuery,
        useRequiredDocsResponse: useGetRequiredDocsResponseQuery,
    },
    AssessmentEvidence: {
        uploadDocs: useUploadAssessmentDocsMutation,
        useInitiateSigning: useInitiateSigningMutation,
        useDocuSignStatus: useGetDocuSignStatusQuery,
        archiveUploadedFile: useArchiveUploadedFileMutation,
        deleteAssessmentEvidence: useDeleteAssessmentEvidenceMutation,
        downloadFiles: useDownloadAllCourseFilesMutation,
        downloadArchiveFiles: useDownloadArhiveCourseFilesMutation,
        useArchiveAssessmentEvidence: useArchiveAssessmentEvidenceMutation,
    },
    Reports: {
        useAssignedStudents: useGetAssignedStudentsReportQuery,
        useAssignedWorkplace: useGetAssignedWorkplaceReportQuery,
        useActiveStudentsReport: useGetActiveStudentsReportQuery,
        useArchiveStudentsReport: useGetSubAdminArchivedStudentsReportQuery,
        useStudentsCallsReport: useGetStudentsCallsReportQuery,
        useBookAppointmentsReport: useGetBookAppointmentsReportQuery,
        useTerminatedWorkplaceReport:
            useGetSubAdminTerminatedWorkplaceReportQuery,
        useCompletedWorkplaceReport:
            useGetSubAdminCompletedWorkplaceReportQuery,
        useCancelledWorkplaceReport:
            useGetSubAdminCancelledWorkplaceReportQuery,
        useStudentWorkplaceStartedReport:
            useGetStudentWorkplaceStartedReportQuery,
        useStudentWithNoWorkplaceReport:
            useGetStudentWithNoWorkplaceReportQuery,
        useDownloadLink: useGetSubAdminReportDownloadLinkQuery,
        useStudentProvidedWorkplaceReport:
            useGetStudentProvidedWorkplaceReportQuery,
    },
}
