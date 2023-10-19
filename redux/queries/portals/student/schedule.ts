import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const studentsScheduleEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentSchedule: builder.query<any, number>({
        query: (courseId) => ({
            url: `${PREFIX}/schedule/view`,
            params: { course: courseId },
        }),
        providesTags: ['StudentSchedule'],
    }),

    createStudentSchedule: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/schedule/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['StudentSchedule'],
    }),
})
