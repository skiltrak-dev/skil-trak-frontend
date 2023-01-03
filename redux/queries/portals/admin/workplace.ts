import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, SubAdmin, UserCount } from '@types'

const PREFIX = 'admin'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    unAssignedSubAdmins: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/subadmin/list`,
            params,
        }),
        providesTags: ['Workplaces'],
    }),
    unAssignedWorkplaceList: builder.query<any, void>({
        query: () => `${PREFIX}/workplace-request/unassigned/list`,
        providesTags: ['Workplaces'],
    }),
    allStudentProvidedWorkplaceList: builder.query<any, void>({
        query: () => `${PREFIX}/workplace-request/provided-by-student/list`,
        providesTags: ['Workplaces'],
    }),
    allRequestedWorkplaceList: builder.query<any, void>({
        query: () => `${PREFIX}/workplace-request/requested/list`,
        providesTags: ['Workplaces'],
    }),
    assignedRequestList: builder.query<any, void>({
        query: () => `${PREFIX}/workplace-request/assigned/list`,
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
