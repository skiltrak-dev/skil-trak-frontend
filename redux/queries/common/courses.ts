import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const coursesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllCourses: builder.query<any, void>({
        query: () => `filter/courses/all`,
        providesTags: ['Course'],
    }),
    getAllCoursesByRto: builder.query<any, number>({
        query: (rto) => {
            const params = rto ? { id: rto } : {}
            return {
                url: `appointments/courses/get`,
                params,
            }
        },
        providesTags: ['Course'],
    }),
    getAppointmentCourses: builder.query<any, number>({
        query: (id) => {
            const params = id ? { id } : {}
            return {
                url: `appointments/courses/get/by-user`,
                params,
            }
        },
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
