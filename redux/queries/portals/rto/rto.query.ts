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

export const rtoApi = emptySplitApi.injectEndpoints({
    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoMyProfile: build.query<any, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTOCourses', 'RTO', 'Avatar', 'Profile'],
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
    useGetExportStudentListQuery,

    // --- WORKPLACES --- //
    useGetRTOWorkplacesQuery,
    useWpApprovalRequestQuery,
    useGetRTOWorkplaceDetailQuery,
    useWpApprovalRequestChangeStatusMutation,

    // ---- DOCUMENTS ---- //
    useGetRtoDocumentsQuery,
    useAddRtoDocumentsMutation,

    // ---- INSURANCE ---- //
    useGetRtoInsuranceTypeQuery,
    useUploadRtoInsuranceDocsMutation,
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
    },
    Students: {
        useCount: useStudentsCountQuery,
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
        wpAppReqChangeStatus: useWpApprovalRequestChangeStatusMutation,
    },
    Industry: {
        removeFromBlackList: useRemoveFromBlackListMutation,
        getBlackListedIndustries: useGetBlackListedIndustriesQuery,
    },
}
