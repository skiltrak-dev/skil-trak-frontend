import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const studentsScheduleEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentSchedule: builder.query<
        any,
        { courseId: number; userId?: number }
    >({
        query: ({ courseId, userId }) => ({
            url: `${PREFIX}/schedule/view`,
            params: { course: courseId, stdUser: userId },
        }),
        providesTags: ['StudentSchedule'],
    }),

    createStudentSchedule: builder.mutation({
        query: ({ stdUser, ...body }) => ({
            url: `${PREFIX}/schedule/add`,
            method: 'POST',
            params: { stdUser },
            body,
        }),
        invalidatesTags: ['StudentSchedule'],
    }),
    editStudentSchedule: builder.mutation({
        query: ({ id, stdUser, ...body }) => ({
            url: `${PREFIX}/schedule/edit/${id}`,
            method: 'POST',
            params: { stdUser },
            body,
        }),
        invalidatesTags: ['StudentSchedule'],
    }),
    addScheduleNote: builder.mutation<any, any>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/schedule/comment/add/${id}`,
            body,
            method: 'POST',
        }),
        invalidatesTags: ['StudentSchedule'],
    }),
    cancelScheduleShift: builder.mutation<any, { id: number; comment: string }>(
        {
            query: ({ id, comment }) => ({
                url: `${PREFIX}/schedule/cancel/${id}`,
                body: { comment },
                method: 'PATCH',
            }),
            invalidatesTags: ['StudentSchedule'],
        }
    ),
    rescheduleShift: builder.mutation<any, any>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/schedule/re-schedule/slot/${id}`,
            body,
            method: 'PATCH',
        }),
        invalidatesTags: ['StudentSchedule'],
    }),
})
