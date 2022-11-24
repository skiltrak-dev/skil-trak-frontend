import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { UserCount, PaginatedResponse, Rto, UserStatus, Course } from '@types'

const PREFIX = 'admin'
export const rtoEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  rtoCount: builder.query<UserCount, void>({
    query: () => `${PREFIX}/rtos/count`,
    providesTags: ['RTOS'],
  }),

  rtos: builder.query<PaginatedResponse<Rto>, any>({
    query: (params: any) => {
      return {
        url: `${PREFIX}/rtos/list`,
        params,
      }
    },
    providesTags: ['RTOS'],
  }),

  rtoDetail: builder.query<Rto, number>({
    query: (id: number) => `${PREFIX}/rtos/view/${id}`,
    providesTags: ['RTOS'],
  }),

  rtoRemove: builder.mutation({
    query: (id: any) => ({
      // url: `${PREFIX}/rto/remove/${id}`,
      url: `${PREFIX}/users/remove/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['RTOS'],
  }),

  // RTO Portal
  rtoProfileDetail: builder.query({
    query: () => `rtos/profile/view`,
    providesTags: ['RTOS'],
  }),

  rtoStatusChange: builder.mutation<Rto, { id: number; status: UserStatus }>({
    query: ({ id, status }) => {
      return {
        url: `${PREFIX}/rtos/status`,
        method: 'PATCH',
        params: { id },
        body: { status },
      }
    },
    invalidatesTags: ['RTOS'],
  }),

  rtoSectors: builder.query<Course[], number>({
    query: (id) => `admin/rtos/course/${id}`,
    providesTags: ['RTOS'],
  }),

  rtoAssignCourses: builder.mutation({
    query: (body: any) => {
      return {
        url: `${PREFIX}/rtos/course/add`,
        method: 'POST',
        body,
      }
    },
    invalidatesTags: ['RTOS'],
  }),

  rtoUnassignCourse: builder.mutation({
    query: (body: any) => ({
      url: `admin/rtos/course/delete/${body.courseId}`,
      params: { rto: body.rtoId },
      method: 'DELETE',
    }),
    invalidatesTags: ['RTOS'],
  }),

  rtoSubAdmins: builder.query<Rto, number>({
    query: (id) => `admin/rto/subadmin/${id}`,
    providesTags: ['RTOS'],
  }),

  rtoAssignSubAdmins: builder.mutation({
    query: (body: any) => {
      return {
        url: `admin/rtos/subadmin/assign`,
        method: 'POST',
        body,
      }
    },
    invalidatesTags: ['RTOS'],
  }),

  rtoUnassignSubAdmins: builder.mutation({
    query: (body: any) => ({
      url: `admin/rto/subadmin/remove/${body.rtoId}`,
      params: { subadmin: body.subAdmin },
      method: 'DELETE',
    }),
    invalidatesTags: ['RTOS'],
  }),
})
