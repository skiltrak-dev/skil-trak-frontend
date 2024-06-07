import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    Industry,
    PaginatedResponse,
    PaginationValues,
    PaginationWithSearch,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'admin/'
export const industryEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    industryStatisticsCount: builder.query<
        {
            capacity: number
            count: number
        },
        number
    >({
        query: (id) => `${PREFIX}industry/students/count/${id}`,
        providesTags: ['Industries'],
    }),

    industrySectors: builder.query<Course[], number>({
        query: (id) => `${PREFIX}industry/courses/${id}`,
        providesTags: ['Industries'],
    }),
    industryAssignCourses: builder.mutation<
        Industry,
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
        Industry,
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
    industries: builder.query<
        PaginatedResponse<Industry>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}industries/list`,
            params,
        }),
        providesTags: ['Industries'],
    }),
    snoozedIndustries: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}snoozed-industries`,
            params,
        }),
        providesTags: ['Industries'],
    }),

    industryStatusChange: builder.mutation<
        Industry,
        { id: number; status: UserStatus }
    >({
        query: ({ id, status }) => ({
            url: `${PREFIX}industries/status`,
            method: 'PATCH',
            params: { id },
            body: { status },
        }),
        invalidatesTags: ['Industries'],
    }),

    saveIndustryQuestions: builder.mutation<
        any,
        { id: number; questions: any }
    >({
        query: ({ id, questions }) => ({
            url: `approval-review-question/${id}`,
            method: 'POST',
            body: { questions },
        }),
        invalidatesTags: ['Industries'],
    }),

    getIndustryQuestions: builder.query<any, number>({
        query: (id) => `approval-review-question/${id}`,
        providesTags: ['Industries'],
    }),

    industryDetail: builder.query<Industry, number>({
        query: (id) => `${PREFIX}industries/${id}`,
        providesTags: ['Industries', 'SubAdminIndustries'],
    }),

    industryRemove: builder.mutation<Industry, number>({
        query: (id) => ({
            url: `${PREFIX}industry/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Industries'],
    }),

    industryStudents: builder.query<
        PaginatedResponse<Student>,
        { params: PaginationValues; industryId: number }
    >({
        query: ({ params, industryId }) => ({
            url: `${PREFIX}industry/students/list/${industryId}`,
            params,
        }),
        providesTags: ['Industries'],
    }),

    getIndutryAvailableHours: builder.query<any, number>({
        query: (id) => `${PREFIX}industry/${id}/working-hours/list`,
        providesTags: ['Industries'],
    }),
    addIndutryAvailableHours: builder.mutation<any, any>({
        query: ({ body, id }) => ({
            url: `${PREFIX}industry/${id}/working-hours/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),

    addIndustryShift: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}available-shift/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industries', 'AvailableShifts'],
    }),
    getIndustryShifts: builder.query<any, number>({
        query: (id) => `${PREFIX}available-shift/list/${id}`,
        providesTags: ['AvailableShifts'],
    }),
    removeIndustryShift: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}available-shift/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Industries', 'AvailableShifts'],
    }),
})
