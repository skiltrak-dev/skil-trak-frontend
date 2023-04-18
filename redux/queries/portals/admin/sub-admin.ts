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
    updateSubAdmin: builder.mutation({
        query: ({ id, body }) => ({
            url: `${PREFIX}/subadmin/update/${id}`,
            method: 'PATCH',
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

    subAdminProfileCount: builder.query<any, number>({
        query: (id) => ({
            url: `subadmin/dashboard/count`,
            params: { user: id },
        }),
        providesTags: ['SubAdmins'],
    }),

    subAdminCourses: builder.query<Course[], number>({
        query: (id) => `${PREFIX}/subadmin/${id}/courses`,
        providesTags: ['SubAdmins', 'Rto-Coordinators'],
    }),

    subAdminAssignCourses: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/subadmin/assign-course`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins', 'Rto-Coordinators'],
    }),

    subAdminUnAssignCourses: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}/sub-admin/course/un-assign/${body.id}`,
            method: 'POST',
            params: { course: body.course },
        }),
        invalidatesTags: ['SubAdmins', 'Rto-Coordinators'],
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
            url: `${PREFIX}/rto/subadmin/remove/${body.id}`,
            params: { subadmin: body.subAdmin },
            method: 'DELETE',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),
    viewSummary: builder.query<any, number>({
        query: (id) => `${PREFIX}/summary-report/generate/${id}`,
        providesTags: ['SubAdmins'],
    }),
    subadminRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/user/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['SubAdmins'],
    }),
})
