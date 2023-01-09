import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const assessmentEvidenceApi = createApi({
    reducerPath: 'assessmentEvidenceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['AssessmentEvidence'],
    endpoints: (builder) => ({
        getAssessmentEvidence: builder.query<any, any>({
            query: (params) => ({
                url: 'students/assessment-evidence/list-all',
                params,
            }),
            providesTags: ['AssessmentEvidence'],
        }),
        getAssessmentEvidenceDetail: builder.query<
            any,
            { courseId: number; studentId: number }
        >({
            query: ({ courseId, studentId }) =>
                `student/assessment-evidence/${courseId}/${studentId}`,
            providesTags: ['AssessmentEvidence'],
        }),
        getAssessmentResponse: builder.query<
            any,
            { selectedFolder: number; student: number }
        >({
            query: ({ selectedFolder, student }) =>
                `student/assessment-evidence/response/${selectedFolder}/${student}`,
            providesTags: ['AssessmentEvidence'],
        }),
        addCommentOnAssessment: builder.mutation<any, any | null>({
            query: ({ id, comment, status, std }: any) => ({
                url: `student/assessment-evidence/comment/${id}/${std}`,
                method: 'PATCH',
                body: { status, comment },
            }),
            invalidatesTags: ['AssessmentEvidence'],
        }),
        submitAssessmentEvidence: builder.mutation<any, any | null>({
            query: ({ id, body }: any) => ({
                url: `student/assessment-evidence/result/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['AssessmentEvidence'],
        }),
        studentAssessmentCourses: builder.query<any, number>({
            query: (id) => `student/course/${id}`,
            providesTags: ['AssessmentEvidence'],
        }),
        maulallyReopenSubmissionRequest: builder.mutation<any, number>({
            query: (id) => ({
                url: `student/assessment-evidence/allow-submission/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['AssessmentEvidence'],
        }),
    }),
})

export const {
    useStudentAssessmentCoursesQuery,
    useGetAssessmentEvidenceQuery,
    useGetAssessmentResponseQuery,
    useGetAssessmentEvidenceDetailQuery,
    useAddCommentOnAssessmentMutation,
    useSubmitAssessmentEvidenceMutation,
    useMaulallyReopenSubmissionRequestMutation,
} = assessmentEvidenceApi
