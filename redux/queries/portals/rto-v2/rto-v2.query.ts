import { emptySplitApi } from '../empty.query'
import { availableServicesEndpoints } from './availableServices'
import { dashboardEndpoints } from './dashboard'

export const rtoV2Api = emptySplitApi('rtoV2Api').injectEndpoints({
    endpoints: (build) => ({
        ...dashboardEndpoints(build),
        ...availableServicesEndpoints(build),
    }),
    // overrideExisting: true,
})

const {
    // Dashboard
    useAutoWpCountQuery,
    useLast24HoursWpQuery,
    useRtoDashboardCountsQuery,

    // Available Services
    useGetPremiumFeaturesQuery,
    useSubmitAvailableServiceFormMutation,
} = rtoV2Api

export const RtoV2Api = {
    Dashboard: {
        autoWpCount: useAutoWpCountQuery,
        last24HoursWp: useLast24HoursWpQuery,
        rtoDashboardCounts: useRtoDashboardCountsQuery,
    },
    AvailableServices: {
        premiumFeatures: useGetPremiumFeaturesQuery,
        submitAvailableService: useSubmitAvailableServiceFormMutation,
    },
}
