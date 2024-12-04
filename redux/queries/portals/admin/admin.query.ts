import { RemoveCoordinator } from './../../../../partials/rto/student/modals/RemoveCoordinator'
import { talentPoolEndpoints } from './talentPool'
import { courseEndpoints } from './course'
import { industryEndpoints } from './industry'

import { AdminStats, SMSFormQueryType } from '@types'
import { emptySplitApi } from '../empty.query'
import { appointmentTypeEndpoints } from './appointment-type'
import { documentsEndpoints } from './documents'
import { folderEndpoints } from './folder'
import { industryRplEndpoints } from './industyRpl'
import { generateKeysEndpoints } from './generate-key'
import { jobEndpoints } from './job'
import { profileEndpoints } from './profile'
import { rtoEndpoints } from './rto'
import { sectorEndpoints } from './sector'
import { studentEndpoints } from './student'
import { subAdminEndpoints } from './sub-admin'
import { subscriberEndpoints } from './subscribers'
import { volunteerEndpoints } from './volunteer'
import { workplaceEndpoints } from './workplace'
import { blogsEndpoints } from './blogs'
import { departmentEndpoints } from './department'
import { insuranceEndpoints } from './insurance'
const PREFIX = 'admin'

export const adminApi = emptySplitApi.injectEndpoints({
    // ---------- ADMIN ENDPOINTS ---------- //
    endpoints: (build) => ({
        statistics: build.query<AdminStats, void>({
            query: () => `${PREFIX}/count`,
            providesTags: ['Statistics'],
        }),

        sendSMS: build.mutation<
            SMSFormQueryType,
            { number: string; message: string }
        >({
            query: (body) => ({
                url: `${PREFIX}/sms/send`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SMS'],
        }),

        sectorsStudentsCount: build.query<any, void>({
            query: () => `${PREFIX}/sectors/count`,
            providesTags: ['Statistics'],
        }),

        allowRtoListing: build.mutation<any, number>({
            query: (id) => ({
                url: `admin/subadmin/${id}/allow-rto/listing`,
                method: 'PATCH',
            }),
            invalidatesTags: ['AllowRtoListing', 'SubAdmins'],
        }),
        allowIndustryListing: build.mutation<any, number>({
            query: (id) => ({
                url: `admin/subadmin/${id}/allow-industry/listing`,
                method: 'PATCH',
            }),
            invalidatesTags: ['AllowRtoListing', 'SubAdmins'],
        }),

        ...rtoEndpoints(build),
        ...jobEndpoints(build),
        ...blogsEndpoints(build),
        ...studentEndpoints(build),
        ...sectorEndpoints(build),
        ...courseEndpoints(build),
        ...folderEndpoints(build),
        ...profileEndpoints(build),
        ...subAdminEndpoints(build),
        ...industryEndpoints(build),
        ...insuranceEndpoints(build),
        ...workplaceEndpoints(build),
        ...volunteerEndpoints(build),
        ...documentsEndpoints(build),
        ...subscriberEndpoints(build),
        ...talentPoolEndpoints(build),
        ...departmentEndpoints(build),
        ...industryRplEndpoints(build),
        ...generateKeysEndpoints(build),
        ...appointmentTypeEndpoints(build),
    }),
    // overrideExisting: false,
})

const {
    // ------ ADMIN ------ //
    useStatisticsQuery,
    useGetProfileQuery,
    useSectorsStudentsCountQuery,
    useUpdateAdminProfileMutation,
    useGetDashboardChartCountsQuery,

    useAllowRtoListingMutation,
    useAllowIndustryListingMutation,

    // Blogs
    useCreateBlogMutation,
    useGetBlogsQuery,
    useGetFeaturedBlogsQuery,
    useGetBlogDetailQuery,
    useRemoveBlogMutation,
    useRemoveFaqMutation,
    useBulkRemoveBlogMutation,
    useBulkDeleteBlogCategoriesMutation,
    useUpdateBlogMutation,
    useAddBlogTagsMutation,
    useGetTagsQuery,
    useAddBlogCategoriesMutation,
    useDeleteBlogCategoryMutation,
    useGetCategoriesQuery,
    useGetBlogsCountQuery,

    // Departments
    useGetDepartmentCoordinatorsQuery,
    useAddDepartmentMutation,
    useGetDepartmentsQuery,
    useGetDepartmentDetailsQuery,
    useGetDeptCoordinatorsListQuery,
    useGetDeptCoordinatorsDropdownListQuery,
    useToggleHodMutation,
    useChangeHodMutation,
    useRemoveDepartmentCoordinatorMutation,
    useAddDepartmentMembersMutation,
    useGetDepartmentCountsQuery,
    useGetDepartmentChartStatsQuery,
    useDepartmentCoursesQuery,
    useGetDepartmentStudentsForMapQuery,
    useGetDepartmentIndustriesForMapQuery,
    useGetDepartmentFutureIndustriesForMapQuery,
    useGetStudentsSuburbsForMapQuery,
    useDeleteDepartmentMutation,
    useGetDeptStudentsListQuery,
    useGetDepartmentSectorsQuery,

    // ------ RTO ------ //
    useRtoCountQuery,
    useRtosQuery,
    useRtoDetailQuery,
    useRtosApprovedQuery,
    useRtoRemoveMutation,
    useRtoAutoCompleteMutation,
    useAllowUpdationMutation,
    useRtoStatisticsCountQuery,
    useRtoStatusChangeMutation,
    useRtoStudentsLogsListQuery,
    useRtoAllowPermissionsMutation,
    useRtoCreateAssessmentToolsMutation,
    useRtoUpdateAssessmentToolsMutation,
    useRtoRemoveAssessmentToolsMutation,
    useRtoAssessmentToolArchiveMutation,
    useCheckStudentEmailMutation,

    useRtoSectorsQuery,
    useRtoAssignCoursesMutation,
    useRtoUnassignCourseMutation,
    useRtoImportStudentsMutation,
    useRtoImportStudentExistingEmailCheckMutation,
    useRtoAddStudentMutation,

    useRtoSubAdminsQuery,
    useRtoAssignSubAdminsMutation,
    useRtoUnassignSubAdminsMutation,
    useRtoProfileSubAdminsQuery,
    useRtoProfileDetailQuery,

    useRtoAssessmentToolsQuery,

    // ------ STUDENT ------ //
    useStudentCountQuery,
    useStudentsQuery,
    useStudentProfileQuery,
    useCompletedStudentsQuery,
    useGetSnoozedStudentsQuery,
    useGetUnassignedStudentsQuery,
    useStudentStatusChangeMutation,
    useStudentRemoveMutation,

    useFilteredStudentsQuery,

    useStudentSectorsQuery,
    useStudentAssignCoursesMutation,
    useStudentUnassignCoursesMutation,

    useStudentsRequiredDocsDetailQuery,
    useStudentCourseDetailQuery,
    useStudentUpcomingAppointmentsQuery,

    // ------ INDUSTRY ------ //
    useIndustryStatisticsCountQuery,
    useIndustriesQuery,
    useSnoozedIndustriesQuery,
    useIndustryCountQuery,
    useIndustryDetailQuery,
    useIndustrySectorsQuery,
    useIndustryRemoveMutation,
    useIndustryStudentsQuery,
    useGetIndustryShiftsQuery,
    useAddIndustryShiftMutation,
    useRemoveIndustryShiftMutation,
    useGetIndustryQuestionsQuery,
    useIndustryStatusChangeMutation,
    useSaveIndustryQuestionsMutation,
    useGetIndutryAvailableHoursQuery,
    useAddIndutryAvailableHoursMutation,
    useIndustryAssignCoursesMutation,
    useIndustryUnassignCourseMutation,
    useVolunteerIsReadMutation,

    // ----- RPL ----- //
    useRplRequestListQuery,
    useRplDeleteMutation,
    useRplCountQuery,
    useRplIsReadMutation,

    // ------ SECTOR ------ //
    useSectorsQuery,
    useSectorDetailQuery,
    useSectorAddMutation,
    useSectorUpdateMutation,
    useSectorRemoveMutation,

    // ------ COURSES ------ //
    useCoursesQuery,
    useCourseDetailQuery,
    useCourseAddMutation,
    useCourseUpdateMutation,
    useCourseRemoveMutation,

    // ------ SUBSCRIBERS ------ //
    useListSubscribersQuery,
    useResubscribeMutation,
    useUnsubscribeMutation,
    useSubscribeMutation,

    // ------ SUB ADMINS ------ //
    useToggleCanViewRtoListMutation,
    useToggleCanAccessRTOProfileMutation,
    useToggleCanDownloadReportMutation,
    useToggleCanViewStudentDetailMutation,
    useToggleCanViewIndustryDetailMutation,
    useToggleCanAccessRPLDetailMutation,
    useToggleCanAccessTalentPoolMutation,
    useToggleCanAccessQueriesMutation,
    useToggleCanAccessBlogsMutation,
    useToggleCanAccessSubAdminsMutation,
    useToggleCanAddStudentsMutation,
    useToggleCanCreateInternalTicketMutation,
    useSubAdminsQuery,
    useViewSummaryQuery,
    useSubAdminCountQuery,
    useSubAdminProfileQuery,
    useRemoveWithRtoMutation,
    useSubadminRemoveMutation,
    useCreateSubAdminMutation,
    useUpdateSubAdminMutation,
    useSubAdminAsAdminListQuery,
    useSubAdminsFilterListQuery,
    useSubAdminProfileCountQuery,
    useAssociatedWithRtoMutation,
    useSubadminWorkplaceListQuery,
    useToggleSubadminPlacementMutation,
    useToggleCanViewAllStudentsMutation,
    useToggleWPCancelationRequestMutation,
    useSubAdminExtendedStudentsListQuery,
    useToggleAutoWorkplaceAssignmentMutation,

    useSubAdminCoursesQuery,
    useSubAdminAssignCoursesMutation,
    useSubAdminUnAssignCoursesMutation,

    useSubAdminRtosQuery,
    useSubAdminAssignRtoMutation,
    useSubAdminUnassignRtoMutation,

    //------ WORKPLACE -----//
    useWorkplacesCountQuery,
    useAssignCourseMutation,
    useFilteredWorkplacesQuery,
    useCancelledWorkplacesQuery,
    useUnAssignedSubAdminsQuery,
    useAssignedRequestListQuery,
    useAssignedWorkplaceMutation,
    useUnAssignedWorkplaceListQuery,
    useAllRequestedWorkplaceListQuery,
    useWpCancellationRequestsListQuery,
    useGetSubadminForAssignWorkplaceQuery,
    useAllStudentProvidedWorkplaceListQuery,
    useChangeStatusForWPCancelationRequestMutation,

    // ------ FOLDERS ------ //
    useFolderAddMutation,
    useFolderUpdateMutation,
    useAssessmentEvidenceUpdateMutation,
    useFolderRemoveMutation,
    useIndustryChecklistAddMutation,
    useAssessmentEvidenceAddMutation,
    useRemoveAssessmentMutation,

    // ------ APPOINTMENT TYPES ------ //
    useAppointmentTypesQuery,
    useAppointmentTypeDetailQuery,
    useAppointmentTypeAddMutation,
    useAppointmentTypeRemoveMutation,
    useAppointmentTypeUpdateMutation,

    // ------ JOBS ------ //
    useJobsQuery,
    useJobApplicantsQuery,
    useJobStatusChangeMutation,

    // --- VOLUNTEER --- //
    useGetVolunteerRequestsQuery,
    useRequestVolunteerCountQuery,
    useChangeVolunteerRequestStatusMutation,

    // ----- SMS ----- //
    useSendSMSMutation,

    // ---- DOCUMENTS ---- //
    useAddDocumentsMutation,
    useGetDocumentsQuery,

    // ---- TALENT POOL ---- //
    useGetTalentPoolListQuery,
    useDeleteTalentPoolProfileMutation,
    useGetTalentPoolProfileQuery,
    useGetTalentPoolProfilesCountQuery,
    useReadTalentPoolProfilesCountMutation,

    // ----- GENERATE KEY ----- //
    useGetKeysQuery,
    useGenerateKeyMutation,
    useDeactivateGeneratedKeyMutation,

    // ---- RTO-OBSERVER ---- //
    useRtoObserverListQuery,
    useAddRtoObserverMutation,
    useRemoveRtoObserverMutation,
    useUpdateRtoObserverMutation,

    // ---- INSURANCE ---- //
    useGetInsuranceTypeQuery,
    useAddInsuranceTypeMutation,
    useGetRtoByInsuranceTypeQuery,
    useGetIndustriesByInsuranceTypeQuery,
} = adminApi

export const AdminApi = {
    Admin: {
        useCount: useStatisticsQuery,
        useProfile: useGetProfileQuery,
        useUpdateProfile: useUpdateAdminProfileMutation,
        useSectorsStudentsCount: useSectorsStudentsCountQuery,
        useAllowRtoListing: useAllowRtoListingMutation,
        allowIndustryListing: useAllowIndustryListingMutation,
        useDashboardChartCounts: useGetDashboardChartCountsQuery,
    },
    Department: {
        useDepartmentCoordinators: useGetDepartmentCoordinatorsQuery,
        useAddDepartment: useAddDepartmentMutation,
        useDepartments: useGetDepartmentsQuery,
        useDepartmentDetails: useGetDepartmentDetailsQuery,
        useDeptCoordinatorsList: useGetDeptCoordinatorsListQuery,
        useDeptCoordinatorsDropdownList:
            useGetDeptCoordinatorsDropdownListQuery,
        useToggleHod: useToggleHodMutation,
        useChangeHod: useChangeHodMutation,
        useRemoveDepartmentCoordinator: useRemoveDepartmentCoordinatorMutation,
        useAddDepartmentMembers: useAddDepartmentMembersMutation,
        useDepartmentCounts: useGetDepartmentCountsQuery,
        useDepartmentChartStats: useGetDepartmentChartStatsQuery,
        useDepartmentCourses: useDepartmentCoursesQuery,
        useDepartmentStudentsForMap: useGetDepartmentStudentsForMapQuery,
        useDepartmentIndustriesForMap: useGetDepartmentIndustriesForMapQuery,
        useDepartmentFutureIndustriesForMap:
            useGetDepartmentFutureIndustriesForMapQuery,
        useStudentsSuburbsForMap: useGetStudentsSuburbsForMapQuery,
        useDeleteDepartment: useDeleteDepartmentMutation,
        useDeptStudentsList: useGetDeptStudentsListQuery,
        useDepartmentSectors: useGetDepartmentSectorsQuery,
    },
    Rtos: {
        useCountQuery: useRtoCountQuery,
        useStatisticsCount: useRtoStatisticsCountQuery,
        useListQuery: useRtosQuery,
        useApprovedList: useRtosApprovedQuery,
        useDetailQuery: useRtoDetailQuery,
        useChangeStatusMutation: useRtoStatusChangeMutation,
        useRtoStudentsLogsList: useRtoStudentsLogsListQuery,
        allowPermissions: useRtoAllowPermissionsMutation,
        useRemove: useRtoRemoveMutation,
        rtoAutoComplete: useRtoAutoCompleteMutation,
        useCreateAssessmentTools: useRtoCreateAssessmentToolsMutation,
        useAllowUpdation: useAllowUpdationMutation,
        useUpdateAssessmentTools: useRtoUpdateAssessmentToolsMutation,
        useRemoveAssessmentTools: useRtoRemoveAssessmentToolsMutation,
        useArchiveAssessmentTools: useRtoAssessmentToolArchiveMutation,
        useRtoImportStudents: useRtoImportStudentsMutation,
        useRtoAddStudent: useRtoAddStudentMutation,
        useRtoStudentAccountCheck:
            useRtoImportStudentExistingEmailCheckMutation,
        useCheckStudentEmail: useCheckStudentEmailMutation,

        useSectors: useRtoSectorsQuery,
        useAssignCourses: useRtoAssignCoursesMutation,
        useUnassignCourses: useRtoUnassignCourseMutation,

        useSubAdmins: useRtoSubAdminsQuery,
        useAssignSubAdmin: useRtoAssignSubAdminsMutation,
        useUnAssignSubAdmin: useRtoUnassignSubAdminsMutation,
        useRtoProfileSubAdmins: useRtoProfileSubAdminsQuery,

        useRtoAssessmentTools: useRtoAssessmentToolsQuery,
    },

    Students: {
        useListQuery: useStudentsQuery,
        useProfile: useStudentProfileQuery,
        useCountQuery: useStudentCountQuery,
        useRemove: useStudentRemoveMutation,
        useSnoozedStudents: useGetSnoozedStudentsQuery,
        useCompletedStudents: useCompletedStudentsQuery,
        useChangeStatusMutation: useStudentStatusChangeMutation,
        useUnAssignedStudentsList: useGetUnassignedStudentsQuery,

        useFilteredStudents: useFilteredStudentsQuery,

        useSectors: useStudentSectorsQuery,
        useAssignCourses: useStudentAssignCoursesMutation,
        useUnassignCourses: useStudentUnassignCoursesMutation,
        studentsRequiredDocsDetail: useStudentsRequiredDocsDetailQuery,
        studentCourseDetail: useStudentCourseDetailQuery,
    },

    SubAdmins: {
        useListQuery: useSubAdminsQuery,
        useCanViewRtoList: useToggleCanViewRtoListMutation,
        useAccessRtoProfile: useToggleCanAccessRTOProfileMutation,
        useCanDownloadReport: useToggleCanDownloadReportMutation,
        useCanViewStudentDetail: useToggleCanViewStudentDetailMutation,
        useCanViewIndustryDetail: useToggleCanViewIndustryDetailMutation,
        useCanAccessRPLDetail: useToggleCanAccessRPLDetailMutation,
        useCanAccessTalentPool: useToggleCanAccessTalentPoolMutation,
        useCanAccessQueries: useToggleCanAccessQueriesMutation,
        useCanAccessBlogs: useToggleCanAccessBlogsMutation,
        useCanAddStudents: useToggleCanAddStudentsMutation,
        useToggleInternalTicket: useToggleCanCreateInternalTicketMutation,
        useToggleCanAccessSubAdmins: useToggleCanAccessSubAdminsMutation,
        useSubAdminAsAdminList: useSubAdminAsAdminListQuery,
        useSubAdminsFilterList: useSubAdminsFilterListQuery,
        useCountQuery: useSubAdminCountQuery,
        useProfileCount: useSubAdminProfileCountQuery,
        createSubAmin: useCreateSubAdminMutation,
        useSubadminProfile: useSubAdminProfileQuery,
        useUpdate: useUpdateSubAdminMutation,
        useRemove: useSubadminRemoveMutation,
        useRemoveWithRto: useRemoveWithRtoMutation,
        useAssociatedWithRto: useAssociatedWithRtoMutation,
        useSubadminWorkplaceList: useSubadminWorkplaceListQuery,
        useCanViewAllStudents: useToggleCanViewAllStudentsMutation,
        useToggleSubadminPlacement: useToggleSubadminPlacementMutation,
        toggleWPCancelationReq: useToggleWPCancelationRequestMutation,
        subadminExtendedStudents: useSubAdminExtendedStudentsListQuery,
        useToggleAutoAssignWorkplace: useToggleAutoWorkplaceAssignmentMutation,

        useCourses: useSubAdminCoursesQuery,
        useAssignCourses: useSubAdminAssignCoursesMutation,
        useUnassignCourse: useSubAdminUnAssignCoursesMutation,

        useRtos: useSubAdminRtosQuery,
        useAssignRto: useSubAdminAssignRtoMutation,
        useUnassignRto: useSubAdminUnassignRtoMutation,
        useSummary: useViewSummaryQuery,
    },
    Workplace: {
        workplacesCount: useWorkplacesCountQuery,
        assignCourse: useAssignCourseMutation,
        useListQuery: useUnAssignedSubAdminsQuery,
        cancelledWorkplaces: useCancelledWorkplacesQuery,
        useWorkplaceMutation: useAssignedWorkplaceMutation,
        useAssignedWorkplace: useAssignedRequestListQuery,
        useFilteredWorkplaces: useFilteredWorkplacesQuery,
        useUnAssignedWorkplace: useUnAssignedWorkplaceListQuery,
        useRequestedWorkplace: useAllRequestedWorkplaceListQuery,
        wpCancelationRequestsList: useWpCancellationRequestsListQuery,
        subadminForAssignWorkplace: useGetSubadminForAssignWorkplaceQuery,
        useStudentProvidedWorkplace: useAllStudentProvidedWorkplaceListQuery,
        changeStatusCancelationReq:
            useChangeStatusForWPCancelationRequestMutation,
    },

    Industries: {
        useCount: useIndustryCountQuery,
        useListQuery: useIndustriesQuery,
        useDetail: useIndustryDetailQuery,
        useRemove: useIndustryRemoveMutation,
        industryStudents: useIndustryStudentsQuery,
        useRemoveShift: useRemoveIndustryShiftMutation,
        useGetIndustryShifts: useGetIndustryShiftsQuery,
        useAddIndustryShift: useAddIndustryShiftMutation,
        useIndustryQuestions: useGetIndustryQuestionsQuery,
        useIndustrySectors: useIndustrySectorsQuery,
        useSnoozedIndustry: useSnoozedIndustriesQuery,
        useStatusChange: useIndustryStatusChangeMutation,
        useAssignCourses: useIndustryAssignCoursesMutation,
        useStatisticsCount: useIndustryStatisticsCountQuery,
        useUnassignCourses: useIndustryUnassignCourseMutation,
        saveIndustryQuestions: useSaveIndustryQuestionsMutation,
        useAddIndustryHours: useAddIndutryAvailableHoursMutation,
        useIndustryAvailableHours: useGetIndutryAvailableHoursQuery,
    },

    Rpl: {
        useRplList: useRplRequestListQuery,
        useRemoveRpl: useRplDeleteMutation,
        useRplCount: useRplCountQuery,
        useRplRead: useRplIsReadMutation,
    },

    Subscribers: {
        useListQuery: useListSubscribersQuery,
        useResubscribeMutation,
        useUnsubscribeMutation,
        useSubscribe: useSubscribeMutation,
    },

    Sectors: {
        useListQuery: useSectorsQuery,
        useDetailQuery: useSectorDetailQuery,
        useAddMutation: useSectorAddMutation,
        useUpdateMutation: useSectorUpdateMutation,
        useRemoveMutation: useSectorRemoveMutation,
    },

    Courses: {
        useListQuery: useCoursesQuery,
        useDetailQuery: useCourseDetailQuery,
        useAddMutation: useCourseAddMutation,
        useUpdateMutation: useCourseUpdateMutation,
        useRemoveMutation: useCourseRemoveMutation,
    },

    Folders: {
        useCreate: useFolderAddMutation,
        useUpdate: useFolderUpdateMutation,
        useAssessMentUpdate: useAssessmentEvidenceUpdateMutation,
        useRemove: useFolderRemoveMutation,
        useRemoveAssessment: useRemoveAssessmentMutation,
        useIndustryChecklistAdd: useIndustryChecklistAddMutation,
        useAssessMentEvidence: useAssessmentEvidenceAddMutation,
    },

    AppointmentTypes: {
        useList: useAppointmentTypesQuery,
        useDetail: useAppointmentTypeDetailQuery,
        useCreate: useAppointmentTypeAddMutation,
        useUpdate: useAppointmentTypeUpdateMutation,
        useRemove: useAppointmentTypeRemoveMutation,
    },

    Jobs: {
        useList: useJobsQuery,
        useJobApplicants: useJobApplicantsQuery,
        useStatusChange: useJobStatusChangeMutation,
    },
    Volunteer: {
        useList: useGetVolunteerRequestsQuery,
        useVolunteerRead: useVolunteerIsReadMutation,
        useVolunteerCount: useRequestVolunteerCountQuery,
        changeRequestStatus: useChangeVolunteerRequestStatusMutation,
    },
    SMS: {
        sendSMS: useSendSMSMutation,
    },
    Documents: {
        addDocuments: useAddDocumentsMutation,
        useGetDocuments: useGetDocumentsQuery,
    },
    TalentPool: {
        useTalentPoolRequests: useGetTalentPoolListQuery,
        useDeleteTalentPoolProfile: useDeleteTalentPoolProfileMutation,
        useGetTalentPoolProfile: useGetTalentPoolProfileQuery,
        useTalentProfilesCount: useGetTalentPoolProfilesCountQuery,
        useReadTalentPoolProfilesCount: useReadTalentPoolProfilesCountMutation,
    },
    Blogs: {
        useBlogsCount: useGetBlogsCountQuery,
    },
    GenerateKey: {
        getKeys: useGetKeysQuery,
        generateKey: useGenerateKeyMutation,
        useDeactivateKey: useDeactivateGeneratedKeyMutation,
    },
    RtoObserver: {
        useObserList: useRtoObserverListQuery,
        useRemove: useRemoveRtoObserverMutation,
        useAddRtoObserver: useAddRtoObserverMutation,
        useUpdateRtoObserver: useUpdateRtoObserverMutation,
    },
    Insurance: {
        getInsuranceType: useGetInsuranceTypeQuery,
        addInsuranceType: useAddInsuranceTypeMutation,
        getRtoByInsuranceType: useGetRtoByInsuranceTypeQuery,
        industriesByInsuranceType: useGetIndustriesByInsuranceTypeQuery,
    },
}
