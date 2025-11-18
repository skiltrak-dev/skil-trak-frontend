import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, PaginationWithSearch, Student } from '@types'
import { IWorkplaceIndustries } from 'redux/queryTypes'

export const aiAssistantEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    askAiAboutStudent: builder.mutation<
        any,
        { studentId: number; question: string }
    >({
        query: (body) => ({
            url: `ai/assistant/chat`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['AI-Assistant'],
    }),

    searchStudent: builder.query<
        PaginatedResponse<Student>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `shared/students/by-role/list`,
            params,
        }),
        providesTags: ['RTO'],
    }),

    aiStudentSearchDetail: builder.query<Student, number>({
        query: (id) => `ai/assistant/student/${id}/detail/get`,
        providesTags: ['RTO'],
    }),
    studentWorkplaceRequest: builder.query<IWorkplaceIndustries[], number>({
        query: (id) => `rtos/student/${id}/get/workplace-request`,
        providesTags: ['RTO'],
    }),
})
