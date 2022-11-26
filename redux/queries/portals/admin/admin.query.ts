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
import { AdminStats } from '@types'

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
    tagTypes: [
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
    }),
})

const {
    // ------ ADMIN ------ //
    useStatisticsQuery,

    // ------ RTO ------ //
    useRtoCountQuery,
    useRtosQuery,
    useRtoDetailQuery,
    useRtoStatusChangeMutation,
    useRtoRemoveMutation,

    useRtoSectorsQuery,
    useRtoAssignCoursesMutation,
    useRtoUnassignCourseMutation,

    useRtoSubAdminsQuery,
    useRtoAssignSubAdminsMutation,
    useRtoUnassignSubAdminsMutation,
    useRtoProfileDetailQuery,

    // ------ STUDENT ------ //
    useStudentCountQuery,
    useStudentsQuery,
    useStudentProfileQuery,
    useStudentStatusChangeMutation,
    useStudentRemoveMutation,

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
    useCreateSubAdminMutation,

    //------ WORKPLACE -----//
    useUnAssignedSubAdminsQuery,
    useAssignedWorkplaceMutation,
    useUnAssignedWorkplaceListQuery,

    // ------ NOTES ------ //
    useNotesQuery,
    useNotesPinnedQuery,
    useNoteCreateMutation,
    useNoteUpdateMutation,
    useNoteRemoveMutation,
    useNoteStatusChangeMutation,

    // -------Messages-------//
    useGetAdminMessagesQuery,

    // ------ FOLDERS ------ //
    useFolderAddMutation,
    useFolderUpdateMutation,
    useFolderRemoveMutation,

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
    },
    Rtos: {
        useCountQuery: useRtoCountQuery,
        useListQuery: useRtosQuery,
        useDetailQuery: useRtoDetailQuery,
        useChangeStatusMutation: useRtoStatusChangeMutation,
        useRemove: useRtoRemoveMutation,

        useSectors: useRtoSectorsQuery,
        useAssignCourses: useRtoAssignCoursesMutation,
        useUnassignCourses: useRtoUnassignCourseMutation,

        useSubAdmins: useRtoSubAdminsQuery,
        useAssignSubAdmin: useRtoAssignSubAdminsMutation,
        useUnAssignSubAdmin: useRtoUnassignSubAdminsMutation,
    },

    Students: {
        useCountQuery: useStudentCountQuery,
        useListQuery: useStudentsQuery,
        useProfile: useStudentProfileQuery,
        useChangeStatusMutation: useStudentStatusChangeMutation,
        useRemove: useStudentRemoveMutation,

        useSectors: useStudentSectorsQuery,
        useAssignCourses: useStudentAssignCoursesMutation,
        useUnassignCourses: useStudentUnassignCoursesMutation,
        studentsRequiredDocsDetail: useStudentsRequiredDocsDetailQuery,
        studentCourseDetail: useStudentCourseDetailQuery,
    },

    SubAdmins: {
        useListQuery: useSubAdminsQuery,
        useCountQuery: useSubAdminCountQuery,
        createSubAmin: useCreateSubAdminMutation,
    },
    Workplace: {
        useListQuery: useUnAssignedSubAdminsQuery,
        useWorkplaceListQuery: useUnAssignedWorkplaceListQuery,
        useWorkplaceMutation: useAssignedWorkplaceMutation,
    },

    Industries: {
        useListQuery: useIndustriesQuery,
        useCount: useIndustryCountQuery,
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

    Notes: {
        useList: useNotesQuery,
        usePinned: useNotesPinnedQuery,
        useCreate: useNoteCreateMutation,
        useUpdate: useNoteUpdateMutation,
        useRemove: useNoteRemoveMutation,
        useStatusChange: useNoteStatusChangeMutation,
    },

    Messages: {
        useList: useGetAdminMessagesQuery,
    },

    Folders: {
        useCreate: useFolderAddMutation,
        useUpdate: useFolderUpdateMutation,
        useRemove: useFolderRemoveMutation,
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
