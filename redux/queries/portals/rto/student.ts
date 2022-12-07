import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    Course,
    PaginatedResponse,
    Student,
    UserCount,
    UserStatus,
} from '@types'

const PREFIX = 'rtos/'
export const studentEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    studentsImport: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}students/import`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rto-Students'],
    }),
    addStudent: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}student/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rto-Students'],
    }),

    studentsImportedList: builder.query<any, any>({
        query: () => `${PREFIX}students/imported-lists`,
        providesTags: ['Rto-Students'],
    }),

})
