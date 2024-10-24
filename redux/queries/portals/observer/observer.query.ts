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
    useGetRtoContactPersonStudentsQuery,
} = observerApi

export const ObserverApi = {
    Admin: {
        useStudents: useGetRtoContactPersonStudentsQuery,
    },
}
