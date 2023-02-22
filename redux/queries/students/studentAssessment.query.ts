import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const studentAssessmentApi = createApi({
    reducerPath: 'studentAssessmentApi',
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
        // getStudentCourses: builder.query({
        //   query: () => `courses/view`,
        //   providesTags: ['StudentAssessmentEvidence'],
        // }),

        getStudentAssessmentTool: builder.query<any, string | null>({
            query: (id: string | null) => `assessment-tool/view/${id}`,
            providesTags: ['StudentAssessmentEvidence'],
        }),
        
    }),
})

export const {
    useGetStudentAssessmentToolQuery,
    // useGetStudentCoursesQuery,
    // useGetCoordinatorsForStudentQuery,
    // useGetStudentPastAppointmentsQuery,
    // useGetStudentUpcomingAppointmentsQuery,
} = studentAssessmentApi
