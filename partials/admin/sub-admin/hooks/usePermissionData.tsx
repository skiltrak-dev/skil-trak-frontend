import { FaSchool } from 'react-icons/fa'
import { MdAdminPanelSettings, MdOutlineAssignmentReturn } from 'react-icons/md'
import { usePermission } from '../hooks'
import { SubAdmin } from '@types'
import { SubAdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { useCheckPermission } from '@partials/admin/hooks'

export const usePermissionData = (subadmin: SubAdmin) => {
    const { Actions, results } = usePermission()
    const role = getUserCredentials()?.role
    const subAdmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })
    const {
        isAdmin,
        isHod,
        subAdminRole,
        permissions: truePermissions,
    } = useCheckPermission()

    const allPermissions = [
        {
            text: 'Allow Rto Listing',
            onClick: () => Actions?.onAllowRtoListingClicked(subadmin),
            toggle: subadmin?.allowRtoListing,
            isLoading: results?.allowRtoListingResult.isLoading,
            Icon: FaSchool,
            key: 'allowRtoListing',
        },
        {
            key: 'allowIndustryListing',
            text: 'Allow Industry Listing',
            onClick: () => Actions?.onAllowIndustryListingClicked(subadmin),
            toggle: subadmin?.allowIndustryListing,
            isLoading: results?.allowIndustryListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            key: 'canAdmin',
            text: 'Allow as Admin',
            onClick: () => Actions?.onAllowAsAdminClicked(subadmin),
            toggle: subadmin?.canAdmin,
            isLoading: results?.resultCanAdmin.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            key: 'allowLogin',
            text: 'Allow Login',
            onClick: () => Actions?.onAllowLoginClicked(subadmin),
            toggle: subadmin?.user?.after_hours_access,
            isLoading: results?.canLoginResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            key: 'removeOnPlacementStart',
            text: 'Remove on Placement Started',
            onClick: () => Actions?.onAllowPlacementClicked(subadmin),
            toggle: subadmin?.removeOnPlacementStart,
            isLoading: results?.allowPlacementResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            key: 'canCancelWorkPlaceRequest',
            text: 'Allow Cancelation Workplace',
            onClick: () => Actions?.onAllowWpCancelationClicked(subadmin),
            toggle: subadmin?.canCancelWorkPlaceRequest,
            isLoading: results?.allowWpCancelationReqResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            key: 'allowAutoAssignment',
            text: 'Allow Auto Assignment',
            onClick: () => Actions?.onAutoAssignClicked(subadmin),
            toggle: subadmin?.allowAutoAssignment,
            isLoading: results?.resultAutoAssignWorkplace.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canViewAllStudents',
            text: 'Can View All Students',
            onClick: () => Actions?.onCanViewAllStudentsClicked(subadmin),
            toggle: subadmin?.canViewAllStudents,
            isLoading: results?.resultCanViewAllStudents.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAccessRtoProfile',
            text: 'Can Access RTO Profile',
            onClick: () => Actions?.onCanViewRTODetailClicked(subadmin),
            toggle: subadmin?.canAccessRtoProfile,
            isLoading: results?.resultCanViewRTODetail.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canDownloadReport',
            text: 'Can Download Report',
            onClick: () => Actions?.onCanReportDownloadClicked(subadmin),
            toggle: subadmin?.canDownloadReport,
            isLoading: results?.resultCanDownloadReport.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canViewStudentDetails',
            text: 'Can View Student Detail',
            onClick: () => Actions?.onCanViewStudentDetailClicked(subadmin),
            toggle: subadmin?.canViewStudentDetails,
            isLoading: results?.resultCanViewStudentDetail.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canViewIndustryDetails',
            text: 'Can View Industry Detail',
            onClick: () => Actions?.onCanViewIndustryDetailClicked(subadmin),
            toggle: subadmin?.canViewIndustryDetails,
            isLoading: results?.resultCanViewIndustryDetail.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAccessRpl',
            text: 'Can Access RPL Detail',
            onClick: () => Actions?.onCanAccessRPLClicked(subadmin),
            toggle: subadmin?.canAccessRpl,
            isLoading: results?.resultCanAccessRPL.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAccessTalentPool',
            text: 'Can Access Talent Pool',
            onClick: () => Actions?.onCanAccessTalentPoolClicked(subadmin),
            toggle: subadmin?.canAccessTalentPool,
            isLoading: results?.resultCanAccessTalentPool.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAccessQueries',
            text: 'Can Access Queries',
            onClick: () => Actions?.onCanAccessQueriesClicked(subadmin),
            toggle: subadmin?.canAccessQueries,
            isLoading: results?.resultCanAccessQueries.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAccessBlogs',
            text: 'Can Access Blogs',
            onClick: () => Actions?.onCanAccessBlogsClicked(subadmin),
            toggle: subadmin?.canAccessBlogs,
            isLoading: results?.resultCanAccessBlogs.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAccessSubadmin',
            text: 'Can Access SubAdmin',
            onClick: () => Actions?.onCanAccessSubAdminClicked(subadmin),
            toggle: subadmin?.canAccessSubadmin,
            isLoading: results?.resultCanAccessSubAdmin.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            key: 'canAddStudents',
            text: 'Can Add Students',
            onClick: () => Actions.onCanAddStudentsClicked(subadmin),
            toggle: subadmin?.canAddStudents,
            isLoading: results?.resultCanAddStudents.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can Create Internal Ticket',
            onClick: () => Actions.onCanCreateInternalTicketClicked(subadmin),
            toggle: subadmin?.canCreateInternalTicket,
            isLoading: results?.resultCanToggleInternalTicket.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
        {
            text: 'Can View Rto List',
            onClick: () => Actions.onCanViewRtoList(subadmin),
            toggle: subadmin?.canViewRtoList,
            isLoading: results?.resultCanToggleRtoList.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
    ]

    // const responses = Object.values(results)

    // return { permissions, responses }
    const filteredPermissions = allPermissions.filter((permission: any) => {
        if (role === UserRoles.ADMIN) {
            return true
        }
        if (subAdminRole && isAdmin && isHod) {
            // Check if the key exists in truePermissions and its value is true
            return (
                Object.prototype.hasOwnProperty.call(
                    truePermissions,
                    permission.key
                ) && truePermissions[permission.key] === true
            )
        }
        return false
    })

    const responses = Object.values(results)

    return { permissions: filteredPermissions, responses }
}
