import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    PaginatedResponse,
    PaginationValues,
    PaginationWithSearch,
    SubAdmin,
} from '@types'
import { AdminWorkplaceCount, IWorkplaceIndustries } from 'redux/queryTypes'

const PREFIX = 'admin'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    workplacesCount: builder.query<AdminWorkplaceCount, void>({
        query: () => `${PREFIX}/workplace-request/count`,
        providesTags: ['Workplaces'],
    }),
    filteredWorkplaces: builder.query<
        PaginatedResponse<IWorkplaceIndustries>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/filter`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    assignCourse: builder.mutation<
        IWorkplaceIndustries,
        { workplaceId: number; courseId: number }
    >({
        query: ({ workplaceId, courseId }) => ({
            url: `${PREFIX}/workplace-request/assign-course/${workplaceId}/${courseId}`,
            method: 'POST',
        }),
        invalidatesTags: ['Workplaces'],
    }),
    unAssignedSubAdmins: builder.query<IWorkplaceIndustries, SubAdmin>({
        query: (params) => ({
            url: `${PREFIX}/subadmin/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    unAssignedWorkplaceList: builder.query<
        PaginatedResponse<IWorkplaceIndustries>,
        PaginationValues
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/unassigned/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    allStudentProvidedWorkplaceList: builder.query<
        PaginatedResponse<IWorkplaceIndustries>,
        PaginationValues
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/provided-by-student/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    allRequestedWorkplaceList: builder.query<
        PaginatedResponse<IWorkplaceIndustries>,
        PaginationValues
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/requested/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    cancelledWorkplaces: builder.query<
        PaginatedResponse<IWorkplaceIndustries>,
        PaginationValues
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/list/cancelled`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    assignedRequestList: builder.query<
        PaginatedResponse<IWorkplaceIndustries>,
        PaginationValues
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/assigned/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    assignedWorkplace: builder.mutation<
        PaginatedResponse<IWorkplaceIndustries>,
        { subadmin: number; workplace: number }
    >({
        query: (body) => ({
            url: `${PREFIX}/subadmin/assign-workplace`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Workplaces'],
    }),
    getSubadminForAssignWorkplace: builder.query<SubAdmin[], void>({
        query: () => `${PREFIX}/subadmin/workplace/list`,
        providesTags: ['Workplaces'],
    }),
})
