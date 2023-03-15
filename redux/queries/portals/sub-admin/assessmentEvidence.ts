import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const assessmentEvidenceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    assessmentCount: builder.query<any, void>({
        query: () => `${PREFIX}/students/assessment-evidence/count`,
        providesTags: ['AssessmentEvidence'],
    }),
    getAssessmentEvidence: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/assessment-evidence/list-all`,
            params,
        }),
        providesTags: ['AssessmentEvidence'],
    }),
    getAssessmentEvidenceDetail: builder.query<
        any,
        { courseId: number; studentId: number }
    >({
        query: ({ courseId, studentId }) =>
            `${PREFIX}/student/assessment-evidence/${courseId}/${studentId}`,
        providesTags: ['AssessmentEvidence'],
    }),
    getAssessmentResponse: builder.query<
        any,
        { selectedFolder: number; student: number }
    >({
        query: ({ selectedFolder, student }) =>
            `${PREFIX}/student/assessment-evidence/response/${selectedFolder}/${student}`,
        providesTags: ['AssessmentEvidence'],
    }),
    addCommentOnAssessment: builder.mutation<any, any | null>({
        query: ({ id, comment, status, std }: any) => ({
            url: `${PREFIX}/student/assessment-evidence/comment/${id}/${std}`,
            method: 'PATCH',
            body: { status, comment },
        }),
        invalidatesTags: ['AssessmentEvidence'],
    }),
    submitAssessmentEvidence: builder.mutation<any, any | null>({
        query: ({ id, body }: any) => ({
            url: `${PREFIX}/student/assessment-evidence/result/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['AssessmentEvidence'],
    }),
    studentAssessmentCourses: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/course/${id}`,
        providesTags: ['AssessmentEvidence'],
    }),
    maulallyReopenSubmissionRequest: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/student/assessment-evidence/allow-submission/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AssessmentEvidence'],
    }),
    uploadAssessmentDocs: builder.mutation<any, any>({
        query: ({ folderId, studentId, body }) => ({
            url: `subadmin/assessment-evidence/response/${folderId}/${studentId}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['AssessmentEvidence'],
    }),
    archiveUploadedFile: builder.mutation<any, number>({
        query: (fileId) => ({
            url: `subadmin/assessment-evidence/file/archive/${fileId}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AssessmentEvidence'],
    }),
})
