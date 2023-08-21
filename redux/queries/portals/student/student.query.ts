import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { Rto } from '@types'
import { emptySplitApi } from '../empty.query'
import { coursesEndpoints } from './course'
import { studentEndpoints } from './studentAppointment'
import { assessmentToolEndpoints } from './studentAssessmentTool'
import { studentAssessmentEvidenceEndpoints } from './studentAssessmentEvidence'
import { studentJobEndpoints } from './studentsJobs'
import { profileEndpoints } from './profile'
import { workplaceEndpoints } from './workplace'

export const studentApi = emptySplitApi.injectEndpoints({
    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoProfile: build.query<Rto, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTO'],
        }),
        ...coursesEndpoints(build),
        ...studentEndpoints(build),
        ...assessmentToolEndpoints(build),
        ...studentAssessmentEvidenceEndpoints(build),
        ...studentJobEndpoints(build),
        ...profileEndpoints(build),
        ...workplaceEndpoints(build),
    }),
    // overrideExisting: true,
})

export const {
    // ------ COURSES ------ //
    useGetStudentCoursesQuery,

    // --- STUDENT APPOINTMENT --- //
    useGetJobsQuery,
    useGetStudentTimeSlotesQuery,
    useGetStudentAppointmentsQuery,
    useGetStudentFavoriteJobsQuery,
    useCreateStudentAppointmentMutation,

    useGetCoordinatorsForStudentQuery,
    useGetStudentPastAppointmentsQuery,
    useGetCoordinatorsAvailabilityQuery,
    useGetStudentUpcomingAppointmentsQuery,

    // -- STUDENT ASSESSMENT TOOLS -- //
    useGetStudentAssessmentToolQuery,

    // ---- ASSESSMENT EVIDENCE ---- //
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
    useUploadFolderDocsMutation,
    useArchiveAssessmentFilesMutation,
    useGetAssessmentsFolderDetailQuery,
    useSubmitStudentAssessmentMutation,

    // ---- PROFILE ---- //
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,

    // ----- JOB ----- //
    useSaveJobMutation,
    useApplyForJobMutation,
    useGetStudentJobsQuery,
    useGetStudentJobDetailQuery,
    useGetStudentUploadedResumeQuery,

    // ---- WORKPLACE ---- //
    useGetStudentIndustriesQuery,
    useGetCourseDocumentsQuery,
    useGetWorkplaceIndustriesQuery,
    useGetPlacementProgressQuery,
    useWorkPlaceRequestMutation,
    useUploadDocumentsMutation,
    useUploadAgreementMutation,
    useCancelWorkplaceRequestMutation,
    useApplyForWorkplaceMutation,
    useUpdateFindAbnMutation,
    useAddWorkplaceMutation,
    useApplyWorkplaceWithAbnIndustryMutation,
} = studentApi

export const StudentApi = {
    Profile: {
        useGetStudentProfileDetailQuery,
        useUpdateStudentProfileMutation,
    },
    Courses: {
        useList: useGetStudentCoursesQuery,
    },
    Student: {
        useGetJobsQuery,
        useGetStudentTimeSlotesQuery,
        useGetStudentAppointmentsQuery,
        studentFavoriteJobs: useGetStudentFavoriteJobsQuery,
        useCreateStudentAppointmentMutation,
        useGetCoordinatorsForStudentQuery,
        useGetStudentPastAppointmentsQuery,
        useGetCoordinatorsAvailabilityQuery,
        useGetStudentUpcomingAppointmentsQuery,
    },
    AssessmentTool: {
        useGetStudentAssessmentToolQuery,
    },
    AssessmentEvidence: {
        useGetAssessmentsCoursesQuery,
        useGetAssessmentsFoldersQuery,
        useUploadFolderDocsMutation,
        useArchiveAssessmentFilesMutation,
        useGetAssessmentsFolderDetailQuery,
        useSubmitStudentAssessmentMutation,
    },
    Job: {
        useGetStudentJobsQuery,
        useGetStudentJobDetailQuery,
        useSaveJobMutation,
        useApplyJob: useApplyForJobMutation,
        useGetStudentUploadedResume: useGetStudentUploadedResumeQuery,
    },
    Workplace: {
        useGetStudentIndustriesQuery,
        useGetCourseDocumentsQuery,
        useGetWorkplaceIndustriesQuery,
        useGetPlacementProgressQuery,
        useWorkPlaceRequestMutation,
        useUploadDocumentsMutation,
        useUploadAgreementMutation,
        useCancelWorkplaceRequestMutation,
        useApplyForWorkplaceMutation,
        useUpdateFindAbnMutation,
        useAddWorkplaceMutation,
        useApplyWorkplaceWithAbnIndustryMutation,
    },
}
