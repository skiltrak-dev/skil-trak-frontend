import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Course, PaginatedResponse, Rto, SubAdmin, UserCount } from '@types'
import { RouteType } from 'next/dist/lib/load-custom-routes'

const PREFIX = 'admin'
export const subAdminEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    createSubAdmin: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/subadmin/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),

    subAdmins: builder.query<PaginatedResponse<SubAdmin>, any>({
        query: (params) => {
            return {
                url: `${PREFIX}/subadmin/list`,
                params,
            }
        },
        providesTags: ['SubAdmins'],
    }),

    subAdminProfile: builder.query<SubAdmin, number>({
        query: (id) => {
            return {
                url: `${PREFIX}/subadmin/profile/${id}`,
            }
        },
        providesTags: ['SubAdmins'],
    }),

    subAdminCount: builder.query<UserCount, void>({
        query: () => `${PREFIX}/subadmin/list/count`,
        providesTags: ['SubAdmins'],
    }),

    subAdminCourses: builder.query<Course[], number>({
        query: (id) => `${PREFIX}/subadmin/${id}/courses`,
        providesTags: ['SubAdmins'],
    }),

    subAdminAssignCourses: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/subadmin/assign-course`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),

    subAdminUnAssignCourses: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/sub-admin/course/un-assign/${body.id}`,
            method: 'POST',
            body: { course: body.course },
        }),
        invalidatesTags: ['SubAdmins'],
    }),

    subAdminRtos: builder.query<Rto[], number>({
        query: (id) => `${PREFIX}/subadmin/${id}/rtos`,
        providesTags: ['SubAdmins'],
    }),

    subAdminAssignRto: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/subadmin/assignrto`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),

    subAdminUnassignRto: builder.mutation({
        query: (body: any) => ({
            url: `rto/subadmin/remove/${body.id}`,
            method: 'DELETE',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),
})
