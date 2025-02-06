import { emptySplitApi } from '../empty.query'
import { studentsEndpoints } from './students'

export const observerApi = emptySplitApi.injectEndpoints({
    // ---------- ADMIN ENDPOINTS ---------- //
    endpoints: (build) => ({
        ...studentsEndpoints(build),
    }),
    // overrideExisting: false,
})

const {
    // ------ ADMIN ------ //
    useRtoObserverProfileQuery,
    useGetRtoContactPersonStudentsQuery,
    useRtoObserverProfileUpdateMutation,
} = observerApi

export const ObserverApi = {
    Students: {
        myProfile: useRtoObserverProfileQuery,
        useStudents: useGetRtoContactPersonStudentsQuery,
        useRtoObserverProfileUpdate: useRtoObserverProfileUpdateMutation,
    },
}
