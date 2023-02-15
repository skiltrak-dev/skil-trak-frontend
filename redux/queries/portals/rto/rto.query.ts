import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { AdminStats, ContactPerson, PaginatedResponse, Rto } from '@types'
import { studentEndpoints } from './student'
import { contactPersonEndpoints } from './contactPerson'
import { coordinatorEndpoints } from './coordinator'
import { profileEndpoints } from './profile'
import { appointmentsEndpoints } from './appointments'
import { assessmentToolsEndpoints } from './assessmentTools'
import { coursesEndpoints } from './courses'
import { industriesEndpoints } from './industries'
import { mouEndpoints } from './mou'
import { workplaceEndpoints } from './workplace'

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
    tagTypes: [
        'RTO',
        'RTOMOU',
        'RTOCourses',
        'Rto-Students',
        'RTOWorkplace',
        'RTOIndustries',
        'ContactPersons',
        'RTOAppointment',
        'Rto-Coordinators',
        'RtoAssessmentToolsList',
    ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoProfile: build.query<Rto, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTO'],
        }),
        dashboard: build.query<any, void>({
            query: () => `rtos/dashboard/count`,
            providesTags: ['RTO'],
        }),
        ...mouEndpoints(build),
        ...profileEndpoints(build),
        ...coursesEndpoints(build),
        ...studentEndpoints(build),
        ...workplaceEndpoints(build),
        ...industriesEndpoints(build),
        ...coordinatorEndpoints(build),
        ...appointmentsEndpoints(build),
        ...contactPersonEndpoints(build),
        ...assessmentToolsEndpoints(build),
    }),
})

export const {
    // ------ SELF ------ //
    useRtoProfileQuery,
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

    // --- APPOINTMENTS --- //
    useGetRTOAppointmentsQuery,
    useGetCoordinatorsForRTOQuery,
    useCreateRTOAppointmentMutation,

    //  --- ASSESSMENT TOOLS --- //
    useGetAssessmentToolQuery,
    useGetAssessmentToolDetailQuery,
    useGetAssessmentToolByCourseQuery,
    useCreateRtoAssessmentToolsMutation,
    useUpdateAssessmentToolArchiveMutation,
    useRemoveRTOAssessmentToolsMutation,

    //  --- COURSES --- //
    useGetRTOCoursesQuery,

    // --- INDUSTRIES --- //
    useGetIndustriesListQuery,

    // --- MOU --- //
    useGetRtoMOUListQuery,
    useGetRtoMOUDetailQuery,
    useCreateMOUbyRTOMutation,
    useAcceptMOUbyRTOMutation,
    useCancelMOUByRTOMutation,
    useRejectMOUByRTOMutation,

    // --- STUDENTS --- //
    useGetRtoStudentsQuery,
    useRemoveRTOStudentMutation,
    useGetRtoStudentProfileQuery,
    useChangeRTOStudentsStatusMutation,

    // --- WORKPLACES --- //
    useGetRTOWorkplacesQuery,
    useGetRTOWorkplaceDetailQuery,
} = rtoApi

export const RtoApi = {
    Rto: {
        useProfile: useRtoProfileQuery,
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
    Courses: {
        useRtoCourses: useGetRTOCoursesQuery,
    },
}
