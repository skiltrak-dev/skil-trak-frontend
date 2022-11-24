import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, SubAdmin, UserCount } from '@types'

const PREFIX = 'admin'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    unAssignedSubAdmins: builder.query<any, any>({
        query: (params) => {
            return {
                url: `${PREFIX}/subadmin/list`,
                params,
            }
        },
        providesTags: ['Workplaces'],
    }),
    unAssignedWorkplaceList: builder.query<any, any>({
        query: () => {
            return {
                url: `${PREFIX}/workplace-request/unassigned/list`,
            }
        },
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
