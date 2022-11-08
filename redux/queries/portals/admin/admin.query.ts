import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { rtoEndpoints } from './rto'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_HOST}/admin`,
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
        ...rtoEndpoints(build),
    }),
})

const {
    useRtosCountQuery,
    useRtosListQuery,
    useGetActiveRtosListQuery,
    useGetArchivedRtosListQuery,
    useGetPendingRtosListQuery,
    useGetRejectedRtosListQuery,
    useGetBlockedRtosListQuery,
    useGetRTODetailQuery,
    useGetSectorsForRTOQuery,
    useAssignSectorsMutation,
    useGetRTOSubAdminsQuery,

    useChangeRtoStatusMutation,
    useRemoveAssignedCoursesMutation,
    useRemoveAssignedSubAdminsMutation,
    useAssignSubAdminsMutation,
    useRemoveRtoMutation,
    useGetRTOProfileDetailQuery,
} = adminApi

export const AdminApi = {
    rto: {
        useRtosCountQuery,
        useRtosListQuery,
    },
}
