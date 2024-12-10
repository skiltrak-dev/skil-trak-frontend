import { AddPrevCourseDescription } from './../../../../partials/common/IndustryProfileDetail/components/CourseManagement/modal/AddPrevCourseDescription'
import { SubAdmin, UserStatus } from '@types'
import { notesEndpoints } from './notes'
import { subAdminReports } from './reports'
import { subAdminRtoEndpoints } from './rto'
import { profileEndpoints } from './profile'
import { emptySplitApi } from '../empty.query'
import { todoListEndpoints } from './todoList'
import { studentsEndpoints } from './students'
import { workplaceEndpoints } from './workplace'
import { setScheduleEndpoints } from './setSchedule'
import { subAdminSettingEndpoints } from './setting'
import { subadminVolunteerEndpoints } from './volunteer'
import { subAdminIndustriesEndpoints } from './industries'
import { subAdminAppointmentspoints } from './appointments'
import { setUnavailabilityEndpoints } from './setUnavailability'
import { assessmentEvidenceEndpoints } from './assessmentEvidence'
import { talentPoolEndpoints } from './talentPool'
import { studentsLogbookEndpoints } from './logbookSign'
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
        profile: build.query<SubAdmin, void>({
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
        importRtosList: build.mutation<any, any>({
            query: (body) => ({
                url: `rtolisting/bulk/create`,
                body,
                method: 'POST',
            }),
            invalidatesTags: ['RtosListing'],
        }),
        getAllRtosList: build.query<any, any>({
            query: (params) => ({
                url: `rtolisting`,
                params,
            }),
            providesTags: ['RtosListing'],
        }),
        rtosStatusChange: build.mutation<any, { id: number; status: string }>({
            query: ({ id, status }) => ({
                url: `rtolisting/status-update/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['RtosListing'],
        }),
        addRtoInListing: build.mutation<any, any>({
            query: (body) => ({
                url: `rtolisting`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['RtosListing'],
        }),
        updateRtoListing: build.mutation<any, any>({
            query: ({ id, ...body }) => ({
                url: `rtolisting/${id}/update`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['RtosListing'],
        }),
        deleteRtoListing: build.mutation<any, any>({
            query: (id) => ({
                url: `rtolisting/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['RtosListing'],
        }),
        getHodCoordinatorsList: build.query<any, any>({
            query: (params) => ({
                url: `department/hod/coordinators/list`,
                params,
            }),
            providesTags: ['Department'],
        }),
        getCoordinatorsDropDown: build.query<any, void>({
            query: () => `department/hod/coordinators`,
            providesTags: ['SubAdminStudents'],
        }),
        getDepartmentStudents: build.query<any, any>({
            query: (params) => ({
                url: `department/students`,
                params,
            }),
            providesTags: ['SubAdminStudents'],
        }),
        getDepartmentPendingIndustries: build.query<any, any>({
            query: (params) => ({
                url: `department/industries-list`,
                params,
            }),
            providesTags: ['SubAdminIndustries', 'Industries'],
        }),

        getDepartmentStudentsCount: build.query<any, void>({
            query: () => ({
                url: `department/students/count`,
            }),
            providesTags: ['SubAdminStudents'],
        }),
        getDepartmentCoursesRequestList: build.query<any, any>({
            query: (params) => ({
                url: `department/courses/request-list`,
                params,
            }),
            providesTags: ['SubAdminCourses'],
        }),
        departmentCourseRequest: build.mutation<any, any>({
            query: ({ params, body }) => ({
                url: `department/course-request/status`,
                method: 'PATCH',
                params,
                body,
            }),
            invalidatesTags: ['SubAdminCourses'],
        }),

        ...notesEndpoints(build),
        ...subAdminReports(build),
        ...profileEndpoints(build),
        ...studentsEndpoints(build),
        ...todoListEndpoints(build),
        ...workplaceEndpoints(build),
        ...setScheduleEndpoints(build),
        ...subAdminRtoEndpoints(build),
        ...studentsLogbookEndpoints(build),
        ...subAdminSettingEndpoints(build),
        ...setUnavailabilityEndpoints(build),
        ...subadminVolunteerEndpoints(build),
        ...subAdminAppointmentspoints(build),
        ...assessmentEvidenceEndpoints(build),
        ...subAdminIndustriesEndpoints(build),
        ...talentPoolEndpoints(build),
    }),
    // overrideExisting: false,
})

export const {
    // ------ SELF ------ //
    useProfileQuery,
    useGetSubAdminMapStudentsQuery,
    useGetSavedCoordinatesQuery,
    useGetSubAdminMapStudentDetailQuery,
    useGetSubAdminMapIndustriesQuery,
    useGetWorkplaceCourseIndustriesQuery,
    useChangeWorkplaceApprovalReqStatusMutation,
    useGetWarningPlacementAndInsuranceDocNoteQuery,
    useGetSubAdminRtosForMapQuery,
    useGetSubAdminStudentSuburbsForMapQuery,
    useSubadminCoursesQuery,
    useUpdateSubAdminProfileMutation,
    useChangeSubAdminUserStatusMutation,
    useSaveCoordinatesForMapMutation,
    useGetHodCoordinatorsListQuery,
    useGetCoordinatorsDropDownQuery,
    useGetDepartmentStudentsQuery,
    useGetDepartmentStudentsCountQuery,
    useGetDepartmentPendingIndustriesQuery,
    useGetDepartmentCoursesRequestListQuery,
    useDepartmentCourseRequestMutation,
    // -------- Rtos Listing --------//
    useImportRtosListMutation,
    useGetAllRtosListQuery,
    useRtosStatusChangeMutation,
    useAddRtoInListingMutation,
    useUpdateRtoListingMutation,
    useDeleteRtoListingMutation,

    // ---- TODO ---- //
    useTodoListCountQuery,

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
    useChangeStatustoSignedMutation,
    useCancelRequestWorkplaceMutation,
    useSubadminWpCancellationRequestsListQuery,
    useGetSubAdminMapSuggestedIndustryDetailQuery,

    useGetStudentWorkplaceAnswersQuery,
    useGetStudentWorkplaceAvailabilityQuery,
    useGetStudentWorkplacePlacementAnswersQuery,
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
    useContactWorkplaceIndustryMutation,
    useRemoveWorkplaceRequestApprovalMutation,

    // ----- STUDENTS-------//
    useGetSubAdminStudentsQuery,
    useGetRtoSubadminStudentsQuery,
    useGetSubAdminSnoozedStudentsQuery,
    useGetSubAdminUrgentStudentsQuery,
    useSubadminCompletedStudentsQuery,
    useGetSubAdminTicketStudentsListQuery,
    useSetNotContactableMutation,
    useCalledStudentMutation,
    useSubAdminStudentCountQuery,
    useProblamaticStudentMutation,
    useSubAdminRequestWorkplaceMutation,
    useSendPasswordToStudentMailMutation,
    useSubAdminFilteredStudentsQuery,
    useSubadminStudentAssignCoursesMutation,
    useGetSubAdminNonContactableStudentsQuery,
    useSubadminStudentUnassignCoursesMutation,
    useGetSubAdminStudentWorkplaceQuery,
    useGetStudentCancelledWPQuery,
    useGetSubAdminMyRtoQuery,
    useGetSubAdminStudentCoursesQuery,
    useGetSubAdminStudentDetailQuery,
    useUpdateStudentDateMutation,
    useGetWorkplaceIndustryDetailQuery,
    useGetWorkplaceStudentDetailQuery,
    useGetWorkplaceForScheduleQuery,
    useGetSubAdminStudentWorkplaceDetailQuery,
    useUpdateSubAdminCourseDurationMutation,
    useGetSubAdminMyStudentsQuery,
    useGetSubAdminMyStudentsCallLogQuery,
    useGetRtoCoordinatorStudentsQuery,
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
    useSnoozeStudentMutation,
    useUnSnoozeStudentMutation,
    useSendStudentMssageMutation,
    useGetStudentMessagesListQuery,

    // ---- LOGBOOK ---- //
    useSaveLogbookMutation,
    useGetStudentLogbookQuery,
    useGetStudentLogbookPagesCountQuery,

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
    useGetSubAdminRTOStatisticsQuery,
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
    useGetRtoCoordinatorsIndustryQuery,
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
    useChangeIndustryStudentsAcceptingStatusMutation,
    useGetIndustryStudentsScheduleQuery,
    useRequestToAddCoursesToIndustryMutation,
    useAddPrevCourseDescriptionMutation,
    useGetIndustryRequestedCoursesQuery,
    useGetIndustryCoursesOnAcceptanceQuery,
    useGetRejectedDepartmentIndustryQuery,
    useGetRejectedDepartmentIndustryCountQuery,
    useGetPendingDepartmentIndustryCountQuery,
    useGetPreviousIndustryCoursesQuery,

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

    // ---- VOLUNTEER ---- //
    useGetSubadminVolunteerRequestsQuery,

    // ----- TALENT POOL ----- //
    useGetSubAdminTalentPoolListQuery,
} = subAdminApi

export const SubAdminApi = {
    Count: {
        statistics: useSubadminStatisticsQuery,
    },
    SubAdmin: {
        useProfile: useProfileQuery,
        useSubAdminMapStudentDetail: useGetSubAdminMapStudentDetailQuery,
        useSubAdminMapIndustries: useGetSubAdminMapIndustriesQuery,
        useSubAdminRtosForMap: useGetSubAdminRtosForMapQuery,
        useSubAdminMapStudents: useGetSubAdminMapStudentsQuery,
        useSubAdminStudentSuburbsForMap:
            useGetSubAdminStudentSuburbsForMapQuery,
        useSubadminCourses: useSubadminCoursesQuery,
        useSavedCoordinates: useGetSavedCoordinatesQuery,
        useUpdateProfile: useUpdateSubAdminProfileMutation,
        changeSubAdminUserStatus: useChangeSubAdminUserStatusMutation,
        useSaveCoordinatesForMap: useSaveCoordinatesForMapMutation,
        useImportRtosList: useImportRtosListMutation,
        useRtosStatusChange: useRtosStatusChangeMutation,
        useAddRtoInListing: useAddRtoInListingMutation,
        useUpdateRtoListing: useUpdateRtoListingMutation,
        useDeleteRtoListing: useDeleteRtoListingMutation,
        useAllRtosList: useGetAllRtosListQuery,
        useHodCoordinatorsList: useGetHodCoordinatorsListQuery,
        useCoordinatorsDropDown: useGetCoordinatorsDropDownQuery,
        useDepartmentStudents: useGetDepartmentStudentsQuery,
        useDepartmentStudentsCount: useGetDepartmentStudentsCountQuery,
        useDepartmentPendingIndustries: useGetDepartmentPendingIndustriesQuery,
        useDepartmentCoursesRequestList:
            useGetDepartmentCoursesRequestListQuery,
        useDepartmentCourseRequest: useDepartmentCourseRequestMutation,
    },
    Todo: {
        todoListCount: useTodoListCountQuery,
    },
    Notes: {
        useList: useSubadminNotesQuery,
        useCreate: useNoteAddMutation,
        useDelete: useNoteDeleteMutation,
        useStatusChange: useSubadminNoteStatusChangeMutation,
    },

    Student: {
        useProblamaticStudent: useProblamaticStudentMutation,
        useCount: useSubAdminStudentCountQuery,
        useList: useGetSubAdminStudentsQuery,
        useRtoSubadminStudentsList: useGetRtoSubadminStudentsQuery,
        useSnoozedStudents: useGetSubAdminSnoozedStudentsQuery,
        useUrgentStudents: useGetSubAdminUrgentStudentsQuery,
        useCompletedStudents: useSubadminCompletedStudentsQuery,
        useSubAdminStudentList: useGetSubAdminTicketStudentsListQuery,
        assignCourse: useSubadminStudentAssignCoursesMutation,
        useMailPassword: useSendPasswordToStudentMailMutation,
        useGetRtoCoordinatorStudents: useGetRtoCoordinatorStudentsQuery,
        useMysStudentsCallLog: useGetSubAdminMyStudentsCallLogQuery,
        subadminStudentUnassignCourses:
            useSubadminStudentUnassignCoursesMutation,
        getCancelledWP: useGetStudentCancelledWPQuery,
        useNotContactable: useSetNotContactableMutation,
        useCalled: useCalledStudentMutation,
        useCourses: useGetSubAdminStudentCoursesQuery,
        useUpdateStudentDate: useUpdateStudentDateMutation,
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
        useSnoozeStudent: useSnoozeStudentMutation,
        useUnSnoozeStudent: useUnSnoozeStudentMutation,
        sendStudentMssage: useSendStudentMssageMutation,
        studentMessagesList: useGetStudentMessagesListQuery,
        workplaceIndustryDetail: useGetWorkplaceIndustryDetailQuery,
        workplaceStudentDetail: useGetWorkplaceStudentDetailQuery,
        getWorkplaceForSchedule: useGetWorkplaceForScheduleQuery,
    },
    LogBook: {
        useSaveLogbook: useSaveLogbookMutation,
        useStudentLogbook: useGetStudentLogbookQuery,
        useLogbookPagesCount: useGetStudentLogbookPagesCountQuery,
    },
    Industry: {
        useAddToPartner: useAddToPartnerMutation,
        useIndustryCallLog: useIndustryCallLogMutation,
        useGetIndustryCallLog: useGetIndustryCallLogQuery,
        useGetIndustryBranches: useGetIndustryBranchesQuery,
        useIndustryAnsweredCall: useIndustryAnsweredCallMutation,
        useRemoveIndustryBranch: useRemoveIndustryBranchMutation,
        changeIndustryAcceptingStatus:
            useChangeIndustryStudentsAcceptingStatusMutation,
        useStatusticsCount: useSubadminIndustryStatisticsCountQuery,
        useMakeIndustryHeadquarter: useMakeIndustryHeadquarterMutation,
        useRtoCoordinatorsIndustries: useGetRtoCoordinatorsIndustryQuery,
        useIndustryStudentsSchedule: useGetIndustryStudentsScheduleQuery,
        useRequestToAddCoursesToIndustry:
            useRequestToAddCoursesToIndustryMutation,
        useAddPrevCourseDescription: useAddPrevCourseDescriptionMutation,
        useIndustryRequestedCourses: useGetIndustryRequestedCoursesQuery,
        useIndustryCoursesOnAcceptance: useGetIndustryCoursesOnAcceptanceQuery,
        useRejectedDepartmentIndustry: useGetRejectedDepartmentIndustryQuery,
        useRejectedDepartmentIndustryCount:
            useGetRejectedDepartmentIndustryCountQuery,
        usePendingDepartmentIndustryCount:
            useGetPendingDepartmentIndustryCountQuery,
        usePreviousIndustryCourses: useGetPreviousIndustryCoursesQuery,
    },
    Rto: {
        useRtoStatsCount: useSubadminRtoStatisticsCountQuery,
        useImportStudentList: useSubadminRtoImportStudentsMutation,
        useRtosFilterList: useGetSubAdminRtosFilterListQuery,
        subadminRtoStatistics: useGetSubAdminRTOStatisticsQuery,
    },
    Workplace: {
        count: useWorkplaceCountQuery,
        useStudentWorkplaceAnswers: useGetStudentWorkplaceAnswersQuery,
        useWorkplaceAvailability: useGetStudentWorkplaceAvailabilityQuery,
        useStudentPlacementAnswers: useGetStudentWorkplacePlacementAnswersQuery,
        useViewMoreIndustries: useViewMoreIndustriesQuery,
        useChangeStatustoSigned: useChangeStatustoSignedMutation,
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
        useCancelRequestWP: useCancelRequestWorkplaceMutation,
        subadminCancelationRequest: useSubadminWpCancellationRequestsListQuery,
        useSendMeetingNotification: useSendMeetingNotificationMutation,
        contactWorkplaceIndustry: useContactWorkplaceIndustryMutation,
        removeWPApprovalReq: useRemoveWorkplaceRequestApprovalMutation,
        useSubAdminMapSuggestedIndustryDetail:
            useGetSubAdminMapSuggestedIndustryDetailQuery,
        useWorkplaceCourseIndustries: useGetWorkplaceCourseIndustriesQuery,
        changeWpReqStatus: useChangeWorkplaceApprovalReqStatusMutation,
        placementAndInsuranceDocNote:
            useGetWarningPlacementAndInsuranceDocNoteQuery,
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
    Volunteer: {
        useVolunteerRequests: useGetSubadminVolunteerRequestsQuery,
    },
    TalentPool: {
        useTalentPoolList: useGetSubAdminTalentPoolListQuery,
    },
}
