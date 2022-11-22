import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { courseEndpoints } from './course'

import { rtoEndpoints } from './rto'
import { sectorEndpoints } from './sector'
import { studentEndpoints } from './student'
import { subAdminEndpoints } from './sub-admin'
import { subscriberEndpoints } from './subscribers'

export const adminApi = createApi({
   reducerPath: 'adminApi',
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_HOST}/`,
      prepareHeaders: (headers, { getState }) => {
         const token = AuthUtils.getToken()
         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }
         return headers
      },
   }),
   tagTypes: ['RTOS', 'Students', 'Subscribers', 'Sectors', 'SubAdmins'],

   // ---------- RTO ENDPOINTS ---------- //
   endpoints: (build) => ({
      ...rtoEndpoints(build),
      ...studentEndpoints(build),
      ...subscriberEndpoints(build),
      ...sectorEndpoints(build),
      ...courseEndpoints(build),
      ...subAdminEndpoints(build),
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
   useStudentStatusChangeMutation,
   useStudentRemoveMutation,

   useStudentSectorsQuery,
   useStudentAssignCoursesMutation,
   useStudentUnassignCoursesMutation,

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
      useChangeStatusMutation: useStudentStatusChangeMutation,
      useRemove: useStudentRemoveMutation,

      useSectors: useStudentSectorsQuery,
      useAssignCourses: useStudentAssignCoursesMutation,
      useUnassignCourses: useStudentUnassignCoursesMutation,
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
   SubAdmins: {
      useListQuery: useSubAdminsQuery,
   },
}
