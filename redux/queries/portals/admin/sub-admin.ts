import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    Course,
    PaginatedResponse,
    PaginationWithSearch,
    Rto,
    SubAdmin,
    SubAdminProfileCount,
    SubadminCount,
    SubadminFromType,
    UserCount,
    ViewSummaryType,
} from '@types'

const PREFIX = 'admin'
export const subAdminEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    createSubAdmin: builder.mutation<SubAdmin, SubadminFromType>({
        query: (body) => ({
            url: `${PREFIX}/subadmin/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),
    updateSubAdmin: builder.mutation<
        SubAdmin,
        { id: number; userId: number; body: SubadminFromType }
    >({
        query: ({ id, userId, body }) => ({
            url: `${PREFIX}/subadmin/update/${id}/${userId}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),

    subAdmins: builder.query<
        PaginatedResponse<SubAdmin>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/subadmin/list`,
            params,
        }),
        providesTags: ['SubAdmins'],
    }),
    subAdminAsAdminList: builder.query<any, void>({
        query: () => ({
            url: `${PREFIX}/can-admin/list`,
        }),
        providesTags: ['SubAdmins'],
    }),
    subAdminProfile: builder.query<SubAdmin, number>({
        query: (id) => `${PREFIX}/subadmin/profile/${id}`,
        providesTags: ['SubAdmins'],
    }),

    subAdminCount: builder.query<SubadminCount, void>({
        query: () => `${PREFIX}/subadmin/list/count`,
        providesTags: ['SubAdmins'],
    }),

    subAdminProfileCount: builder.query<SubAdminProfileCount, number>({
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

    subAdminAssignCourses: builder.mutation<
        SubAdmin,
        { subadmin: number; courses: number[] }
    >({
        query: (body) => ({
            url: `${PREFIX}/subadmin/assign-course`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins', 'Rto-Coordinators'],
    }),

    subAdminUnAssignCourses: builder.mutation<
        SubAdmin,
        { id: number; courseId?: number; course?: number }
    >({
        query: (body) => ({
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

    subAdminAssignRto: builder.mutation<
        null,
        {
            subadmin: number
            rto: number
        }
    >({
        query: (body) => ({
            url: `${PREFIX}/subadmin/assignrto`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),

    subAdminUnassignRto: builder.mutation<
        { message: string },
        {
            id: number
            subAdmin: number
        }
    >({
        query: (body) => ({
            url: `${PREFIX}/rto/subadmin/remove/${body.id}`,
            params: { subadmin: body.subAdmin },
            method: 'DELETE',
            body,
        }),
        invalidatesTags: ['SubAdmins'],
    }),
    viewSummary: builder.query<ViewSummaryType, number>({
        query: (id) => `${PREFIX}/summary-report/generate/${id}`,
        providesTags: ['SubAdmins'],
    }),
    subadminRemove: builder.mutation<SubAdmin, number>({
        query: (id) => ({
            url: `${PREFIX}/user/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['SubAdmins'],
    }),
    toggleAutoWorkplaceAssignment: builder.mutation<any, number>({
        query: (id) => ({
            url: `admin/auto-assignment/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AutoAssignWorkplace'],
    }),
})
