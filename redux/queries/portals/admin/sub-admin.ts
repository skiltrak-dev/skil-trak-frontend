import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, SubAdmin, UserCount } from '@types'

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
    subAdminCount: builder.query<UserCount, void>({
        query: () => `${PREFIX}/subadmin/list/count`,
        providesTags: ['SubAdmins'],
    }),
})
