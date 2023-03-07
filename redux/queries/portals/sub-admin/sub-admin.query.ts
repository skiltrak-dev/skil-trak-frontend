import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { SubAdmin } from '@types'
import { notesEndpoints } from './notes'
import { workplaceEndpoints } from './workplace'
import { studentsEndpoints } from './students'
import { profileEndpoints } from './profile'
import { assessmentEvidenceEndpoints } from './assessmentEvidence'
import { setScheduleEndpoints } from './setSchedule'
import { setUnavailabilityEndpoints } from './setUnavailability'
import { subAdminAppointmentspoints } from './appointments'
import { subAdminRtoEndpoints } from './rto'
import { subAdminSettingEndpoints } from './setting'
import { subAdminIndustriesEndpoints } from './industries'
import { emptySplitApi } from '../empty.query'

export const subAdminApi = createApi({
    reducerPath: 'subAdminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    // keepUnusedDataFor: 200,
    // refetchOnMountOrArgChange: true,
    // refetchOnReconnect: true,

    tagTypes: [
        'Notes',
        'Setting',
        'SubAdmin',
        'Statistics',
        'Appointment',
        'SetSchedule',
        'SubAdminRtos',
        'SubAdminStudents',
        'SubAdminWorkplace',
        'AssessmentEvidence',
        'SubAdminIndustries',
    ],

    // ---------- Sub Admin ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<any, void>({
            query: () => `subadmin/me/profile`,
            providesTags: ['SubAdmin'],
        }),

        statistics: build.query<any, void>({
            query: () => `subadmin/dashboard/count`,
            providesTags: ['Statistics'],
        }),

        ...notesEndpoints(build),
        ...profileEndpoints(build),
        ...studentsEndpoints(build),
        ...workplaceEndpoints(build),
        ...setScheduleEndpoints(build),
        ...subAdminRtoEndpoints(build),
        ...subAdminSettingEndpoints(build),
        ...setUnavailabilityEndpoints(build),
        ...subAdminAppointmentspoints(build),
        ...assessmentEvidenceEndpoints(build),
        ...subAdminIndustriesEndpoints(build),
    }),
    // overrideExisting: false,
})

export const {
    // ------ SELF ------ //
    useProfileQuery,
    useUpdateSubAdminProfileMutation,

    // ------ NOTES ------ //
    useNotesQuery,
    useGetNotesQuery,
    useNoteAddMutation,
    useNoteDeleteMutation,
    useUpdateNoteMutation,
    useNoteStatusChangeMutation,

    // ------ WORKPLACE------ //
    useAgrementSignMutation,
    useAssignCourseMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useAssignToSubAdminMutation,
    useCompletePlacementMutation,
    useTerminatePlacementMutation,
    useGetMyStudentsWorkplacesQuery,
    useGetSubAdminWorkplacesQuery,
    useGetCancelledWorkplacesQuery,
    useGetSubAdminFilteredWorkplacesQuery,
    useSendInterviewNotificationMutation,
    useForwardWorkplaceToIndustryMutation,
    useAddWorkplaceNoteMutation,
    useGetWorkplaceFoldersQuery,
    useUpdateWorkplaceStatusMutation,
    useCancelWorkplaceStatusMutation,
    useGetAddedByStudentsWorkplacesQuery,
    useSubAdminApplyStudentWorkplaceMutation,
    useAddCustomIndustryMutation,
    useShowExistingIndustriesQuery,
    useAddExistingIndustriesMutation,
    useChangeCustomIndustryStatusMutation,

    // ----- STUDENTS-------//
    useGetSubAdminStudentsQuery,
    useSetNotContactableMutation,
    useSubAdminStudentCountQuery,
    useSubAdminRequestWorkplaceMutation,
    useSubAdminFilteredStudentsQuery,
    useGetSubAdminStudentWorkplaceQuery,
    useGetSubAdminMyRtoQuery,
    useGetSubAdminStudentCoursesQuery,
    useGetSubAdminStudentDetailQuery,
    useUpdateSubAdminCourseDurationMutation,
    useGetSubAdminMyStudentsQuery,
    useAssignStudentsToSubAdminMutation,
    useSubAdminRequestIndustryWorkplaceMutation,
    useSubAdminCancelStudentWorkplaceRequestMutation,
    useGetRequiredDocsQuery,
    useGetRequiredFoldersQuery,
    useGetRequiredDocsResponseQuery,
    useUploadRequiredDocsMutation,
    useFindByAbnWorkplaceMutation,
    useApplyWorkplaceOnExistingIndustryMutation,
    useAddCustomIndustyForWorkplaceMutation,
    useStudentCoursesQuery,
    useChangeStudentPasswordMutation,
    useUpdateStudentDetailMutation,
    useChangeStudentStatusMutation,
    useChangeStudentCurrentStatusMutation,
    useAddSecondWorkplaceMutation,
    useAddCustomSecondWorkplaceMutation,

    // -- COUNT -- //
    useStatisticsQuery,

    // --- ASSESSMENT EVIDENCE --- //
    useGetAssessmentEvidenceQuery,
    useAssessmentCountQuery,
    useGetAssessmentResponseQuery,
    useStudentAssessmentCoursesQuery,
    useAddCommentOnAssessmentMutation,
    useGetAssessmentEvidenceDetailQuery,
    useSubmitAssessmentEvidenceMutation,
    useMaulallyReopenSubmissionRequestMutation,
    useUploadAssessmentDocsMutation,

    // --- SET SCHEDULE --- //
    useSetScheduleMutation,
    useSetScheduledListQuery,

    // --- SET UNAVAILABILITY -- //
    useAddUnavailabilityMutation,
    useGetUnAvailabilitiesQuery,
    useRemoveUnAvailabilityMutation,

    // --- APOINTMENTS --- //
    useSearchUserQuery,
    useSearchUserByIdQuery,
    useAvailabilityListQuery,
    useSearchSubAdminUsersQuery,
    useUserAvailabilitiesQuery,
    useGetSubAdminAppointmentsQuery,
    useSubAdminCreateAppointmentMutation,

    // ---- RTO ---- //
    useGetSubAdminRtosQuery,
    useGetSubAdminRTODetailQuery,
    useGetSubAdminRTOCoursesQuery,
    useGetRTOAssessmentToolsQuery,
    useGetSubAdminRtosStudentsQuery,
    useGetSubAdminRtoAppointmentsQuery,
    useUpdateSubAdminRtoStudentStatusMutation,
    useCreateRtoSubAdminAssessmentToolsMutation,
    useRemoveSubAdminRTOAssessmentToolsMutation,
    useUpdateRtoSubAdminAssessmentToolsMutation,
    useUpdateSubAdminAssessmentToolArchiveMutation,

    // --- SETTING --- //
    useGetSettingDataQuery,
    useSubAdminSettingMutation,

    // --- INDUSTRIES --- //
    useGetSubAdminIndustriesQuery,
    useGetFavouriteIndustriesQuery,
    useGetSubAdminIndustryStudentsQuery,
    useGetSubAdminIndustriesProfileQuery,
    useAddToFavoriteMutation,
} = subAdminApi

export const SubAdminApi = {
    Count: {
        statistics: useStatisticsQuery,
    },
    SubAdmin: {
        useProfile: useProfileQuery,
        useUpdateProfile: useUpdateSubAdminProfileMutation,
    },
    Notes: {
        useList: useNotesQuery,
        useCreate: useNoteAddMutation,
        useDelete: useNoteDeleteMutation,
        useStatusChange: useNoteStatusChangeMutation,
    },

    Student: {
        useCount: useSubAdminStudentCountQuery,
        useList: useGetSubAdminStudentsQuery,
        useNotContactable: useSetNotContactableMutation,
        useCourses: useGetSubAdminStudentCoursesQuery,
        useChangePassword: useChangeStudentPasswordMutation,
        useUpdateDetail: useUpdateStudentDetailMutation,
        changeStatus: useChangeStudentStatusMutation,
        changeCurrentStatus: useChangeStudentCurrentStatusMutation,
        useAddSecondWorkplace: useAddSecondWorkplaceMutation,
        useAddCustomWorkplace: useAddCustomSecondWorkplaceMutation,
    },
    Workplace: {
        assignCourse: useAssignCourseMutation,
        AgreementSign: useAgrementSignMutation,
        useStartPlacementMutation,
        useIndustryResponseMutation,
        useAssignToSubAdminMutation,
        useCompletePlacementMutation,
        useTerminatePlacementMutation,
        useGetMyStudentsWorkplacesQuery,
        useGetSubAdminWorkplacesQuery,
        useGetCancelledWorkplacesQuery,
        useGetSubAdminFilteredWorkplacesQuery,
        useSendInterviewNotificationMutation,
        useForwardWorkplaceToIndustryMutation,
        useAddWorkplaceNoteMutation,
        useGetWorkplaceFoldersQuery,
        useUpdateWorkplaceStatusMutation,
        useCancelWorkplaceStatusMutation,
        useGetAddedByStudentsWorkplacesQuery,
        useSubAdminApplyStudentWorkplaceMutation,
        useAddCustomIndustryMutation,
        useShowExistingIndustriesQuery,
        useAddExistingIndustriesMutation,
        useChangeCustomIndustryStatusMutation,
    },

    Courses: {
        useStudentCourses: useStudentCoursesQuery,
    },

    Docs: {
        useRequiredDocs: useGetRequiredDocsQuery,
        useRequiredFolders: useGetRequiredFoldersQuery,
        useRequiredDocsResponse: useGetRequiredDocsResponseQuery,
    },
    AssessmentEvidence: {
        uploadDocs: useUploadAssessmentDocsMutation,
    },
}
