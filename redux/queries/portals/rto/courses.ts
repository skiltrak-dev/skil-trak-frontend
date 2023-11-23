import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos'
export const coursesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRTOCourses: builder.query<any, void>({
        query: () => `${PREFIX}/courses/list`,
        providesTags: ['RTOCourses'],
    }),
    updateCourseHours: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/course/edit-hours`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTOCourses', 'RTO'],
    }),
})
