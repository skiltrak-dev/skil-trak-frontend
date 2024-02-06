import { VolunteerRequestEnum } from '@partials'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    PaginatedResponse,
    PaginationWithSearch,
    VolunteerRequest,
} from '@types'

const PREFIX = 'subadmin/'
export const subadminVolunteerEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getSubadminVolunteerRequests: builder.query<
        PaginatedResponse<VolunteerRequest>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}volunteer-request/list`,
            params,
        }),
        providesTags: ['Volunteer'],
    }),
    // requestVolunteerCount: builder.query<any, void>({
    //     query: () => `${PREFIX}volunteer-requests/count`,
    //     providesTags: ['Volunteer'],
    // }),
    // volunteerIsRead: builder.mutation<any, void>({
    //     query: () => ({
    //         url: `${PREFIX}volunteer/read`,
    //         method: 'PATCH',
    //     }),
    //     invalidatesTags: ['Volunteer'],
    // }),
    changeSubadminVolunteerRequestStatus: builder.mutation<
        any,
        { id: number; note: string; status: VolunteerRequestEnum }
    >({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}volunteer-request/${id}/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Volunteer'],
    }),
})
