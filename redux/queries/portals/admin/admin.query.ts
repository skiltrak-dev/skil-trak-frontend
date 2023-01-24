import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { courseEndpoints } from './course'
import { industryEndpoints } from './industry'

import { rtoEndpoints } from './rto'
import { sectorEndpoints } from './sector'
import { studentEndpoints } from './student'
import { subAdminEndpoints } from './sub-admin'
import { subscriberEndpoints } from './subscribers'
import { notesEndpoints } from './notes'
import { folderEndpoints } from './folder'
import { appointmentTypeEndpoints } from './appointment-type'
import { jobEndpoints } from './job'
import { workplaceEndpoints } from './workplace'
import { messagesEndpoints } from './messages'
import { profileEndpoints } from './profile'
import { AdminStats } from '@types'
import { useUpdateSubAdminProfileMutation } from '../sub-admin'

export const adminApi = createApi({
    reducerPath: 'adminApi',
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
    keepUnusedDataFor: 130,
    refetchOnMountOrArgChange: 30,
    refetchOnReconnect: true,
    // refetchOnFocus: true,
    tagTypes: [
        'Count',
        'Profile',
        'RTOS',
        'Students',
        'Subscribers',
        'Sectors',
        'SubAdmins',
        'Industries',
        'Notes',
        'Courses',
        'Folders',
        'AppointmentTypes',
        'Jobs',
        'Messages',
        'Statistics',
        'Workplaces',
    ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        statistics: build.query<AdminStats, void>({
            query: () => `admin/count`,
            providesTags: ['Statistics'],
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
    }),
})

const {
    // ------ ADMIN ------ //
    useStatisticsQuery,
    useGetProfileQuery,
    useUpdateAdminProfileMutation,

    // ------ RTO ------ //
    useRtoCountQuery,
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
    useIndustryCountQuery,
    useIndustriesQuery,
    useIndustryStatusChangeMutation,
    useIndustryRemoveMutation,
    useIndustryDetailQuery,
    useRplRequestListQuery,

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
    useSubAdminCountQuery,
    useSubAdminProfileCountQuery,
    useSubAdminProfileQuery,
    useCreateSubAdminMutation,
    useUpdateSubAdminMutation,

    useSubAdminCoursesQuery,
    useSubAdminAssignCoursesMutation,
    useSubAdminUnAssignCoursesMutation,

    useSubAdminRtosQuery,
    useSubAdminAssignRtoMutation,
    useSubAdminUnassignRtoMutation,

    //------ WORKPLACE -----//
    useUnAssignedSubAdminsQuery,
    useAssignedWorkplaceMutation,
    useUnAssignedWorkplaceListQuery,
    useAllStudentProvidedWorkplaceListQuery,
    useAllRequestedWorkplaceListQuery,
    useAssignedRequestListQuery,

    // -------Messages-------//
    useGetAdminMessagesQuery,
    useSendAdminMessageMutation,

    // ------ FOLDERS ------ //
    useFolderAddMutation,
    useFolderUpdateMutation,
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
} = adminApi

export const AdminApi = {
    Admin: {
        useCount: useStatisticsQuery,
        useProfile: useGetProfileQuery,
        useUpdateProfile: useUpdateAdminProfileMutation,
    },
    Rtos: {
        useCountQuery: useRtoCountQuery,
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

        useCourses: useSubAdminCoursesQuery,
        useAssignCourses: useSubAdminAssignCoursesMutation,
        useUnassignCourse: useSubAdminUnAssignCoursesMutation,

        useRtos: useSubAdminRtosQuery,
        useAssignRto: useSubAdminAssignRtoMutation,
        useUnassignRto: useSubAdminUnassignRtoMutation,
    },
    Workplace: {
        useListQuery: useUnAssignedSubAdminsQuery,
        useUnAssignedWorkplace: useUnAssignedWorkplaceListQuery,
        useWorkplaceMutation: useAssignedWorkplaceMutation,
        useAssignedWorkplace: useAssignedRequestListQuery,
        useRequestedWorkplace: useAllRequestedWorkplaceListQuery,
        useStudentProvidedWorkplace: useAllStudentProvidedWorkplaceListQuery,
    },

    Industries: {
        useListQuery: useIndustriesQuery,
        useCount: useIndustryCountQuery,
        useRplList: useRplRequestListQuery,
        useStatusChange: useIndustryStatusChangeMutation,
        useDetail: useIndustryDetailQuery,
        useRemove: useIndustryRemoveMutation,
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
}
