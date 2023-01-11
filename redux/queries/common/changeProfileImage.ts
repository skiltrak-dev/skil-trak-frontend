import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = `users`

export const changeProfileImageEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    changeProfile: builder.mutation<any, any | null>({
        query: ({ body }) => ({
            url: `${PREFIX}/avatar/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Avatar'],
    }),
})
