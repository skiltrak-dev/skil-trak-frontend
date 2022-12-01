import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { contactPersonEndpoints } from './contactPerson'

import { AdminStats, ContactPerson, PaginatedResponse, Rto } from '@types'

export const rtoApi = createApi({
    reducerPath: 'rto',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['RTO', 'ContactPersons'],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<Rto, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTO'],
        }),
        ...contactPersonEndpoints(build),
    }),
})

const {
    // ------ SELF ------ //
    useProfileQuery,
    useContactPersonsQuery,
    useAddContactPersonMutation,
    useRemoveContactPersonMutation,
    useUpdateContactPersonMutation,
} = rtoApi

export const RtoApi = {
    Rto: {
        useProfile: useProfileQuery,
        useContactPersons: useContactPersonsQuery,
        useAddContactPerson: useAddContactPersonMutation,
        useRemoveContactPerson: useRemoveContactPersonMutation,
        useUpdateContactPerson: useUpdateContactPersonMutation,
    },
}
