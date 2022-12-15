import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    PaginatedResponse,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'admin/'
export const studentEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    studentCount: builder.query<UserCount, void>({
        query: () => `${PREFIX}student/list/count`,
        providesTags: ['Students'],
    }),
    students: builder.query<PaginatedResponse<any>, any>({
        query: (params: any) => {
            return {
                url: `${PREFIX}students/list`,
                params,
            }
        },
        providesTags: ['Students'],
    }),

    filteredStudents: builder.query<PaginatedResponse<any>, any>({
        query: (params: any) => {
            return {
                url: `${PREFIX}students/filter`,
                params,
            }
        },
        providesTags: ['Students'],
    }),

    studentProfile: builder.query<Student, number>({
        query: (id) => `${PREFIX}students/view/${id}`,
        providesTags: ['Students'],
    }),

    studentSectors: builder.query<Course[], number>({
        query: (id) => `${PREFIX}student/course/${id}`,
        providesTags: ['Students'],
    }),
    studentRemove: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}student/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Students'],
    }),

    studentAssignCourses: builder.mutation({
        query: (body) => {
            return {
                url: `${PREFIX}student/course/assign`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['Students'],
    }),

    studentUnassignCourses: builder.mutation({
        query: (body: any) => ({
            url: `${PREFIX}student/course/delete/${body.courseId}`,
            params: { student: body.rtoId },
            method: 'DELETE',
        }),
        invalidatesTags: ['Students'],
    }),

    studentStatusChange: builder.mutation<
        Student,
        { id: number; status: UserStatus }
    >({
        query: ({ id, status }) => {
            return {
                url: `${PREFIX}students/status`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }
        },
        invalidatesTags: ['Students'],
    }),

    studentUpdate: builder.mutation({
        query: ({ id, body }: any) => {
            return {
                url: `${PREFIX}students/update/${id}`,
                method: 'PATCH',
                body,
            }
        },
        invalidatesTags: ['Students'],
    }),

    studentsRequiredDocsDetail: builder.query<
        any,
        { id: number; docType: string }
    >({
        query: ({ id, docType }) => ({
            url: `${PREFIX}student/required-docs/response/${id}`,
            params: { key: docType },
        }),
        providesTags: ['Students'],
    }),
    studentCourseDetail: builder.query<any, { id: number; studentId: number }>({
        query: ({ id, studentId }) =>
            `${PREFIX}student/course/docs/${studentId}/${id}`,

        providesTags: ['Students'],
    }),
    studentUpcomingAppointments: builder.query<any, number>({
        query: (id) => `${PREFIX}appointments/view/${id}`,

        providesTags: ['Students'],
    }),
})
