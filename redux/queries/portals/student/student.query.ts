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
import { studentsScheduleEndpoints } from './schedule'
import { documentsEndpoints } from './documents'
import { talentPoolEndpoints } from './talentPool'

export const studentApi = emptySplitApi.injectEndpoints({
    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        rtoProfile: build.query<Rto, void>({
            query: () => `rtos/profile/view`,
            providesTags: ['RTO'],
        }),
        ...coursesEndpoints(build),
        ...studentEndpoints(build),
        ...profileEndpoints(build),
        ...workplaceEndpoints(build),
        ...documentsEndpoints(build),
        ...studentJobEndpoints(build),
        ...assessmentToolEndpoints(build),
        ...studentsScheduleEndpoints(build),
        ...studentAssessmentEvidenceEndpoints(build),
        ...talentPoolEndpoints(build),
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
    useGetIndustryFoldersQuery,
    useApplyForWorkplaceMutation,
    useUpdateFindAbnMutation,
    useAddWorkplaceMutation,
    useApplyWorkplaceWithAbnIndustryMutation,

    // ----- SCHEDULE ----- //
    useRescheduleShiftMutation,
    useAddScheduleNoteMutation,
    useGetStudentScheduleQuery,
    useCancelScheduleShiftMutation,
    useEditStudentScheduleMutation,
    useCreateStudentScheduleMutation,

    // ----- DOCUMENTS ----- //
    useGetStudentDocumentsQuery,

    // ----- TALENT POOL ----- //
    useGetTalentPoolStudentProfileQuery,
    useApplyForTalentPoolMutation,
    useGetTalentPoolStudentQuery,
    useGetAppliedTalentPoolStudentProfileQuery,
    useGetIndustriesRequestQuery,
    useUploadTalentPoolRequiredDocsMutation,
    useIndustryRequestStatusMutation,
    useGetAcceptedTalentPoolIndustryProfileQuery,
    useGetTalentPoolRequiredDocsResponseQuery,
    useGetConnectionRequiredDocsQuery,
    useUpdateTalentPoolProfileMutation,
    useGetIndustryRequestCountQuery,
    useReadIndustryRequestMutation,
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
        useGetIndustryFoldersQuery,
    },
    Schedule: {
        useAddScheduleNote: useAddScheduleNoteMutation,
        useCancelSchedule: useCancelScheduleShiftMutation,
        useGetStudentSchedule: useGetStudentScheduleQuery,
        useCreateStudentSchedule: useCreateStudentScheduleMutation,
        useEditStudentSchedule: useEditStudentScheduleMutation,
        useRescheduleShift: useRescheduleShiftMutation,
    },
    Documents: {
        useStudentDocuments: useGetStudentDocumentsQuery,
    },
    TalentPool: {
        useTalentPoolStudentProfile: useGetTalentPoolStudentProfileQuery,
        useAppliedTalentPoolStudentProfile:
            useGetAppliedTalentPoolStudentProfileQuery,
        useIndustriesConnectionRequests: useGetIndustriesRequestQuery,
        useTalentPoolStudent: useGetTalentPoolStudentQuery,
        useApplyTalentPool: useApplyForTalentPoolMutation,
        useUploadTalentPoolRequiredDocs:
            useUploadTalentPoolRequiredDocsMutation,
        useIndustryRequestStatus: useIndustryRequestStatusMutation,
        useAcceptedTalentPoolIndustryProfile:
            useGetAcceptedTalentPoolIndustryProfileQuery,
        useRequiredDocsResponse: useGetTalentPoolRequiredDocsResponseQuery,
        useConnectionRequiredDocs: useGetConnectionRequiredDocsQuery,
        useUpdateTalentPoolProfile: useUpdateTalentPoolProfileMutation,
        useIndustryRequestCount: useGetIndustryRequestCountQuery,
        useReadIndustryRequest: useReadIndustryRequestMutation,
    },
}
