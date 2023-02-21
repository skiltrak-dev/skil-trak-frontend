import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    Industry,
    PaginatedResponse,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'admin/'
export const industryEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    industrySectors: builder.query<Course[], number>({
        query: (id) => `${PREFIX}industry/courses/${id}`,
        providesTags: ['Industries'],
    }),
    industryAssignCourses: builder.mutation<
        any,
        { user: number; courses: number[] }
    >({
        query: (body) => ({
            url: `${PREFIX}industry/course/assign`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
    industryUnassignCourse: builder.mutation<
        any,
        { courseId: number; industryId: number }
    >({
        query: (body) => ({
            url: `${PREFIX}industry/course/un-assign/${body.courseId}`,
            params: { industry: body.industryId },
            method: 'DELETE',
        }),
        invalidatesTags: ['Industries'],
    }),
    industryCount: builder.query<UserCount, void>({
        query: () => `${PREFIX}industries/list/count`,
        providesTags: ['Industries'],
    }),
    industries: builder.query<PaginatedResponse<any>, any>({
        query: (params: any) => {
            return {
                url: `${PREFIX}industries/list`,
                params,
            }
        },
        providesTags: ['Industries'],
    }),

    industryStatusChange: builder.mutation<
        any,
        { id: number; status: UserStatus }
    >({
        query: ({ id, status }) => {
            return {
                url: `${PREFIX}industries/status`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }
        },
        invalidatesTags: ['Industries'],
    }),

    industryDetail: builder.query<Industry, number>({
        query: (id) => `${PREFIX}industries/${id}`,
        providesTags: ['Industries'],
    }),

    industryRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}industry/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Industries'],
    }),
})
