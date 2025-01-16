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
import { insuranceEndpoints } from './insurance'

export const rtoApi = emptySplitApi('rtoApi').injectEndpoints({
    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoMyProfile: build.query<any, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTOCourses', 'RTO', 'Avatar', 'Profile'],
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
        ...insuranceEndpoints(build),
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
    useRtoDashboardStudentsLogsListQuery,
    useDashboardQuery,
    useGetRtoMapIndustriesQuery,
    useUpdateRTOProfileMutation,

    // ------ Contact Persons ------ //
    useContactPersonsQuery,
    useAddContactPersonMutation,
    useRemoveContactPersonMutation,
    useUpdateContactPersonMutation,

    // ------ STUDENT ------ //
    useStudentsCountQuery,
    useGetRtoStudentsListQuery,
    useStudentsImportMutation,
    useAddStudentMutation,
    useRtoCompletedStudentsQuery,
    useSendVerificationCodeMutation,
    useCompareVerificationCodeMutation,
    useGetNotContactableStudentsQuery,
    useGetArchivedStudentsReportQuery,
    useGetCompletedWorkplaceReportQuery,
    useGetPlacementStartedReportQuery,
    useGetStudentsResultsReportQuery,
    useGetTerminatedWorkplaceReportQuery,

    // ------ COORDINATOR ------ //
    useGetRtoCoordinatorsQuery,
    useRemoveCoordinatorMutation,
    useCoordinatorCreateMutation,
    useCoordinatorUpdateMutation,
    useGetRtoCoordinatorsDetailQuery,
    useGetRtoAssignedCoordinatorsQuery,
    useGetRtoAssignedCoordinatorsListQuery,

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
    useUpdateCourseHoursMutation,
    useAddRtoCustomCourseRequirementsMutation,

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
    useGetRtoProblematicStudentsQuery,
    useChangeRTOStudentsStatusMutation,
    useGetNewStudentsReportQuery,
    useGetCancelledWorkplaceReportQuery,
    useGetBlockedStudentsReportQuery,
    useGetWorkplaceRequestsReportQuery,
    useGetWithoutWorkplaceReportQuery,
    useGetAppointmentsReportQuery,
    useGetReportedStudentsReportQuery,
    useAssignRtoCoordinatorToStudentsMutation,
    useAssignRtoCoordinatorToMultiStudentsMutation,
    useGetReportDownloadLinkQuery,
    useGetExportStudentListQuery,

    // --- WORKPLACES --- //
    useGetRTOWorkplacesQuery,
    useGetRTOWorkplaceDetailQuery,

    // ---- DOCUMENTS ---- //
    useGetRtoDocumentsQuery,
    useAddRtoDocumentsMutation,

    // ---- INSURANCE ---- //
    useGetRtoInsuranceTypeQuery,
    useUploadRtoInsuranceDocsMutation,
} = rtoApi

export const RtoApi = {
    Report: {
        useRtoWeelyReport: useRtoWeelyReportQuery,
    },
    Rto: {
        useProfile: useRtoMyProfileQuery,
        rtoStudentLogs: useRtoDashboardStudentsLogsListQuery,
        useContactPersons: useContactPersonsQuery,
        useDashboard: useDashboardQuery,
        rtoMapIndustries: useGetRtoMapIndustriesQuery,
        useUpdateProfile: useUpdateRTOProfileMutation,
        useAddContactPerson: useAddContactPersonMutation,
        useRemoveContactPerson: useRemoveContactPersonMutation,
        useUpdateContactPerson: useUpdateContactPersonMutation,
    },
    Students: {
        useCount: useStudentsCountQuery,
        useImportStudents: useStudentsImportMutation,
        useRtoStudentsList: useGetRtoStudentsListQuery,
        useAddStudent: useAddStudentMutation,
        useRtoCompletedStudents: useRtoCompletedStudentsQuery,
        useCompareCode: useCompareVerificationCodeMutation,
        useSendVerificationCode: useSendVerificationCodeMutation,
        useGetNotContactableStudents: useGetNotContactableStudentsQuery,
        useNewStudentsReport: useGetNewStudentsReportQuery,
        useProblematicStudentsList: useGetRtoProblematicStudentsQuery,
        useCancelledWorkplaceReport: useGetCancelledWorkplaceReportQuery,
        useBlockedStudentsReport: useGetBlockedStudentsReportQuery,
        useArchivedStudentsReport: useGetArchivedStudentsReportQuery,
        useCompletedWorkplaceReport: useGetCompletedWorkplaceReportQuery,
        usePlacementStartedReport: useGetPlacementStartedReportQuery,
        useStudentsResultsReport: useGetStudentsResultsReportQuery,
        useTerminatedWorkplaceReport: useGetTerminatedWorkplaceReportQuery,
        useWorkplaceRequestReport: useGetWorkplaceRequestsReportQuery,
        useWithoutWorkplaceReport: useGetWithoutWorkplaceReportQuery,
        useAppointmentsReport: useGetAppointmentsReportQuery,
        useReportedStudentsReport: useGetReportedStudentsReportQuery,
        useAssignCoordinatoToStudent: useAssignRtoCoordinatorToStudentsMutation,
        assignMultiStudentToCoordinator:
            useAssignRtoCoordinatorToMultiStudentsMutation,
        useReportDownloadLink: useGetReportDownloadLinkQuery,
        useExportStudentList: useGetExportStudentListQuery,
    },
    Coordinator: {
        useCreate: useCoordinatorCreateMutation,
        useUpdate: useCoordinatorUpdateMutation,
        useList: useGetRtoCoordinatorsQuery,
        useRtoAssignedCoordinators: useGetRtoAssignedCoordinatorsListQuery,
        useDetail: useGetRtoCoordinatorsDetailQuery,
        useAssignedCoordinators: useGetRtoAssignedCoordinatorsQuery,
        useRemove: useRemoveCoordinatorMutation,
    },
    Courses: {
        useRtoCourses: useGetRTOCoursesQuery,
        useUpdateCourseHours: useUpdateCourseHoursMutation,
        useAddRtoCustomCourseRequirements:
            useAddRtoCustomCourseRequirementsMutation,
    },
    RtoDocument: {
        useGetRtoDocuments: useGetRtoDocumentsQuery,
        useAddRtoDocuments: useAddRtoDocumentsMutation,
    },
    Insurance: {
        rtoInsuranceList: useGetRtoInsuranceTypeQuery,
        uploadInsuranceDocs: useUploadRtoInsuranceDocsMutation,
    },
}
