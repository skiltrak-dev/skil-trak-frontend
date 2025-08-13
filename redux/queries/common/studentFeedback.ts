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
            student: number
            industry: number
            workplaceRequest: number
            type?: StudentFeedbackType
            questions: { question: string; answer: string }[]
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
    submitCoordinatorFeedback: builder.mutation<any, any>({
        query: (body) => ({
            url: `rating`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Rating'],
    }),

    //rating/by-user
    getUserReviewForCoordinator: builder.query<any, void>({
        query: () => ({
            url: `rating/by-user`,
        }),
        providesTags: ['Rating'],
    }),
})
