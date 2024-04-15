import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const allowLoginEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    allowAsLogin: builder.mutation<any, number>({
        query: (id) => ({
            url: `admin/user/${id}/after-hours-access/toggle`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Impersonation', 'SubAdmins'],
    }),
})
