import { emptySplitApi } from '../empty.query'
import { availableServicesEndpoints } from './availableServices'
import { dashboardEndpoints } from './dashboard'
import { placementRequestsEndPoints } from './placementRequests'
import { studentsEndpoints } from './students'
import { coursesEndPoints } from './courses'

export const rtoV2Api = emptySplitApi('rtoV2Api').injectEndpoints({
    endpoints: (build) => ({
        ...studentsEndpoints(build),
        ...dashboardEndpoints(build),
        ...availableServicesEndpoints(build),
        ...placementRequestsEndPoints(build),
        ...coursesEndPoints(build),
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

    // ---- Students ---- //
    useRtoStudentHistoryQuery,
    useImportStudentsMutation,
    useGetWpForAutoMatchingQuery,
    useAddSingleStudentWithPlacementTypeMutation,
    useRunAutomationForAvailabeleStudentsMutation,
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
        useAddCourseDocument: useAddCourseDocumentMutation,
        useUpdateFacilityChecklist: useUpdateFacilityChecklistMutation,
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
    },
    Students: {
        importStudents: useImportStudentsMutation,
        rtoStudentHistory: useRtoStudentHistoryQuery,
        getWpForAutoMatching: useGetWpForAutoMatchingQuery,
        addIndividualStudent: useAddSingleStudentWithPlacementTypeMutation,
        runAutomationForAvailabeleStudents:
            useRunAutomationForAvailabeleStudentsMutation,
    },
}
