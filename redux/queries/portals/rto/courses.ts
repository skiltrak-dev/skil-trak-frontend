import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos'
export const coursesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRTOCourses: builder.query<any, void>({
        query: () => `${PREFIX}/courses/list`,
        providesTags: ['RTOCourses', 'RTO'],
    }),
    updateCourseHours: builder.mutation<any, any>({
        query: ({ body, rtoUserId }) => ({
            url: `${PREFIX}/course/edit-hours`,
            method: 'POST',
            body,
            params: {
                ...(rtoUserId ? { rtoUserId } : {}),
            },
        }),
        invalidatesTags: ['RTOCourses', 'RTO', 'RTOS', 'Avatar', 'Profile'],
    }),
    addRtoCustomCourseRequirements: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `rtos/course/${id}/requirements-add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTOCourses', 'RTO'],
    }),

    addRtoCourseInfo: builder.mutation<
        any,
        { id: number; courseInfo: string; userId?: number }
    >({
        query: ({ id, userId, ...body }) => ({
            url: `${PREFIX}/course/${id}/add-info`,
            method: 'POST',
            params: { userId },
            body,
        }),
        invalidatesTags: ['RTOCourses', 'RTO'],
    }),
})
