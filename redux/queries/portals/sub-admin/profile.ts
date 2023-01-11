import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const profileEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    myProfile: builder.query<any, void>({
        query: () => `${PREFIX}/me/profile`,
        providesTags: ['SubAdmin'],
    }),
    updateSubAdminProfile: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/profile/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['SubAdmin'],
    }),
})
