import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'agreement'
export const agreementsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    viewSignedAgreement: builder.query<
        any,
        { student: number; course: number; industry: number }
    >({
        query: ({ student, course, industry }) => ({
            url: `${PREFIX}/view`,
            params: { student, course, industry },
        }),
        providesTags: ['Agreement'],
    }),
})
