import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { industriesEndpoints } from './industries'
import { AdminStats } from '@types'

export const commonApi = createApi({
    reducerPath: 'commonApi',
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
    tagTypes: ['RTOS'],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        ...industriesEndpoints(build),
    }),
})

const {
    // ------ Industry ------ //
    useGetAllIndustriesQuery,
} = commonApi

export const CommonApi = {
    Admin: {
        useIndustries: useGetAllIndustriesQuery,
    },
}
