import { mouEndpoints } from './mou'
import { coursesEndpoints } from './courses'
import { profileEndpoints } from './profile'
import { studentEndpoints } from './student'
import { emptySplitApi } from '../empty.query'
import { workplaceEndpoints } from './workplace'
import { insuranceEndpoints } from './insurance'
import { industriesEndpoints } from './industries'
import { coordinatorEndpoints } from './coordinator'
import { appointmentsEndpoints } from './appointments'
import { contactPersonEndpoints } from './contactPerson'
import { rtoDocumentsEndpoints } from './rtoDocuments'
import { assessmentToolsEndpoints } from './assessmentTools'
import { submissionsEndpoints } from './submissions'

export const rtoApi = emptySplitApi('rtoApi').injectEndpoints({
    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoMyProfile: build.query<any, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTOCourses', 'RTO', 'Avatar', 'Profile', 'RTOS'],
        }),
        dashboard: build.query<any, void>({
            query: () => `rtos/dashboard/count`,
            providesTags: ['RTO'],
        }),

        rtoWeelyReport: build.query<any, void>({
            query: () => `rtos/weekly-report/list`,
            providesTags: ['RTO'],
        }),

        ...mouEndpoints(build),
        ...profileEndpoints(build),
        ...coursesEndpoints(build),
        ...studentEndpoints(build),
        ...workplaceEndpoints(build),
        ...insuranceEndpoints(build),
        ...industriesEndpoints(build),
        ...submissionsEndpoints(build),
        ...coordinatorEndpoints(build),
        ...appointmentsEndpoints(build),
        ...rtoDocumentsEndpoints(build),
        ...contactPersonEndpoints(build),
        ...assessmentToolsEndpoints(build),
    }),
    // overrideExisting: true,
})

export const {
    // ---- REPORT ----- //
    useRtoWeelyReportQuery,

    // ------ SELF ------ //
    useRtoMyProfileQuery,
    useRtoDashboardStudentsLogsListQuery,
    useDashboardQuery,
    useGetRtoMapIndustriesQuery,
    useUpdateRTOProfileMutation,
    useGetRtoProgressByCourseQuery,
    useGetRtoSelfPaymentQuery,

    // ------ Contact Persons ------ //
    useContactPersonsQuery,
    useAddContactPersonMutation,
    useRemoveContactPersonMutation,
    useUpdateContactPersonMutation,

    // ------ STUDENT ------ //
    useStudentsCountQuery,
    useGetRtoStudentsListQuery,
    useUpdateReportedStudentCommentMutation,
    useGetIncompleteSubmissionStudentsQuery,
    useStudentsImportMutation,
    useAddStudentMutation,
    useRtoCompletedStudentsQuery,
    useSendVerificationCodeMutation,
    useCompareVerificationCodeMutation,
    useGetNotContactableStudentsQuery,
    useGetArchivedStudentsReportQuery,
    useGetCompletedWorkplaceReportQuery,
    useGetPlacementStartedReportQuery,
    useGetStudentsResultsReportQuery,
    useGetTerminatedWorkplaceReportQuery,
    useGetRtoReportedStudentsListQuery,

    // ------ COORDINATOR ------ //
    useGetRtoCoordinatorsQuery,
    useRemoveCoordinatorMutation,
    useCoordinatorCreateMutation,
    useCoordinatorUpdateMutation,
    useGetRtoCoordinatorsDetailQuery,
    useGetRtoAssignedCoordinatorsQuery,
    useGetRtoAssignedCoordinatorsListQuery,
    useHasAccessAllStudentsMutation,

    // --- APPOINTMENTS --- //
    useGetRTOAppointmentsQuery,
    useGetCoordinatorsForRTOQuery,
    useCreateRTOAppointmentMutation,

    //  --- ASSESSMENT TOOLS --- //
    useGetAssessmentToolQuery,
    useGetAssessmentToolDetailQuery,
    useGetAssessmentToolByCourseQuery,
    useCreateRtoAssessmentToolsMutation,
    useUpdateAssessmentToolArchiveMutation,
    useRemoveRTOAssessmentToolsMutation,

    //  --- COURSES --- //

    useGetRTOCoursesQuery,
    useAddRtoCourseInfoMutation,
    useUpdateCourseHoursMutation,
    useAddRtoCustomCourseRequirementsMutation,

    // --- INDUSTRIES --- //
    useGetIndustriesListQuery,
    useRemoveFromBlackListMutation,
    useGetBlackListedIndustriesQuery,

    // --- MOU --- //
    useGetRtoMOUListQuery,
    useGetRtoMOUDetailQuery,
    useCreateMOUbyRTOMutation,
    useAcceptMOUbyRTOMutation,
    useCancelMOUByRTOMutation,
    useRejectMOUByRTOMutation,

    // --- STUDENTS --- //
    useGetRtoStudentsQuery,
    useGetRtoResolveIssuesStudentsQuery,
    useRtoResolveIssueMutation,
    useGetRtoResolveIssuesStudentsCountQuery,
    useRemoveRTOStudentMutation,
    useGetRtoStudentProfileQuery,
    useGetRtoProblematicStudentsQuery,
    useChangeRTOStudentsStatusMutation,
    useGetNewStudentsReportQuery,
    useGetCancelledWorkplaceReportQuery,
    useGetBlockedStudentsReportQuery,
    useGetWorkplaceRequestsReportQuery,
    useGetWithoutWorkplaceReportQuery,
    useGetAppointmentsReportQuery,
    useGetReportedStudentsReportQuery,
    useAssignRtoCoordinatorToStudentsMutation,
    useAssignRtoCoordinatorToMultiStudentsMutation,
    useGetReportDownloadLinkQuery,
    useGetRtoMyReportDownloadQuery,
    useGetExportStudentListQuery,

    // --- WORKPLACES --- //
    useGetRTOWorkplacesQuery,
    useWpApprovalRequestQuery,
    useWpApprovalRequestByStatusQuery,
    useGetRTOWorkplaceDetailQuery,
    useWpApprovalRequestCountQuery,
    useWpApprovalRequestChangeStatusMutation,

    // ---- DOCUMENTS ---- //
    useGetRtoDocumentsQuery,
    useAddRtoDocumentsMutation,

    // ---- INSURANCE ---- //
    useGetRtoInsuranceTypeQuery,
    useUploadRtoInsuranceDocsMutation,

    // ---- SUBMISSIONS ---- //
    useGetRtoSubmissionsQuery,
    useGetRtoSubmissionsCountQuery,
    useChangeRtoSubmissionStatusMutation,
} = rtoApi

export const RtoApi = {
    Report: {
        useRtoWeelyReport: useRtoWeelyReportQuery,
    },
    Rto: {
        useProfile: useRtoMyProfileQuery,
        rtoStudentLogs: useRtoDashboardStudentsLogsListQuery,
        useContactPersons: useContactPersonsQuery,
        useDashboard: useDashboardQuery,
        rtoMapIndustries: useGetRtoMapIndustriesQuery,
        useUpdateProfile: useUpdateRTOProfileMutation,
        useAddContactPerson: useAddContactPersonMutation,
        useRemoveContactPerson: useRemoveContactPersonMutation,
        useUpdateContactPerson: useUpdateContactPersonMutation,
        useRtoProgressByCourse: useGetRtoProgressByCourseQuery,
        useRtoSelfPayment: useGetRtoSelfPaymentQuery,
    },
    Students: {
        useCount: useStudentsCountQuery,
        useRtoResolveIssuesStudents: useGetRtoResolveIssuesStudentsQuery,
        useRtoResolveIssuesStudentsCount:
            useGetRtoResolveIssuesStudentsCountQuery,
        useRtoResolveIssue: useRtoResolveIssueMutation,
        useImportStudents: useStudentsImportMutation,
        useRtoStudentsList: useGetRtoStudentsListQuery,
        useAddStudent: useAddStudentMutation,
        useRtoCompletedStudents: useRtoCompletedStudentsQuery,
        useCompareCode: useCompareVerificationCodeMutation,
        useSendVerificationCode: useSendVerificationCodeMutation,
        useGetNotContactableStudents: useGetNotContactableStudentsQuery,
        useNewStudentsReport: useGetNewStudentsReportQuery,
        useProblematicStudentsList: useGetRtoProblematicStudentsQuery,
        useCancelledWorkplaceReport: useGetCancelledWorkplaceReportQuery,
        useBlockedStudentsReport: useGetBlockedStudentsReportQuery,
        useArchivedStudentsReport: useGetArchivedStudentsReportQuery,
        useCompletedWorkplaceReport: useGetCompletedWorkplaceReportQuery,
        usePlacementStartedReport: useGetPlacementStartedReportQuery,
        useStudentsResultsReport: useGetStudentsResultsReportQuery,
        useTerminatedWorkplaceReport: useGetTerminatedWorkplaceReportQuery,
        useWorkplaceRequestReport: useGetWorkplaceRequestsReportQuery,
        useWithoutWorkplaceReport: useGetWithoutWorkplaceReportQuery,
        useAppointmentsReport: useGetAppointmentsReportQuery,
        useReportedStudentsReport: useGetReportedStudentsReportQuery,
        useAssignCoordinatoToStudent: useAssignRtoCoordinatorToStudentsMutation,
        assignMultiStudentToCoordinator:
            useAssignRtoCoordinatorToMultiStudentsMutation,
        useReportDownloadLink: useGetReportDownloadLinkQuery,
        getRtoMyReportDownload: useGetRtoMyReportDownloadQuery,
        useExportStudentList: useGetExportStudentListQuery,
        useRtoReportedStudentsList: useGetRtoReportedStudentsListQuery,
        useUpdateReportedStudentComment:
            useUpdateReportedStudentCommentMutation,
        incompleteSubmissionStudents: useGetIncompleteSubmissionStudentsQuery,
    },
    Coordinator: {
        useCreate: useCoordinatorCreateMutation,
        useUpdate: useCoordinatorUpdateMutation,
        useList: useGetRtoCoordinatorsQuery,
        useRtoAssignedCoordinators: useGetRtoAssignedCoordinatorsListQuery,
        useDetail: useGetRtoCoordinatorsDetailQuery,
        useAssignedCoordinators: useGetRtoAssignedCoordinatorsQuery,
        useRemove: useRemoveCoordinatorMutation,
        useHasAccessAllStudents: useHasAccessAllStudentsMutation,
    },
    Courses: {
        useRtoCourses: useGetRTOCoursesQuery,
        addRtoCourseInfo: useAddRtoCourseInfoMutation,
        useUpdateCourseHours: useUpdateCourseHoursMutation,
        useAddRtoCustomCourseRequirements:
            useAddRtoCustomCourseRequirementsMutation,
    },
    RtoDocument: {
        useGetRtoDocuments: useGetRtoDocumentsQuery,
        useAddRtoDocuments: useAddRtoDocumentsMutation,
    },
    Insurance: {
        rtoInsuranceList: useGetRtoInsuranceTypeQuery,
        uploadInsuranceDocs: useUploadRtoInsuranceDocsMutation,
    },
    Workplace: {
        wpApprovalRequest: useWpApprovalRequestQuery,
        wpApprovalRequestCount: useWpApprovalRequestCountQuery,
        wpApprovalRequestByStatus: useWpApprovalRequestByStatusQuery,
        wpAppReqChangeStatus: useWpApprovalRequestChangeStatusMutation,
    },
    Industry: {
        removeFromBlackList: useRemoveFromBlackListMutation,
        getBlackListedIndustries: useGetBlackListedIndustriesQuery,
    },
    Submissions: {
        getRtoSubmissions: useGetRtoSubmissionsQuery,
        getRtoSubmissionsCount: useGetRtoSubmissionsCountQuery,
        changeSubmissionStatus: useChangeRtoSubmissionStatusMutation,
    },
}
