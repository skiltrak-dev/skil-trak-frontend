import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { AdminStats, ContactPerson, PaginatedResponse, Rto } from '@types'
import { studentEndpoints } from './student'
import { contactPersonEndpoints } from './contactPerson'
import { coordinatorEndpoints } from './coordinator'
import { profileEndpoints } from './profile'

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
    tagTypes: ['RTO', 'ContactPersons', 'Rto-Students', 'Rto-Coordinators'],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<Rto, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTO'],
        }),
        dashboard: build.query<any, void>({
            query: () => `rtos/dashboard/count`,
            providesTags: ['RTO'],
        }),
        ...contactPersonEndpoints(build),
        ...studentEndpoints(build),
        ...coordinatorEndpoints(build),
        ...profileEndpoints(build),
    }),
})

const {
    // ------ SELF ------ //
    useProfileQuery,
    useDashboardQuery,
    useUpdateRTOProfileMutation,

    // ------ Contact Persons ------ //
    useContactPersonsQuery,
    useAddContactPersonMutation,
    useRemoveContactPersonMutation,
    useUpdateContactPersonMutation,

    // ------ STUDENT ------ //
    useStudentsImportMutation,
    useAddStudentMutation,

    // ------ COORDINATOR ------ //
    useGetRtoCoordinatorsQuery,
    useRemoveCoordinatorMutation,
    useCoordinatorCreateMutation,
    useGetRtoCoordinatorsDetailQuery,
} = rtoApi

export const RtoApi = {
    Rto: {
        useProfile: useProfileQuery,
        useContactPersons: useContactPersonsQuery,
        useDashboard: useDashboardQuery,
        useUpdateProfile: useUpdateRTOProfileMutation,
        useAddContactPerson: useAddContactPersonMutation,
        useRemoveContactPerson: useRemoveContactPersonMutation,
        useUpdateContactPerson: useUpdateContactPersonMutation,
    },
    Students: {
        useImportStudents: useStudentsImportMutation,
        useAddStudent: useAddStudentMutation,
    },
    Coordinator: {
        useCreate: useCoordinatorCreateMutation,
        useList: useGetRtoCoordinatorsQuery,
        useDetail: useGetRtoCoordinatorsDetailQuery,
        useRemove: useRemoveCoordinatorMutation,
    },
}
