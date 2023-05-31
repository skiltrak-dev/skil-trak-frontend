import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { subAdminAppointmentspoints } from './appointments'
import { assessmentEvidenceEndpoints } from './assessmentEvidence'
import { subAdminIndustriesEndpoints } from './industries'
import { notesEndpoints } from './notes'
import { profileEndpoints } from './profile'
import { subAdminRtoEndpoints } from './rto'
import { setScheduleEndpoints } from './setSchedule'
import { setUnavailabilityEndpoints } from './setUnavailability'
import { subAdminSettingEndpoints } from './setting'
import { studentsEndpoints } from './students'
import { workplaceEndpoints } from './workplace'
import { UserStatus } from '@types'
import { emptySplitApi } from '../empty.query'
import { subAdminReports } from './reports'
export const subAdminApi = emptySplitApi.injectEndpoints({
    // export const subAdminApi = createApi({
    //     reducerPath: 'subAdminApi',
    //     baseQuery: fetchBaseQuery({
    //         baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
    //         prepareHeaders: (headers, { getState }) => {
    //             const token = AuthUtils.getToken()
    //             if (token) {
    //                 headers.set('authorization', `Bearer ${token}`)
    //             }
    //             return headers
    //         },
    //     }),

    // keepUnusedDataFor: 200,
    // refetchOnMountOrArgChange: true,
    // refetchOnReconnect: true,

    // tagTypes: [
    //     'Notes',
    //     'Setting',
    //     'SubAdmin',
    //     'Statistics',
    //     'Appointment',
    //     'SetSchedule',
    //     'SubAdminRtos',
    //     'SubAdminStudents',
    //     'SubAdminWorkplace',
    //     'AssessmentEvidence',
    //     'SubAdminIndustries',
    // ],

    // ---------- Sub Admin ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<any, void>({
            query: () => `subadmin/me/profile`,
            providesTags: ['SubAdmin'],
        }),

        subadminStatistics: build.query<any, void>({
            query: () => `subadmin/dashboard/count`,
            providesTags: ['Statistics'],
        }),

        changeSubAdminUserStatus: build.mutation<
            any,
            { id: number; status: UserStatus }
        >({
            query: ({ id, status }) => ({
                url: `shared/user/status/update`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }),
            invalidatesTags: [
                'Notes',
                'SubAdmin',
                'SubAdminRtos',
                'SubAdminIndustries',
            ],
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
        ...subAdminReports(build),
    }),
    // overrideExisting: false,
})

export const {
    // ------ SELF ------ //
    useProfileQuery,
    useUpdateSubAdminProfileMutation,
    useChangeSubAdminUserStatusMutation,

    // ------ NOTES ------ //
    useSubadminNotesQuery,
    useGetNotesQuery,
    useNoteAddMutation,
    useNoteDeleteMutation,
    useUpdateNoteMutation,
    useSubadminNoteStatusChangeMutation,

    // ------ WORKPLACE------ //
    useWorkplaceCountQuery,
    useAgrementSignMutation,

    useAssignSubadminWorkplaceCourseMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useAssignToSubAdminMutation,
    useUsAssignSubAdminMutation,
    useCompletePlacementMutation,
    useTerminatePlacementMutation,
    useGetMyStudentsWorkplacesQuery,
    useGetSubAdminWorkplacesQuery,
    useRemoveAppliedIndustryMutation,
    useGetCancelledWorkplacesQuery,
    useGetSubAdminFilteredWorkplacesQuery,
    useSendInterviewNotificationMutation,
    useForwardWorkplaceToIndustryMutation,
    useAddWorkplaceNoteMutation,
    useRemoveAppliedIndustryFromWorkplaceMutation,
    useGetWorkplaceFoldersQuery,
    useUpdateWorkplaceStatusMutation,
    useCancelWorkplaceStatusMutation,
    useGetAddedByStudentsWorkplacesQuery,
    useSubAdminApplyStudentWorkplaceMutation,
    useAddCustomIndustryMutation,
    useShowExistingIndustriesQuery,
    useAddExistingIndustriesMutation,
    useChangeCustomIndustryStatusMutation,
    useSendMeetingNotificationMutation,

    // ----- STUDENTS-------//
    useGetSubAdminStudentsQuery,
    useSetNotContactableMutation,
    useCalledStudentMutation,
    useSubAdminStudentCountQuery,
    useSubAdminRequestWorkplaceMutation,
    useSubAdminFilteredStudentsQuery,
    useSubadminStudentAssignCoursesMutation,
    useSubadminStudentUnassignCoursesMutation,
    useGetSubAdminStudentWorkplaceQuery,
    useGetSubAdminMyRtoQuery,
    useGetSubAdminStudentCoursesQuery,
    useGetSubAdminStudentDetailQuery,
    useGetSubAdminStudentWorkplaceDetailQuery,
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
    useAddCourseStartEndDateMutation,
    useStudentCallLogMutation,
    useGetStudentCallLogQuery,

    // -- COUNT -- //
    useSubadminStatisticsQuery,

    // --- ASSESSMENT EVIDENCE --- //
    useGetAssessmentEvidenceQuery,
    useAssessmentCountQuery,
    useGetAssessmentResponseQuery,

    useGetAgrementFileQuery,
    useGetArchivedAssessmentResponseQuery,
    useStudentAssessmentCoursesQuery,
    useAddCommentOnAssessmentMutation,
    useGetAssessmentEvidenceDetailQuery,
    useGetArchivedAssessmentEvidenceDetailQuery,
    useSubmitAssessmentEvidenceMutation,
    useMaulallyReopenSubmissionRequestMutation,
    useUploadAssessmentDocsMutation,
    useDownloadAllCourseFilesMutation,
    useDownloadArhiveCourseFilesMutation,
    useArchiveUploadedFileMutation,

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
    useSubadminRtoStatisticsCountQuery,
    useSubadminRtoImportStudentsMutation,
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
    useSubadminIndustryStatisticsCountQuery,
    useGetSubadminIndustriesCountQuery,
    useGetSubAdminIndustriesQuery,
    useGetFavouriteIndustriesQuery,
    useGetSubAdminIndustryStudentsQuery,
    useGetSubAdminIndustriesProfileQuery,
    useAddToFavoriteMutation,

    // --- REPORTS --- //
    useGetAssignedStudentsReportQuery,
    useGetAssignedWorkplaceReportQuery,
    useGetActiveStudentsReportQuery,
    useGetSubAdminArchivedStudentsReportQuery,
    useGetStudentsCallsReportQuery,
    useGetBookAppointmentsReportQuery,
    useGetSubAdminTerminatedWorkplaceReportQuery,
    useGetSubAdminCompletedWorkplaceReportQuery,
    useGetSubAdminCancelledWorkplaceReportQuery,
} = subAdminApi

export const SubAdminApi = {
    Count: {
        statistics: useSubadminStatisticsQuery,
    },
    SubAdmin: {
        useProfile: useProfileQuery,
        useUpdateProfile: useUpdateSubAdminProfileMutation,
        changeSubAdminUserStatus: useChangeSubAdminUserStatusMutation,
    },
    Notes: {
        useList: useSubadminNotesQuery,
        useCreate: useNoteAddMutation,
        useDelete: useNoteDeleteMutation,
        useStatusChange: useSubadminNoteStatusChangeMutation,
    },

    Student: {
        useCount: useSubAdminStudentCountQuery,
        useList: useGetSubAdminStudentsQuery,
        assignCourse: useSubadminStudentAssignCoursesMutation,
        subadminStudentUnassignCourses:
            useSubadminStudentUnassignCoursesMutation,
        useNotContactable: useSetNotContactableMutation,
        useCalled: useCalledStudentMutation,
        useCourses: useGetSubAdminStudentCoursesQuery,
        useChangePassword: useChangeStudentPasswordMutation,
        useUpdateDetail: useUpdateStudentDetailMutation,
        changeStatus: useChangeStudentStatusMutation,
        changeCurrentStatus: useChangeStudentCurrentStatusMutation,
        useAddSecondWorkplace: useAddSecondWorkplaceMutation,
        useAddCustomWorkplace: useAddCustomSecondWorkplaceMutation,
        addCourseStartEndDate: useAddCourseStartEndDateMutation,
        useStudentCallLog: useStudentCallLogMutation,
        useGetStudentCallLog: useGetStudentCallLogQuery,
    },
    Industry: {
        useStatusticsCount: useSubadminIndustryStatisticsCountQuery,
    },
    Rto: {
        useRtoStatsCount: useSubadminRtoStatisticsCountQuery,
        useImportStudentList: useSubadminRtoImportStudentsMutation,
    },
    Workplace: {
        count: useWorkplaceCountQuery,
        assignCourse: useAssignSubadminWorkplaceCourseMutation,
        AgreementSign: useAgrementSignMutation,
        removeAppliedIndustry: useRemoveAppliedIndustryMutation,
        removeAppliedIndustryFromWorkplace:
            useRemoveAppliedIndustryFromWorkplaceMutation,
        useStartPlacementMutation,
        useIndustryResponseMutation,
        useAssignToSubAdminMutation,
        useUsAssignSubAdminMutation,
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
        useSendMeetingNotification: useSendMeetingNotificationMutation,
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
        archiveUploadedFile: useArchiveUploadedFileMutation,
        downloadFiles: useDownloadAllCourseFilesMutation,
        downloadArchiveFiles: useDownloadArhiveCourseFilesMutation,
    },
    Reports: {
        useAssignedStudents: useGetAssignedStudentsReportQuery,
        useAssignedWorkplace: useGetAssignedWorkplaceReportQuery,
        useActiveStudentsReport: useGetActiveStudentsReportQuery,
        useArchiveStudentsReport: useGetSubAdminArchivedStudentsReportQuery,
        useStudentsCallsReport: useGetStudentsCallsReportQuery,
        useBookAppointmentsReport: useGetBookAppointmentsReportQuery,
        useTerminatedWorkplaceReport:
            useGetSubAdminTerminatedWorkplaceReportQuery,
        useCompletedWorkplaceReport:
            useGetSubAdminCompletedWorkplaceReportQuery,
        useCancelledWorkplaceReport:
            useGetSubAdminCancelledWorkplaceReportQuery,
    },
}
