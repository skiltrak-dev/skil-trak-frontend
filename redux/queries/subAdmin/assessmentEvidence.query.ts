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
        getAssessmentEvidence: builder.query<any[], void>({
            query: () => {
                return {
                    url: 'students/assessment-evidence/list-all',
                }
            },
            providesTags: ['AssessmentEvidence'],
        }),
        getAssessmentEvidenceDetail: builder.query<any, string>({
            query: (id) => {
                return {
                    url: `student/assessment-evidence/${id}`,
                }
            },
            providesTags: ['AssessmentEvidence'],
        }),
        getAssessmentResponse: builder.query<
            any,
            { selectedFolder: number; student: number }
        >({
            query: ({ selectedFolder, student }) => {
                return {
                    url: `student/assessment-evidence/response/${selectedFolder}/${student}`,
                }
            },
            providesTags: ['AssessmentEvidence'],
        }),
        addCommentOnAssessment: builder.mutation<any, any | null>({
            query: ({ id, comment, status }: any) => {
                return {
                    url: `student/assessment-evidence/comment/${id}`,
                    method: 'PATCH',
                    body: { status, comment },
                }
            },
            invalidatesTags: ['AssessmentEvidence'],
        }),
        submitAssessmentEvidence: builder.mutation<any, any | null>({
            query: ({ id, body }: any) => {
                return {
                    url: `student/assessment-evidence/result/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['AssessmentEvidence'],
        }),
    }),
})

export const {
    useGetAssessmentEvidenceQuery,
    useGetAssessmentResponseQuery,
    useGetAssessmentEvidenceDetailQuery,
    useAddCommentOnAssessmentMutation,
    useSubmitAssessmentEvidenceMutation,
} = assessmentEvidenceApi
