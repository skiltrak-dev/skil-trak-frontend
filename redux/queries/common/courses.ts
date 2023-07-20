import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const coursesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllCourses: builder.query<any, void>({
        query: () => `filter/courses/all`,
        providesTags: ['Course'],
    }),
    getCoursesList: builder.query<any, void>({
        query: () => `shared/courses/list`,
        providesTags: ['Course'],
    }),
    getSubadminCoursesList: builder.query<any, void>({
        query: () => `subadmin/courses/list`,
        providesTags: ['Course'],
    }),
})
