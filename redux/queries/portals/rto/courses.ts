import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos'
export const coursesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRTOCourses: builder.query<any, void>({
        query: () => 'students/courses/list',
        providesTags: ['RTOCourses'],
    }),
})
