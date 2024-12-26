import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    CourseWithAssessmentEvidence,
    PaginatedResponse,
    PaginationWithSearch,
} from '@types'

const PREFIX = 'admin'
export const wptypesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    wpTypes: builder.query<
        PaginatedResponse<Course>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/course/list`,
            params,
        }),
        providesTags: ['Courses'],
    }),

    wpTypeDetail: builder.query<CourseWithAssessmentEvidence, number>({
        query: (id) => `${PREFIX}/course/view/${id}`,
        providesTags: ['Courses'],
    }),

    addWpType: builder.mutation<Course, Course>({
        query: (body) => ({
            url: `${PREFIX}/course/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Courses'],
    }),

    updateWpType: builder.mutation<Course, Course>({
        query: (body) => ({
            url: `${PREFIX}/course/update/${body.id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Courses'],
    }),

    removeWpType: builder.mutation<Course, number>({
        query: (id) => ({
            url: `${PREFIX}/course/delete/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Courses'],
    }),
})
