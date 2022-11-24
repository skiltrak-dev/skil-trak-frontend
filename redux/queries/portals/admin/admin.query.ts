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
  ],

  // ---------- RTO ENDPOINTS ---------- //
  endpoints: (build) => ({
    ...rtoEndpoints(build),
    ...studentEndpoints(build),
    ...subscriberEndpoints(build),
    ...sectorEndpoints(build),
    ...courseEndpoints(build),
    ...subAdminEndpoints(build),
    ...industryEndpoints(build),
    ...notesEndpoints(build),
  }),
})

const {
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

  // ------ NOTES ------ //
  useNotesQuery,
  useNotesPinnedQuery,
  useNoteCreateMutation,
  useNoteUpdateMutation,
  useNoteRemoveMutation,
  useNoteStatusChangeMutation,
} = adminApi

export const AdminApi = {
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
    studentUpcomingAppointments: useStudentUpcomingAppointmentsQuery,
  },

  SubAdmins: {
    useListQuery: useSubAdminsQuery,
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
}
