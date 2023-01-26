import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, SubAdmin, UserCount } from '@types'

const PREFIX = 'admin'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    filteredWorkplaces: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/filter`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    unAssignedSubAdmins: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/subadmin/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    unAssignedWorkplaceList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/unassigned/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    allStudentProvidedWorkplaceList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/provided-by-student/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    allRequestedWorkplaceList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/requested/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    assignedRequestList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/workplace-request/assigned/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    assignedWorkplace: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/subadmin/assign-workplace`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Workplaces'],
    }),
})
