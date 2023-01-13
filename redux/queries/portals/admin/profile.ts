import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const profileEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getProfile: builder.query<any, void>({
        query: () => `${PREFIX}/profile/get`,
        providesTags: ['Profile'],
    }),
    updateAdminProfile: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/profile/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Profile'],
    }),
})
