import { emptySplitApi } from '../empty.query'
import { appointmentsEndpoints } from './appointments'
import { assessmentToolsEndpoints } from './assessmentTools'
import { contactPersonEndpoints } from './contactPerson'
import { coordinatorEndpoints } from './coordinator'
import { coursesEndpoints } from './courses'
import { industriesEndpoints } from './industries'
import { rtoDocumentsEndpoints } from './rtoDocuments'
import { mouEndpoints } from './mou'
import { profileEndpoints } from './profile'
import { studentEndpoints } from './student'
import { workplaceEndpoints } from './workplace'

export const rtoApi = emptySplitApi.injectEndpoints({
    // export const rtoApi = createApi({
    //     reducerPath: 'rto',
    //     baseQuery: fetchBaseQuery({
    //         baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
    //         prepareHeaders: (headers, { getState }) => {
    //             const token = AuthUtils.getToken()
    //             if (token) {
    //                 headers.set('authorization', `Bearer ${token}`)
    //             }
    //             return headers
    //         },
    //     }),
    //     tagTypes: [
    //         'RTO',
    //         'RTOMOU',
    //         'RTOCourses',
    //         'Rto-Students',
    //         'RTOWorkplace',
    //         'RTOIndustries',
    //         'ContactPersons',
    //         'RTOAppointment',
    //         'Rto-Coordinators',
    //         'RtoAssessmentToolsList',
    //     ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoMyProfile: build.query<any, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTO', 'Avatar', 'Profile'],
        }),
        dashboard: build.query<any, void>({
            query: () => `rtos/dashboard/count`,
            providesTags: ['RTO'],
        }),

        rtoWeelyReport: build.query<any, void>({
            query: () => `rtos/weekly-report/list`,
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
        ...rtoDocumentsEndpoints(build),
        ...contactPersonEndpoints(build),
        ...assessmentToolsEndpoints(build),
    }),
    // overrideExisting: true,
})

export const {
    // ---- REPORT ----- //
    useRtoWeelyReportQuery,

    // ------ SELF ------ //
    useRtoMyProfileQuery,
    useDashboardQuery,
    useUpdateRTOProfileMutation,

    // ------ Contact Persons ------ //
    useContactPersonsQuery,
    useAddContactPersonMutation,
    useRemoveContactPersonMutation,
    useUpdateContactPersonMutation,

    // ------ STUDENT ------ //
    useStudentsCountQuery,
    useStudentsImportMutation,
    useAddStudentMutation,
    useGetNotContactableStudentsQuery,
    useGetArchivedStudentsReportQuery,
    useGetCompletedWorkplaceReportQuery,
    useGetTerminatedWorkplaceReportQuery,

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
    useGetNewStudentsReportQuery,
    useGetCancelledWorkplaceReportQuery,
    useGetBlockedStudentsReportQuery,
    useGetWorkplaceRequestsReportQuery,
    useGetWithoutWorkplaceReportQuery,
    useGetAppointmentsReportQuery,
    useGetReportedStudentsReportQuery,
    useGetReportDownloadLinkQuery,
    useGetExportStudentListQuery,

    // --- WORKPLACES --- //
    useGetRTOWorkplacesQuery,
    useGetRTOWorkplaceDetailQuery,

    // ---- DOCUMENTS ---- //
    useGetRtoDocumentsQuery,
    useAddRtoDocumentsMutation,
} = rtoApi

export const RtoApi = {
    Report: {
        useRtoWeelyReport: useRtoWeelyReportQuery,
    },
    Rto: {
        useProfile: useRtoMyProfileQuery,
        useContactPersons: useContactPersonsQuery,
        useDashboard: useDashboardQuery,
        useUpdateProfile: useUpdateRTOProfileMutation,
        useAddContactPerson: useAddContactPersonMutation,
        useRemoveContactPerson: useRemoveContactPersonMutation,
        useUpdateContactPerson: useUpdateContactPersonMutation,
    },
    Students: {
        useCount: useStudentsCountQuery,
        useImportStudents: useStudentsImportMutation,
        useAddStudent: useAddStudentMutation,
        useGetNotContactableStudents: useGetNotContactableStudentsQuery,
        useNewStudentsReport: useGetNewStudentsReportQuery,
        useCancelledWorkplaceReport: useGetCancelledWorkplaceReportQuery,
        useBlockedStudentsReport: useGetBlockedStudentsReportQuery,
        useArchivedStudentsReport: useGetArchivedStudentsReportQuery,
        useCompletedWorkplaceReport: useGetCompletedWorkplaceReportQuery,
        useTerminatedWorkplaceReport: useGetTerminatedWorkplaceReportQuery,
        useWorkplaceRequestReport: useGetWorkplaceRequestsReportQuery,
        useWithoutWorkplaceReport: useGetWithoutWorkplaceReportQuery,
        useAppointmentsReport: useGetAppointmentsReportQuery,
        useReportedStudentsReport: useGetReportedStudentsReportQuery,
        useReportDownloadLink: useGetReportDownloadLinkQuery,
        useExportStudentList: useGetExportStudentListQuery,
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
    RtoDocument: {
        useGetRtoDocuments: useGetRtoDocumentsQuery,
        useAddRtoDocuments: useAddRtoDocumentsMutation,
    },
}
