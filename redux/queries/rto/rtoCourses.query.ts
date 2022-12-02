import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Course, PaginatedResponse } from '@types'
import { AuthUtils } from '@utils'
import { StudentJobsType, StudentJobType } from 'redux/queryTypes'

export const rtoCoursesApi = createApi({
    reducerPath: 'rtoCoursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/students/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['RTOCourses'],
    endpoints: (builder) => ({
        getRTOCourses: builder.query<any, void>({
            query: () => {
                return {
                    url: 'courses/list',
                }
            },
            providesTags: ['RTOCourses'],
        }),
    }),
})

export const { useGetRTOCoursesQuery } = rtoCoursesApi
