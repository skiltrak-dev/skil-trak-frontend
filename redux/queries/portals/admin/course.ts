import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    UserCount,
    PaginatedResponse,
    Rto,
    UserStatus,
    Sector,
    Course,
} from '@types'

const PREFIX = 'admin'
export const courseEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    courses: builder.query<PaginatedResponse<Course>, any | undefined>({
        query: (params) => ({
            url: `${PREFIX}/course/list`,
            params,
        }),
        providesTags: ['Courses'],
    }),

    courseDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/course/view/${id}`,
        providesTags: ['Courses'],
    }),

    courseAdd: builder.mutation<any, Course>({
        query: (body) => ({
            url: `${PREFIX}/course/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Courses'],
    }),

    courseUpdate: builder.mutation<any, Course>({
        query: (body) => ({
            url: `${PREFIX}/course/update/${body.id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Courses'],
    }),

    courseRemove: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/course/delete/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Courses'],
    }),
})
