import { emptySplitApi } from '../empty.query'
import { availableServicesEndpoints } from './availableServices'
import { dashboardEndpoints } from './dashboard'
import { studentsEndpoints } from './students'

export const rtoV2Api = emptySplitApi('rtoV2Api').injectEndpoints({
    endpoints: (build) => ({
        ...studentsEndpoints(build),
        ...dashboardEndpoints(build),
        ...availableServicesEndpoints(build),
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

    // ---- Students ---- //
    useRtoStudentHistoryQuery,
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
    Students: {
        rtoStudentHistory: useRtoStudentHistoryQuery,
    },
}
