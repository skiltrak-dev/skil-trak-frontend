import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

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

        contactPersons: build.query<PaginatedResponse<ContactPerson>, any>({
            query: (params: any) => {
                return {
                    url: `rtos/contact-persons`,
                    params,
                }
            },
            providesTags: ['ContactPersons'],
        }),
    }),
})

const {
    // ------ SELF ------ //
    useProfileQuery,

    useContactPersonsQuery,
} = rtoApi

export const RtoApi = {
    Rto: {
        useProfile: useProfileQuery,
        useContactPersons: useContactPersonsQuery,
    },
}
