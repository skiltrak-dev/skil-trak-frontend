import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { industriesEndpoints } from './industries'
import { rtosEndpoints } from './rtos'
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
        ...rtosEndpoints(build),
    }),
})

const {
    // ------ Industry ------ //
    useGetAllIndustriesQuery,

    useGetAllRtosQuery,
} = commonApi

export const CommonApi = {
    Filter: {
        useIndustries: useGetAllIndustriesQuery,
        useRtos: useGetAllRtosQuery,
    },
}
