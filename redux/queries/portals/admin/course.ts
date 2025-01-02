import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    UserCount,
    PaginatedResponse,
    Rto,
    UserStatus,
    Sector,
    Course,
    PaginationWithSearch,
    CourseWithAssessmentEvidence,
} from '@types'

const PREFIX = 'admin'
export const courseEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    courses: builder.query<
        PaginatedResponse<Course>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/course/list`,
            params,
        }),
        providesTags: ['Courses'],
    }),

    courseDetail: builder.query<CourseWithAssessmentEvidence, number>({
        query: (id) => `${PREFIX}/course/view/${id}`,
        providesTags: ['Courses'],
    }),

    courseAdd: builder.mutation<Course, Course>({
        query: (body) => ({
            url: `${PREFIX}/course/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Courses'],
    }),

    courseUpdate: builder.mutation<Course, Course>({
        query: (body) => ({
            url: `${PREFIX}/course/update/${body.id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Courses'],
    }),

    courseRemove: builder.mutation<Course, number>({
        query: (id) => ({
            url: `${PREFIX}/course/delete/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Courses'],
    }),

    selectedWpTypes: builder.query<
        PaginatedResponse<Course>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/workplace/types-list`,
            params,
        }),
        providesTags: ['WorkplaceTypes'],
    }),

    addWpTypesToCourse: builder.mutation<Course, number>({
        query: (id) => ({
            url: `${PREFIX}/course/wp-type/delete/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Courses'],
    }),
    removeWpTypesFromCourse: builder.mutation<Course, number>({
        query: (id) => ({
            url: `${PREFIX}/course/wp-type/delete/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Courses'],
    }),
})
