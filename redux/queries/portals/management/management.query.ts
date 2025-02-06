import { emptySplitApi } from '../empty.query'
import { documentsEndpoints } from './documents'
import { teamEndpoints } from './team'
import { checkKpiEndpoints } from './checkKpi'

export const managementApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        ...documentsEndpoints(build),
        ...teamEndpoints(build),
        ...checkKpiEndpoints(build),
    }),
})

const {
    // ----- DOCUMENTS ------- //
    useUploadKpiReportMutation,

    // ----- TEAM ------- //
    // Mutation
    useCreateTeamMutation,
    useCreateTeamMembersMutation,
    useUpdateTeamLeadMutation,
    useUpdateTeamNameMutation,
    useUpdateMemberTeamMutation,
    // Query
    useGetTeamsListQuery,
    useGetSubAdminListQuery,
    useGetTeamMembersListQuery,
    useGetTeamMembersDetailQuery,
    useGetSectorsListQuery,

    // ------ CHECK KPI -------- //

    // Mutation
    useAddFeedbackOnKpiReportMutation,
    useUpdateKpiTargetLimitMutation,
    useCreateKpiTargetLimitMutation,
    useDeleteKpiReportMutation,
    useDeleteTeamMutation,
    useDeleteBulkKpiReportMutation,
    useDeleteBulkTeamsMutation,
    // Query
    useGetKpiReportListQuery,
    useGetKpiReportDetailQuery,
    useGetSubAdminKpiReportsQuery,
    useGetKpiReportDuplicationDetailQuery,
    useGetKpiReportOverviewQuery,
    useGetManagementDashboardCountQuery,
    useGetKpiStatusBasedCountQuery,
    useGetKpiTargetsQuery,
    useGetKpiReportFeedbackQuery,
} = managementApi

export const ManagementApi = {
    Documents: {
        useUploadKpiReport: useUploadKpiReportMutation,
    },
    Team: {
        // Mutation
        useCreateTeam: useCreateTeamMutation,
        useCreateTeamMembers: useCreateTeamMembersMutation,
        useChangeTeamLead: useUpdateTeamLeadMutation,
        useUpdateTeamName: useUpdateTeamNameMutation,
        useUpdateMemberTeam: useUpdateMemberTeamMutation,
        // get Queries
        useTeamList: useGetTeamsListQuery,
        useSubAdminList: useGetSubAdminListQuery,
        useTeamMembersList: useGetTeamMembersListQuery,
        useTeamMemberDetail: useGetTeamMembersDetailQuery,
        useSectorsList: useGetSectorsListQuery,
    },
    CheckKpi: {
        useKpiReportList: useGetKpiReportListQuery,
        useSubAdminKpiReports: useGetSubAdminKpiReportsQuery,
        useKpiReportDetail: useGetKpiReportDetailQuery,
        useKpiReportDuplicationDetail: useGetKpiReportDuplicationDetailQuery,
        useKpiReportOverview: useGetKpiReportOverviewQuery,
        useAddFeedbackOnKpiReport: useAddFeedbackOnKpiReportMutation,
        useManagementDashboardCount: useGetManagementDashboardCountQuery,
        useKpiStatusBasedCount: useGetKpiStatusBasedCountQuery,
        useUpdateKpiTargetLimit: useUpdateKpiTargetLimitMutation,
        useCreateKpiTargetLimit: useCreateKpiTargetLimitMutation,
        useKpiTargets: useGetKpiTargetsQuery,
        useKpiReportFeedback: useGetKpiReportFeedbackQuery,
        useDeleteKpiReport: useDeleteKpiReportMutation,
        useDeleteTeam: useDeleteTeamMutation,
        useDeleteBulkKpiReport: useDeleteBulkKpiReportMutation,
        useDeleteBulkTeams: useDeleteBulkTeamsMutation,
    },
}
