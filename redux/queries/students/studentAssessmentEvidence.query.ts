import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const studentAssessmentEvidenceApi = createApi({
    reducerPath: 'studentAssessmentEvidenceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/students/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentAssessmentEvidence'],
    endpoints: (builder) => ({
        getAssessmentsCourses: builder.query<any[], void>({
            query: () => 'courses/view',
            providesTags: ['StudentAssessmentEvidence'],
        }),
        getAssessmentsFolders: builder.query<any, string | null>({
            query: (id: string | null) => `assessmentevidence/view/${id}`,
            providesTags: ['StudentAssessmentEvidence'],
        }),
        getAssessmentsFolderDetail: builder.query<any, string | null>({
            query: (id: string | null) => `folder/view/${id}`,
            providesTags: ['StudentAssessmentEvidence'],
        }),
        uploadFolderDocs: builder.mutation({
            query: ({ id, body }) => ({
                url: `assessment-evidence/response/${id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['StudentAssessmentEvidence'],
        }),
        archiveAssessmentFiles: builder.mutation<any, string | null>({
            query: (id: string | null) => ({
                url: `assessment-evidence/file/archive/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['StudentAssessmentEvidence'],
        }),
        submitStudentAssessment: builder.mutation({
            query: (id) => ({
                url: `assessment-evidence/submit/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['StudentAssessmentEvidence'],
        }),
    }),
})

export const {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
    useUploadFolderDocsMutation,
    useArchiveAssessmentFilesMutation,
    useGetAssessmentsFolderDetailQuery,
    useSubmitStudentAssessmentMutation,
} = studentAssessmentEvidenceApi
