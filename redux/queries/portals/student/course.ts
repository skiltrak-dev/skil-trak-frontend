import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const coursesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentCourses: builder.query<any, void>({
        query: (params: any) => {
            return {
                url: 'courses/view',
                params,
            }
        },
        providesTags: ['StudentCourses'],
    }),
    getStudentCoursesLs: builder.query<any, void>({
        query: (params: any) => {
            return {
                url: 'courses/list',
                params,
            }
        },
        providesTags: ['StudentCourses'],
    }),
})
