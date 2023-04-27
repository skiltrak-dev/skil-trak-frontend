import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'students'
export const studentAssessmentEvidenceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAssessmentsCourses: builder.query<any[], void>({
        query: () => `${PREFIX}/courses/view`,
        providesTags: ['StudentAssessmentEvidence'],
    }),
    getAssessmentsFolders: builder.query<any, string | null>({
        query: (id: string | null) => `${PREFIX}/assessmentevidence/view/${id}`,
        providesTags: ['StudentAssessmentEvidence'],
    }),
    getAssessmentsFolderDetail: builder.query<any, string | null>({
        query: (id: string | null) => `${PREFIX}/folder/view/${id}`,
        providesTags: ['StudentAssessmentEvidence'],
    }),
    uploadFolderDocs: builder.mutation({
        query: ({ id, body }) => ({
            url: `${PREFIX}/assessment-evidence/response/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['StudentAssessmentEvidence'],
    }),
    archiveAssessmentFiles: builder.mutation<any, string | null>({
        query: (id: string | null) => ({
            url: `${PREFIX}/assessment-evidence/file/archive/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['StudentAssessmentEvidence'],
    }),
    submitStudentAssessment: builder.mutation({
        query: ({ body, id }) => ({
            url: `${PREFIX}/assessment-evidence/submit/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['StudentAssessmentEvidence'],
    }),
})
