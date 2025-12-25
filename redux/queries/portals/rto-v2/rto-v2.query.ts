import { apiSlice } from '../empty.query'
import { approvalRequestEndpoints } from './approval-request'
import { availableServicesEndpoints } from './availableServices'
import { coursesEndPoints } from './courses'
import { dashboardEndpoints } from './dashboard'
import { industriesEndpoints } from './industries'
import { placementRequestsEndPoints } from './placementRequests'
import { rtoIndustryCreditsEndpoints } from './rto-credits'
import { studentDocumentsEndpoints } from './student-documents'
import { studentsEndpoints } from './students'
import { studentsWorkplaceEndpoints } from './students-workplace'

export const rtoV2Api = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        ...coursesEndPoints(build),
        ...studentsEndpoints(build),
        ...dashboardEndpoints(build),
        ...industriesEndpoints(build),
        ...approvalRequestEndpoints(build),
        ...studentDocumentsEndpoints(build),
        ...placementRequestsEndPoints(build),
        ...availableServicesEndpoints(build),
        ...studentsWorkplaceEndpoints(build),
        ...rtoIndustryCreditsEndpoints(build),
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

    // ---- Industries ---- //
    useGetRtoIndustriesQuery,
    useSnoozeIndustryByIdMutation,
    useIndustryCoursesDetailsQuery,
    useGetRtoIndustryDetailQuery,
    useIndustryStudentsListQuery,
    useGetAllIndustriesListQuery,
    useIndustryStudentStatsQuery,
    useGetIndustriesCountsQuery,
    useCreateAvailabilityMutation,
    useAddSingleRtoIndustryMutation,
    useIndustryRtoChecklistListQuery,
    useAddBulkRtoIndustriesMutation,
    useIndustryUserStatusChangeMutation,
    useGetIndutryAvailableWorkingHoursQuery,
    useStatusChangeCourseFacilityChecklistMutation,
    useUpdateInterestedTypeMutation,
    useGetRtoIndustryDataCountQuery,

    // ---- RTO Credits ---- //
    useGetRtoCreditsQuery,
    useChangeRtoNetworkMutation,
    useCreateIndustryCreditMutation,
    useConfirmRtoWorkplacePaymentMutation,
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
    Industries: {
        getRtoIndustries: useGetRtoIndustriesQuery,
        snoozeIndustry: useSnoozeIndustryByIdMutation,
        getIndustriesCounts: useGetIndustriesCountsQuery,
        createAvailability: useCreateAvailabilityMutation,
        industryStudentsList: useIndustryStudentsListQuery,
        getAllIndustriesList: useGetAllIndustriesListQuery,
        getRtoIndustryDetail: useGetRtoIndustryDetailQuery,
        industryStudentStats: useIndustryStudentStatsQuery,
        addSingleRtoIndustry: useAddSingleRtoIndustryMutation,
        addBulkRtoIndustries: useAddBulkRtoIndustriesMutation,
        industryCoursesDetails: useIndustryCoursesDetailsQuery,
        industryRtoChecklistList: useIndustryRtoChecklistListQuery,
        industryUserStatusChange: useIndustryUserStatusChangeMutation,
        useGetIndutryAvailableHours: useGetIndutryAvailableWorkingHoursQuery,
        statusChangeCourseFacilityChecklist:
            useStatusChangeCourseFacilityChecklistMutation,
        updateInterestedType: useUpdateInterestedTypeMutation,
        getRtoIndustryDataCount: useGetRtoIndustryDataCountQuery,
    },
    RtoCredits: {
        getRtoCredits: useGetRtoCreditsQuery,
        changeRtoNetwork: useChangeRtoNetworkMutation,
        confirmPayment: useConfirmRtoWorkplacePaymentMutation,
        createIndustryCredit: useCreateIndustryCreditMutation,
    },
}
