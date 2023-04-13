import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const assessmentToolEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentAssessmentTool: builder.query<any, string | null>({
        query: (id: string | null) => `${PREFIX}/assessment-tool/view/${id}`,
        providesTags: ['StudentAssessmentEvidence'],
    }),
})
