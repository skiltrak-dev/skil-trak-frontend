import { FaSchool } from 'react-icons/fa'
import { MdAdminPanelSettings, MdOutlineAssignmentReturn } from 'react-icons/md'
import { usePermission } from '../hooks'
import { SubAdmin } from '@types'

export const usePermissionData = (subadmin: SubAdmin) => {
    const { Actions, results } = usePermission()

    const permissions = [
        {
            text: 'Allow Rto Listing',
            onClick: () => Actions?.onAllowRtoListingClicked(subadmin),
            toggle: subadmin?.allowRtoListing,
            isLoading: results?.allowRtoListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Industry Listing',
            onClick: () => Actions?.onAllowIndustryListingClicked(subadmin),
            toggle: subadmin?.allowIndustryListing,
            isLoading: results?.allowIndustryListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow as Admin',
            onClick: () => Actions?.onAllowAsAdminClicked(subadmin),
            toggle: subadmin?.canAdmin,
            isLoading: results?.resultCanAdmin.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Login',
            onClick: () => Actions?.onAllowLoginClicked(subadmin),
            toggle: subadmin?.user?.after_hours_access,
            isLoading: results?.canLoginResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Student on Placement',
            onClick: () => Actions?.onAllowPlacementClicked(subadmin),
            toggle: subadmin?.removeOnPlacementStart,
            isLoading: results?.allowPlacementResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Cancelation Workplace',
            onClick: () => Actions?.onAllowWpCancelationClicked(subadmin),
            toggle: subadmin?.canCancelWorkPlaceRequest,
            isLoading: results?.allowWpCancelationReqResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Auto Assignment',
            onClick: () => Actions?.onAutoAssignClicked(subadmin),
            toggle: subadmin?.allowAutoAssignment,
            isLoading: results?.resultAutoAssignWorkplace.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Access RTO Profile',
            onClick: () => Actions?.onCanViewRTODetailClicked(subadmin),
            toggle: subadmin?.canAccessRtoProfile,
            isLoading: results?.resultCanViewRTODetail.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Download Report',
            onClick: () => Actions?.onCanReportDownloadClicked(subadmin),
            toggle: subadmin?.canDownloadReport,
            isLoading: results?.resultCanDownloadReport.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can View Student Detail',
            onClick: () => Actions?.onCanViewStudentDetailClicked(subadmin),
            toggle: subadmin?.canViewStudentDetails,
            isLoading: results?.resultCanViewStudentDetail.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can View Industry Detail',
            onClick: () => Actions?.onCanViewIndustryDetailClicked(subadmin),
            toggle: subadmin?.canViewIndustryDetails,
            isLoading: results?.resultCanViewIndustryDetail.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Access RPL Detail',
            onClick: () => Actions?.onCanAccessRPLClicked(subadmin),
            toggle: subadmin?.canAccessRpl,
            isLoading: results?.resultCanAccessRPL.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Access Talent Pool',
            onClick: () => Actions?.onCanAccessTalentPoolClicked(subadmin),
            toggle: subadmin?.canAccessTalentPool,
            isLoading: results?.resultCanAccessTalentPool.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Access Queries',
            onClick: () => Actions?.onCanAccessQueriesClicked(subadmin),
            toggle: subadmin?.canAccessQueries,
            isLoading: results?.resultCanAccessQueries.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Access Blogs',
            onClick: () => Actions?.onCanAccessBlogsClicked(subadmin),
            toggle: subadmin?.canAccessBlogs,
            isLoading: results?.resultCanAccessBlogs.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
    ]

    const responses = Object.values(results)

    return { permissions, responses }
}
