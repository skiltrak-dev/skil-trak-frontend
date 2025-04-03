import { useNotification } from '@hooks'
import { SubAdmin } from '@types'
import { usePermissionQueries } from './usePermissionQueries'

export const usePermission = () => {
    const { notification } = useNotification()

    const { queries, results } = usePermissionQueries()

    const onIsManagerClicked = (subAdmin: SubAdmin) => {
        queries.toggleManager(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For Manager.`,
                })
            }
        })
    }
    const onCanGlobalSearchClicked = (subAdmin: SubAdmin) => {
        queries.canGlobalSearch(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View RTO Detail.`,
                })
            }
        })
    }

    const onCanViewRTODetailClicked = (subAdmin: SubAdmin) => {
        queries.canViewRTODetail(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View RTO Detail.`,
                })
            }
        })
    }

    const onCanViewStudentDetailClicked = (subAdmin: SubAdmin) => {
        queries.canViewStudentDetail(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View Student Detail.`,
                })
            }
        })
    }

    const onCanViewIndustryDetailClicked = (subAdmin: SubAdmin) => {
        queries.canViewIndustryDetail(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View Industry Detail.`,
                })
            }
        })
    }

    const onCanReportDownloadClicked = (subAdmin: SubAdmin) => {
        queries.canDownloadReport(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For Report Download.`,
                })
            }
        })
    }

    const onCanAccessTalentPoolClicked = (subAdmin: SubAdmin) => {
        queries.canAccessTalentPool(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For Talent Pool.`,
                })
            }
        })
    }

    const onCanAccessRPLClicked = (subAdmin: SubAdmin) => {
        queries.canAccessRPL(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For RPL.`,
                })
            }
        })
    }

    const onCanAccessQueriesClicked = (subAdmin: SubAdmin) => {
        queries.canAccessQueries(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For Queries.`,
                })
            }
        })
    }

    const onCanAccessBlogsClicked = (subAdmin: SubAdmin) => {
        queries.canAccessBlogs(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For Blogs.`,
                })
            }
        })
    }

    const onCanAccessSubAdminClicked = (subAdmin: SubAdmin) => {
        queries.canAccessSubAdmin(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For SubAdmins.`,
                })
            }
        })
    }
    const onAllowRtoListingClicked = (subAdmin: SubAdmin) => {
        queries.allowRtoListing(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed for Rto Listing`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed for RTO Listing.`,
                })
            }
        })
    }

    const onAllowIndustryListingClicked = (subAdmin: SubAdmin) => {
        queries.allowIndustryListing(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed for Industry Listing`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed for Industry Listing.`,
                })
            }
        })
    }

    const onAllowAsAdminClicked = (subAdmin: SubAdmin) => {
        queries.canAdmin(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `subAdmin Allowed As Admin`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed as Admin.`,
                })
            }
        })
    }

    const onAllowLoginClicked = (subAdmin: SubAdmin) => {
        queries.canLogin(subAdmin?.user?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `subAdmin Allowed As Admin`,
                    description: `subAdmin "${
                        subAdmin?.user?.name
                    }" login access has been ${
                        subAdmin?.user?.after_hours_access
                            ? 'removed'
                            : 'provided'
                    }.`,
                })
            }
        })
    }

    const onAllowPlacementClicked = (subAdmin: SubAdmin) => {
        queries.allowPlacement(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: subAdmin?.removeOnPlacementStart
                        ? `subAdmin Placement Removed`
                        : 'subAdmin Placement Accessed',
                    description: subAdmin?.removeOnPlacementStart
                        ? `subAdmin Placement Removed`
                        : 'subAdmin Placement Accessed',
                })
            }
        })
    }

    const onAllowWpCancelationClicked = (subAdmin: SubAdmin) => {
        queries.allowWpCancelationReq(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: subAdmin?.canCancelWorkPlaceRequest
                        ? `SubAdmin Wp Cancelation Removed`
                        : 'SubAdmin Wp Cancelation Accessed',
                    description: subAdmin?.canCancelWorkPlaceRequest
                        ? `SubAdmin Cancelation Removed`
                        : 'SubAdmin Cancelation Accessed',
                })
            }
        })
    }

    const onAutoAssignClicked = (subAdmin: SubAdmin) => {
        queries.autoAssignWorkplace(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed to Auto Assign Workplace`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed to Auto Assign Workplace`,
                })
            }
        })
    }

    const onCanAddStudentsClicked = (subAdmin: SubAdmin) => {
        queries.canAddStudents(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: subAdmin.canAddStudents
                        ? `SubAdmin Allowed to Add Students`
                        : `SubAdmin removed to Add Students`,
                    description: subAdmin.canAddStudents
                        ? `subAdmin "${subAdmin?.user?.name}" has been Allowed to Add Students`
                        : `subAdmin "${subAdmin?.user?.name}" has been Removed to Add Students`,
                })
            }
        })
    }

    const onCanViewAllStudentsClicked = (subAdmin: SubAdmin) => {
        queries.canViewAllStudents(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For SubAdmins.`,
                })
            }
        })
    }

    const onCanCreateInternalTicketClicked = (subAdmin: SubAdmin) => {
        queries.canToggleInternalTicket(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For SubAdmins.`,
                })
            }
        })
    }

    const onCanViewRtoList = (subAdmin: SubAdmin) => {
        queries.canToggleRtoList(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For SubAdmins.`,
                })
            }
        })
    }

    return {
        results,
        Actions: {
            onIsManagerClicked,
            onCanViewRtoList,
            onCanViewAllStudentsClicked,
            onAllowRtoListingClicked,
            onAllowIndustryListingClicked,
            onAllowAsAdminClicked,
            onAllowLoginClicked,
            onAllowPlacementClicked,
            onAllowWpCancelationClicked,
            onAutoAssignClicked,
            onCanViewRTODetailClicked,
            onCanGlobalSearchClicked,
            onCanViewStudentDetailClicked,
            onCanViewIndustryDetailClicked,
            onCanReportDownloadClicked,
            onCanAccessTalentPoolClicked,
            onCanAccessRPLClicked,
            onCanAccessQueriesClicked,
            onCanAccessBlogsClicked,
            onCanAccessSubAdminClicked,
            onCanAddStudentsClicked,
            onCanCreateInternalTicketClicked,
        },
    }
}
