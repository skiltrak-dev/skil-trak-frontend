import { apiSlice } from '../empty.query'
import { approvalRequestEndpoints } from './approval-request'
import { availableServicesEndpoints } from './availableServices'
import { coursesEndPoints } from './courses'
import { dashboardEndpoints } from './dashboard'
import { placementRequestsEndPoints } from './placementRequests'
import { studentDocumentsEndpoints } from './student-documents'
import { studentsEndpoints } from './students'
import { studentsWorkplaceEndpoints } from './students-workplace'

export const rtoV2Api = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        ...coursesEndPoints(build),
        ...studentsEndpoints(build),
        ...dashboardEndpoints(build),
        ...approvalRequestEndpoints(build),
        ...studentDocumentsEndpoints(build),
        ...placementRequestsEndPoints(build),
        ...availableServicesEndpoints(build),
        ...studentsWorkplaceEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    // Dashboard
    useAutoWpCountQuery,
    useAdminMessageQuery,
    useLast24HoursWpQuery,
    useRtoDashboardCountsQuery,

    // Available Services
    useGetPremiumFeaturesQuery,
    useSubmitAvailableServiceFormMutation,

    // Student Placement Requests
    useGetStudentPlacementRequestListQuery,
    useGetStudentPlacementRequestStatsQuery,
    useGetStudentPlacementProfileDetailsQuery,
    useGetStudentPlacementDetailsQuery,
    useGetStudentPlacementProgressQuery,
    useGetStudentPlacementIndustryDetailsQuery,
    useGetStudentPlacementCourseQuery,
    useGetIndustryPlacementHighlightedTasksQuery,
    useGetStudentPlacementComplianceQuery,
    useGetStudentPlacementCourseProgramsQuery,
    useGetStudentPlacementStatusCheckNotesQuery,

    // Courses
    useRtoCoursesQuery,
    useCreateRtoWpTypeMutation,
    useAddCourseDocumentMutation,
    useUpdateFacilityChecklistMutation,
    useUpdateAgreementFileMutation,
    useUpdateLogbookFileMutation,
    useUpdateCourseSummaryMutation,
    useAddCourseHighlightedTaskMutation,
    useRemoveCourseHighlightedTaskMutation,
    useAddAICourseDifferenceMutation,
    useRemoveAICourseDifferenceMutation,
    useGetCourseWorkplaceTypesQuery,
    useUpdateSupervisorRequirementsMutation,
    useSetupConfirmationPercentageQuery,

    // ---- Students ---- //
    useRtoStudentHistoryQuery,
    useImportStudentsMutation,
    useGetWpForAutoMatchingQuery,
    useStudentInfoMessageMutation,
    useGetStudentInfoMessagesQuery,
    useGetStudentTicketsCountQuery,
    useGetStudentAppointmentsCountQuery,
    useAddSingleStudentWithPlacementTypeMutation,
    useRunAutomationForAvailabeleStudentsMutation,

    // ---- Students Workplace ---- //
    useGetStudentWorkplaceListQuery,
    useGetStudentWorkplaceCountQuery,
    useGetStudentWorkplacesByCourseQuery,

    // ---- Approval Requests ---- //
    useGetWpProgramsQuery,
    useQuickReviewRequestQuery,
    useApprovalRequestDetailQuery,
    useGetRtoCourseChecklistQuery,
    useRtoApprovalRequestCourseQuery,
    useGetSkiltrakCourseChecklistQuery,
    useApprovalRequestSupervisorsQuery,
    useApprovalRequestHighlightedTasksQuery,

    // ---- Student Documents ---- //
    useFileStatusChangeMutation,
    useAllFilesStatusChangeMutation,
    useGetStudentDocumentsListQuery,
    useGetStudentDocumentFilesQuery,
    useGetStudentDocumentsCountQuery,
    useUploadStudentDocumentFileMutation,
} = rtoV2Api

export const RtoV2Api = {
    Dashboard: {
        autoWpCount: useAutoWpCountQuery,
        adminMessage: useAdminMessageQuery,
        last24HoursWp: useLast24HoursWpQuery,
        rtoDashboardCounts: useRtoDashboardCountsQuery,
    },
    AvailableServices: {
        premiumFeatures: useGetPremiumFeaturesQuery,
        submitAvailableService: useSubmitAvailableServiceFormMutation,
    },
    PlacementRequests: {
        useStudentPlacementRequestList: useGetStudentPlacementRequestListQuery,
        useStudentPlacementRequestStats:
            useGetStudentPlacementRequestStatsQuery,
        // Details
        useStudentPlacementProfileDetails:
            useGetStudentPlacementProfileDetailsQuery,
        useStudentPlacementDetails: useGetStudentPlacementDetailsQuery,
        useStudentPlacementProgress: useGetStudentPlacementProgressQuery,
        useStudentPlacementIndustryDetails:
            useGetStudentPlacementIndustryDetailsQuery,
        useStudentPlacementCourse: useGetStudentPlacementCourseQuery,
        useIndustryPlacementHighlightedTasks:
            useGetIndustryPlacementHighlightedTasksQuery,
        useStudentPlacementCompliance: useGetStudentPlacementComplianceQuery,
        useStudentPlacementCoursePrograms:
            useGetStudentPlacementCourseProgramsQuery,
        useStudentPlacementStatusCheckNotes:
            useGetStudentPlacementStatusCheckNotesQuery,
    },
    Courses: {
        rtoCourses: useRtoCoursesQuery,
        useAddCourseDocument: useAddCourseDocumentMutation,
        useUpdateFacilityChecklist: useUpdateFacilityChecklistMutation,
        createRtoWpType: useCreateRtoWpTypeMutation,
        useUpdateAgreementFile: useUpdateAgreementFileMutation,
        useUpdateLogbookFile: useUpdateLogbookFileMutation,
        useUpdateCourseSummary: useUpdateCourseSummaryMutation,
        useAddCourseHighlightedTask: useAddCourseHighlightedTaskMutation,
        useRemoveCourseHighlightedTask: useRemoveCourseHighlightedTaskMutation,
        useAddAICourseDifference: useAddAICourseDifferenceMutation,
        useRemoveAICourseDifference: useRemoveAICourseDifferenceMutation,
        useCourseWorkplaceTypes: useGetCourseWorkplaceTypesQuery,
        useUpdateSupervisorRequirements:
            useUpdateSupervisorRequirementsMutation,
        setupConfirmationPercentage: useSetupConfirmationPercentageQuery,
    },
    Students: {
        importStudents: useImportStudentsMutation,
        rtoStudentHistory: useRtoStudentHistoryQuery,
        studentInfoMessage: useStudentInfoMessageMutation,
        getWpForAutoMatching: useGetWpForAutoMatchingQuery,
        getStudentInfoMessages: useGetStudentInfoMessagesQuery,
        getStudentTicketsCount: useGetStudentTicketsCountQuery,
        getStudentAppointmentsCount: useGetStudentAppointmentsCountQuery,
        addIndividualStudent: useAddSingleStudentWithPlacementTypeMutation,
        runAutomationForAvailabeleStudents:
            useRunAutomationForAvailabeleStudentsMutation,
    },
    StudentsWorkplace: {
        getStudentWorkplaceList: useGetStudentWorkplaceListQuery,
        getStudentWorkplaceCount: useGetStudentWorkplaceCountQuery,
        getStudentWorkplacesByCourse: useGetStudentWorkplacesByCourseQuery,
    },
    ApprovalRequest: {
        getWpPrograms: useGetWpProgramsQuery,
        quickReviewRequest: useQuickReviewRequestQuery,
        approvalRequestDetail: useApprovalRequestDetailQuery,
        getRtoCourseChecklist: useGetRtoCourseChecklistQuery,
        highlightedTasks: useApprovalRequestHighlightedTasksQuery,
        rtoApprovalRequestCourse: useRtoApprovalRequestCourseQuery,
        getSkiltrakCourseChecklist: useGetSkiltrakCourseChecklistQuery,
        approvalRequestSupervisors: useApprovalRequestSupervisorsQuery,
    },
    StudentDocuments: {
        fileStatusChange: useFileStatusChangeMutation,
        allFilesStatusChange: useAllFilesStatusChangeMutation,
        getStudentDocumentsList: useGetStudentDocumentsListQuery,
        getStudentDocumentFiles: useGetStudentDocumentFilesQuery,
        getStudentDocumentsCount: useGetStudentDocumentsCountQuery,
        uploadStudentDocumentFile: useUploadStudentDocumentFileMutation,
    },
}
