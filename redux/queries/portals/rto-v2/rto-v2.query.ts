import { apiSlice } from '../empty.query'
import { availableServicesEndpoints } from './availableServices'
import { coursesEndPoints } from './courses'
import { dashboardEndpoints } from './dashboard'
import { placementRequestsEndPoints } from './placementRequests'
import { studentsEndpoints } from './students'

export const rtoV2Api = apiSlice.injectEndpoints({
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
