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
    getArchivedAssessmentEvidenceDetail: builder.query<
        any,
        { courseId: number; studentId: number }
    >({
        query: ({ courseId, studentId }) =>
            `${PREFIX}/student/assessment-evidence-archived/${courseId}/${studentId}`,
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

    downloadAllCourseFiles: builder.mutation<
        any,
        { studentId: number; courseId: number }
    >({
        query: ({ studentId, courseId }) => ({
            url: `shared/files/download/${studentId}/${courseId}`,
            // method: 'POST',
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),

    downloadArhiveCourseFiles: builder.mutation<
        any,
        { studentId: number; courseId: number }
    >({
        query: ({ studentId, courseId }) => ({
            url: `shared/archived-files/download/${studentId}/${courseId}`,
            method: 'POST',
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),

    getArchivedAssessmentResponse: builder.query<
        any,
        { selectedFolder: number; student: number }
    >({
        query: ({ selectedFolder, student }) =>
            `${PREFIX}/student/archived-assessment-evidence/response/${selectedFolder}/${student}`,
        providesTags: ['AssessmentEvidence'],
    }),
    addCommentOnAssessment: builder.mutation<
        any,
        {
            folderId: number
            resultId: number
            comment: string
            status: any
            std: number
            assessmentFolderId: number
        }
    >({
        query: ({
            folderId,
            resultId,
            comment,
            status,
            std,
            assessmentFolderId,
        }) => ({
            url: `${PREFIX}/student/assessment-evidence/comment/${folderId}/${std}/${resultId}/${assessmentFolderId}`,
            method: 'PATCH',
            body: { status, comment },
        }),
        invalidatesTags: ['AssessmentEvidence', 'SubAdminStudents'],
    }),
    submitAssessmentEvidence: builder.mutation<any, any | null>({
        query: ({ id, body }: any) => ({
            url: `${PREFIX}/student/assessment-evidence/result/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['AssessmentEvidence', 'SubAdminStudents'],
    }),
    studentAssessmentCourses: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/course/${id}`,
        providesTags: ['AssessmentEvidence', 'SubAdminStudents'],
    }),
    maulallyReopenSubmissionRequest: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/student/assessment-evidence/allow-submission/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AssessmentEvidence', 'SubAdminStudents'],
    }),
    uploadAssessmentDocs: builder.mutation<any, any>({
        query: ({ folderId, studentId, body }) => ({
            url: `subadmin/assessment-evidence/response/${folderId}/${studentId}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['AssessmentEvidence', 'SubAdminStudents'],
    }),
    archiveUploadedFile: builder.mutation<any, number>({
        query: (fileId) => ({
            url: `subadmin/assessment-evidence/file/archive/${fileId}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AssessmentEvidence'],
    }),
})
