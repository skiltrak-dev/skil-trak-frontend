import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const profileEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentProfileDetail: builder.query<any, void>({
        query: () => `${PREFIX}/profile`,
        providesTags: ['StudentProfile'],
    }),
    updateStudentProfile: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/profile/update`,
            method: 'PATCH',
            params: { student: id },
            body,
        }),
        invalidatesTags: ['StudentProfile', 'SubAdminStudents'],
    }),

    getIndustriesForFeedback: builder.query<any, void>({
        query: () => `${PREFIX}/industries/for-feedback`,
        providesTags: ['IndustryFeedback'],
    }),
    addFeedForIndustry: builder.mutation<any, any>({
        query: ({ body }) => ({
            url: `${PREFIX}/industry/feedback-create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['IndustryFeedback'],
    }),
})
