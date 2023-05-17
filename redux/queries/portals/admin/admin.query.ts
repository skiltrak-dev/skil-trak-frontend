import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { courseEndpoints } from './course'
import { industryEndpoints } from './industry'

import { AdminStats } from '@types'
import { appointmentTypeEndpoints } from './appointment-type'
import { documentsEndpoints } from './documents'
import { folderEndpoints } from './folder'
import { jobEndpoints } from './job'
import { messagesEndpoints } from './messages'
import { notesEndpoints } from './notes'
import { profileEndpoints } from './profile'
import { rtoEndpoints } from './rto'
import { sectorEndpoints } from './sector'
import { studentEndpoints } from './student'
import { subAdminEndpoints } from './sub-admin'
import { subscriberEndpoints } from './subscribers'
import { volunteerEndpoints } from './volunteer'
import { workplaceEndpoints } from './workplace'
import { industryRplEndpoints } from './industyRpl'
import { emptySplitApi } from '../empty.query'

const PREFIX = 'admin'

export const adminApi = emptySplitApi.injectEndpoints({
    // export const adminApi = createApi({
    //     reducerPath: 'adminApi',
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
    // keepUnusedDataFor: 200,
    // refetchOnMountOrArgChange: 100,
    // refetchOnReconnect: true,
    //     // refetchOnFocus: true,
    //     tagTypes: [
    //         'Count',
    //         'Profile',
    //         'RTOS',
    //         'Students',
    //         'Subscribers',
    //         'Sectors',
    //         'SubAdmins',
    //         'Industries',
    //         'Notes',
    //         'Courses',
    //         'Folders',
    //         'AppointmentTypes',
    //         'Jobs',
    //         'Messages',
    //         'Statistics',
    //         'Workplaces',
    //         'SMS',
    //         'Documents',
    //         'RPL',
    //     ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        statistics: build.query<AdminStats, void>({
            query: () => `${PREFIX}/count`,
            providesTags: ['Statistics'],
        }),

        sendSMS: build.mutation<any, { number: number; message: string }>({
            query: (body) => ({
                url: `${PREFIX}/sms/send`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SMS'],
        }),

        ...rtoEndpoints(build),
        ...studentEndpoints(build),
        ...subscriberEndpoints(build),
        ...sectorEndpoints(build),
        ...courseEndpoints(build),
        ...subAdminEndpoints(build),
        ...industryEndpoints(build),
        ...notesEndpoints(build),
        ...folderEndpoints(build),
        ...appointmentTypeEndpoints(build),
        ...jobEndpoints(build),
        ...workplaceEndpoints(build),
        ...messagesEndpoints(build),
        ...profileEndpoints(build),
        ...volunteerEndpoints(build),
        ...documentsEndpoints(build),
        ...industryRplEndpoints(build),
    }),
    // overrideExisting: false,
})

const {
    // ------ ADMIN ------ //
    useStatisticsQuery,
    useGetProfileQuery,
    useUpdateAdminProfileMutation,

    // ------ RTO ------ //
    useRtoCountQuery,
    useRtoStatisticsCountQuery,
    useRtosQuery,
    useRtosApprovedQuery,
    useRtoDetailQuery,
    useRtoStatusChangeMutation,
    useRtoRemoveMutation,
    useRtoCreateAssessmentToolsMutation,
    useRtoUpdateAssessmentToolsMutation,
    useRtoRemoveAssessmentToolsMutation,
    useRtoAssessmentToolArchiveMutation,
    useCheckStudentEmailMutation,

    useRtoSectorsQuery,
    useRtoAssignCoursesMutation,
    useRtoUnassignCourseMutation,
    useRtoImportStudentsMutation,
    useRtoImportStudentExistingEmailCheckMutation,
    useRtoAddStudentMutation,

    useRtoSubAdminsQuery,
    useRtoAssignSubAdminsMutation,
    useRtoUnassignSubAdminsMutation,
    useRtoProfileSubAdminsQuery,
    useRtoProfileDetailQuery,

    useRtoAssessmentToolsQuery,

    // ------ STUDENT ------ //
    useStudentCountQuery,
    useStudentsQuery,
    useStudentProfileQuery,
    useStudentStatusChangeMutation,
    useStudentRemoveMutation,

    useFilteredStudentsQuery,

    useStudentSectorsQuery,
    useStudentAssignCoursesMutation,
    useStudentUnassignCoursesMutation,

    useStudentsRequiredDocsDetailQuery,
    useStudentCourseDetailQuery,
    useStudentUpcomingAppointmentsQuery,

    // ------ INDUSTRY ------ //
    useIndustryStatisticsCountQuery,
    useIndustriesQuery,
    useIndustryCountQuery,
    useIndustryDetailQuery,
    useIndustrySectorsQuery,
    useIndustryRemoveMutation,
    useIndustryStudentsQuery,
    useIndustryStatusChangeMutation,
    useIndustryAssignCoursesMutation,
    useIndustryUnassignCourseMutation,

    // ----- RPL ----- //
    useRplRequestListQuery,
    useRplDeleteMutation,

    // ------ SECTOR ------ //
    useSectorsQuery,
    useSectorDetailQuery,
    useSectorAddMutation,
    useSectorUpdateMutation,
    useSectorRemoveMutation,

    // ------ COURSES ------ //
    useCoursesQuery,
    useCourseDetailQuery,
    useCourseAddMutation,
    useCourseUpdateMutation,
    useCourseRemoveMutation,

    // ------ SUBSCRIBERS ------ //
    useListSubscribersQuery,
    useResubscribeMutation,
    useUnsubscribeMutation,

    // ------ SUB ADMINS ------ //
    useSubAdminsQuery,
    useViewSummaryQuery,
    useSubAdminCountQuery,
    useSubAdminProfileQuery,
    useSubadminRemoveMutation,
    useCreateSubAdminMutation,
    useUpdateSubAdminMutation,
    useSubAdminProfileCountQuery,

    useSubAdminCoursesQuery,
    useSubAdminAssignCoursesMutation,
    useSubAdminUnAssignCoursesMutation,

    useSubAdminRtosQuery,
    useSubAdminAssignRtoMutation,
    useSubAdminUnassignRtoMutation,

    //------ WORKPLACE -----//
    useWorkplacesCountQuery,
    useAssignCourseMutation,
    useFilteredWorkplacesQuery,
    useCancelledWorkplacesQuery,
    useUnAssignedSubAdminsQuery,
    useAssignedRequestListQuery,
    useAssignedWorkplaceMutation,
    useUnAssignedWorkplaceListQuery,
    useAllRequestedWorkplaceListQuery,
    useGetSubadminForAssignWorkplaceQuery,
    useAllStudentProvidedWorkplaceListQuery,

    // -------Messages-------//
    useGetAdminMessagesQuery,
    useSendAdminMessageMutation,

    // ------ FOLDERS ------ //
    useFolderAddMutation,
    useFolderUpdateMutation,
    useAssessmentEvidenceUpdateMutation,
    useFolderRemoveMutation,
    useIndustryChecklistAddMutation,
    useAssessmentEvidenceAddMutation,
    useRemoveAssessmentMutation,

    // ------ APPOINTMENT TYPES ------ //
    useAppointmentTypesQuery,
    useAppointmentTypeDetailQuery,
    useAppointmentTypeAddMutation,
    useAppointmentTypeRemoveMutation,
    useAppointmentTypeUpdateMutation,

    // ------ JOBS ------ //
    useJobsQuery,
    useJobStatusChangeMutation,

    // --- VOLUNTEER --- //
    useGetVolunteerRequestsQuery,

    // ----- SMS ----- //
    useSendSMSMutation,

    // ---- DOCUMENTS ---- //
    useAddDocumentsMutation,
    useGetDocumentsQuery,
} = adminApi

export const AdminApi = {
    Admin: {
        useCount: useStatisticsQuery,
        useProfile: useGetProfileQuery,
        useUpdateProfile: useUpdateAdminProfileMutation,
    },
    Rtos: {
        useCountQuery: useRtoCountQuery,
        useStatisticsCount: useRtoStatisticsCountQuery,
        useListQuery: useRtosQuery,
        useApprovedList: useRtosApprovedQuery,
        useDetailQuery: useRtoDetailQuery,
        useChangeStatusMutation: useRtoStatusChangeMutation,
        useRemove: useRtoRemoveMutation,
        useCreateAssessmentTools: useRtoCreateAssessmentToolsMutation,
        useUpdateAssessmentTools: useRtoUpdateAssessmentToolsMutation,
        useRemoveAssessmentTools: useRtoRemoveAssessmentToolsMutation,
        useArchiveAssessmentTools: useRtoAssessmentToolArchiveMutation,
        useRtoImportStudents: useRtoImportStudentsMutation,
        useRtoAddStudent: useRtoAddStudentMutation,
        useRtoStudentAccountCheck:
            useRtoImportStudentExistingEmailCheckMutation,
        useCheckStudentEmail: useCheckStudentEmailMutation,

        useSectors: useRtoSectorsQuery,
        useAssignCourses: useRtoAssignCoursesMutation,
        useUnassignCourses: useRtoUnassignCourseMutation,

        useSubAdmins: useRtoSubAdminsQuery,
        useAssignSubAdmin: useRtoAssignSubAdminsMutation,
        useUnAssignSubAdmin: useRtoUnassignSubAdminsMutation,
        useRtoProfileSubAdmins: useRtoProfileSubAdminsQuery,

        useRtoAssessmentTools: useRtoAssessmentToolsQuery,
    },

    Students: {
        useCountQuery: useStudentCountQuery,
        useListQuery: useStudentsQuery,
        useProfile: useStudentProfileQuery,
        useChangeStatusMutation: useStudentStatusChangeMutation,
        useRemove: useStudentRemoveMutation,

        useFilteredStudents: useFilteredStudentsQuery,

        useSectors: useStudentSectorsQuery,
        useAssignCourses: useStudentAssignCoursesMutation,
        useUnassignCourses: useStudentUnassignCoursesMutation,
        studentsRequiredDocsDetail: useStudentsRequiredDocsDetailQuery,
        studentCourseDetail: useStudentCourseDetailQuery,
    },

    SubAdmins: {
        useListQuery: useSubAdminsQuery,
        useCountQuery: useSubAdminCountQuery,
        useProfileCount: useSubAdminProfileCountQuery,
        createSubAmin: useCreateSubAdminMutation,
        useRtoProfile: useSubAdminProfileQuery,
        useUpdate: useUpdateSubAdminMutation,
        useRemove: useSubadminRemoveMutation,

        useCourses: useSubAdminCoursesQuery,
        useAssignCourses: useSubAdminAssignCoursesMutation,
        useUnassignCourse: useSubAdminUnAssignCoursesMutation,

        useRtos: useSubAdminRtosQuery,
        useAssignRto: useSubAdminAssignRtoMutation,
        useUnassignRto: useSubAdminUnassignRtoMutation,
        useSummary: useViewSummaryQuery,
    },
    Workplace: {
        workplacesCount: useWorkplacesCountQuery,
        assignCourse: useAssignCourseMutation,
        useListQuery: useUnAssignedSubAdminsQuery,
        cancelledWorkplaces: useCancelledWorkplacesQuery,
        useUnAssignedWorkplace: useUnAssignedWorkplaceListQuery,
        useWorkplaceMutation: useAssignedWorkplaceMutation,
        useAssignedWorkplace: useAssignedRequestListQuery,
        useRequestedWorkplace: useAllRequestedWorkplaceListQuery,
        useStudentProvidedWorkplace: useAllStudentProvidedWorkplaceListQuery,
        useFilteredWorkplaces: useFilteredWorkplacesQuery,
        subadminForAssignWorkplace: useGetSubadminForAssignWorkplaceQuery,
    },

    Industries: {
        useStatisticsCount: useIndustryStatisticsCountQuery,
        useIndustrySectors: useIndustrySectorsQuery,
        useListQuery: useIndustriesQuery,
        useAssignCourses: useIndustryAssignCoursesMutation,
        useUnassignCourses: useIndustryUnassignCourseMutation,
        useCount: useIndustryCountQuery,
        useStatusChange: useIndustryStatusChangeMutation,
        useDetail: useIndustryDetailQuery,
        useRemove: useIndustryRemoveMutation,
        industryStudents: useIndustryStudentsQuery,
    },

    Rpl: {
        useRplList: useRplRequestListQuery,
        useRemoveRpl: useRplDeleteMutation,
    },

    Subscribers: {
        useListQuery: useListSubscribersQuery,
        useResubscribeMutation,
        useUnsubscribeMutation,
    },

    Sectors: {
        useListQuery: useSectorsQuery,
        useDetailQuery: useSectorDetailQuery,
        useAddMutation: useSectorAddMutation,
        useUpdateMutation: useSectorUpdateMutation,
        useRemoveMutation: useSectorRemoveMutation,
    },

    Courses: {
        useListQuery: useCoursesQuery,
        useDetailQuery: useCourseDetailQuery,
        useAddMutation: useCourseAddMutation,
        useUpdateMutation: useCourseUpdateMutation,
        useRemoveMutation: useCourseRemoveMutation,
    },

    Messages: {
        useList: useGetAdminMessagesQuery,
        useSendMessage: useSendAdminMessageMutation,
    },

    Folders: {
        useCreate: useFolderAddMutation,
        useUpdate: useFolderUpdateMutation,
        useAssessMentUpdate: useAssessmentEvidenceUpdateMutation,
        useRemove: useFolderRemoveMutation,
        useRemoveAssessment: useRemoveAssessmentMutation,
        useIndustryChecklistAdd: useIndustryChecklistAddMutation,
        useAssessMentEvidence: useAssessmentEvidenceAddMutation,
    },

    AppointmentTypes: {
        useList: useAppointmentTypesQuery,
        useDetail: useAppointmentTypeDetailQuery,
        useCreate: useAppointmentTypeAddMutation,
        useUpdate: useAppointmentTypeUpdateMutation,
        useRemove: useAppointmentTypeRemoveMutation,
    },

    Jobs: {
        useList: useJobsQuery,
        useStatusChange: useJobStatusChangeMutation,
    },
    Volunteer: {
        useList: useGetVolunteerRequestsQuery,
    },
    SMS: {
        sendSMS: useSendSMSMutation,
    },
    Documents: {
        addDocuments: useAddDocumentsMutation,
        useGetDocuments: useGetDocumentsQuery,
    },
}
