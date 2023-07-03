import { StudentSubAdmin } from '@components'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Appointment,
    Course,
    Folder,
    PaginatedResponse,
    PaginationWithSearch,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'admin/'
export const studentEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    studentCount: builder.query<UserCount, void>({
        query: () => `${PREFIX}students/list/count`,
        providesTags: [
            'Students',
            'SubAdminWorkplace',
            'SubAdminStudents',
            'BulkUsersDelete',
            'BulkStatus',
        ],
    }),
    students: builder.query<
        PaginatedResponse<StudentSubAdmin>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}students/list`,
            params,
        }),
        providesTags: [
            'Students',
            'SubAdminStudents',
            'Notes',
            'AllCommunications',
            'SubAdminWorkplace',
            'BulkUsersDelete',
            'BulkStatus',
        ],
    }),

    filteredStudents: builder.query<
        PaginatedResponse<Student>,
        PaginationWithSearch
    >({
        query: (params) => {
            return {
                url: `${PREFIX}students/filter`,
                params,
            }
        },
        providesTags: [
            'Students',
            'SubAdminStudents',
            'Notes',
            'AllCommunications',
            'SubAdminWorkplace',
        ],
    }),

    studentProfile: builder.query<Student, number>({
        query: (id) => `${PREFIX}students/view/${id}`,
        providesTags: ['Students', 'Notes', 'AllCommunications'],
    }),

    studentSectors: builder.query<Course[], number>({
        query: (id) => `${PREFIX}student/course/${id}`,
        providesTags: ['Students'],
    }),
    studentRemove: builder.mutation<Student, number>({
        query: (id) => ({
            url: `${PREFIX}student/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Students'],
    }),

    studentAssignCourses: builder.mutation<
        Student,
        {
            user: number
            courses: number[]
        }
    >({
        query: (body) => ({
            url: `${PREFIX}student/course/assign`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Students'],
    }),

    studentUnassignCourses: builder.mutation<
        Student,
        { id: number; courseId: number }
    >({
        query: (body) => ({
            url: `${PREFIX}student/course/delete/${body.courseId}`,
            params: { student: body.id },
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

    studentUpdate: builder.mutation<Student, { id: number; body: Student }>({
        query: ({ id, body }) => ({
            url: `${PREFIX}students/update/${id}`,
            method: 'PATCH',
            body,
        }),
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
    studentCourseDetail: builder.query<
        Course,
        { id: number; studentId: number }
    >({
        query: ({ id, studentId }) =>
            `${PREFIX}student/course/docs/${studentId}/${id}`,

        providesTags: ['Students'],
    }),
    studentUpcomingAppointments: builder.query<Appointment[], number>({
        query: (id) => `${PREFIX}appointments/view/${id}`,

        providesTags: ['Students'],
    }),
})
