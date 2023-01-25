import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, SubAdmin, UserCount } from '@types'

const PREFIX = 'admin'
export const volunteerEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getVolunteerRequests: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/volunteer-requests/list`,
            params,
        }),
        providesTags: ['Volunteer'],
    }),
})
