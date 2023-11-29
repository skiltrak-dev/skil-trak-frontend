import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const impersonationEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    impersonationToggle: builder.mutation<any, void>({
        query: () => ({
            url: `subadmin/imparsonation/toggle`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Impersonation', 'SubAdmin'],
    }),
    allowAsAdmin: builder.mutation<any, number>({
        query: (id) => ({
            url: `admin/can-admin/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Impersonation'],
    }),
})
