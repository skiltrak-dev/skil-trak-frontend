import { StudentFeedbackType } from '@partials/common/StudentProfileDetail/components/Workplace/enum'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = `users`

export const studentFeedbackEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    studentFeedback: builder.mutation<
        any,
        {
            rating: number
            course: number
            questions: { question: string; answer: string }[]
            student: number
            type?: StudentFeedbackType
        }
    >({
        query: (body) => ({
            url: `student-feedback`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Feedback', 'SubAdminWorkplace'],
    }),
    getStudentCoordinatorFeedback: builder.query<
        any,
        { type?: StudentFeedbackType }
    >({
        query: (params) => ({
            url: `student-feedback`,
            params,
        }),
        providesTags: ['Feedback'],
    }),
})
