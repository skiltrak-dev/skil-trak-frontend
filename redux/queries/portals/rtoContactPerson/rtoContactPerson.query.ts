import { emptySplitApi } from '../empty.query'
import { studentsEndpoints } from './students'
const PREFIX = 'admin'

export const adminApi = emptySplitApi.injectEndpoints({
    // ---------- ADMIN ENDPOINTS ---------- //
    endpoints: (build) => ({
        ...studentsEndpoints(build),
    }),
    // overrideExisting: false,
})

const {
    // ------ ADMIN ------ //
    useGetRtoContactPersonStudentsQuery,
} = adminApi

export const RtoContactPersonApi = {
    Admin: {
        useStudents: useGetRtoContactPersonStudentsQuery,
    },
}
