import { VolunteerRequestEnum } from '@partials'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    PaginatedResponse,
    PaginationWithSearch,
    VolunteerRequest,
} from '@types'

const PREFIX = 'admin/'
export const studentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRtoContactPersonStudents: builder.query<
        PaginatedResponse<VolunteerRequest>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}volunteer-requests/list/asjdashbd`,
            params,
        }),
        providesTags: ['Volunteer'],
    }),
})
