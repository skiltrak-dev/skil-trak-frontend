import React, { useState } from 'react'
import { AdminApi, CommonApi } from '@queries'
import { SubAdmin } from '@types'
import { useNotification } from '@hooks'

export const usePermission = () => {
    const { notification } = useNotification()

    const [result, setResult] = useState<any>(null)

    const [allowRtoListing, allowRtoListingResult] =
        AdminApi.Admin.useAllowRtoListing()

    const [allowIndustryListing, allowIndustryListingResult] =
        AdminApi.Admin.allowIndustryListing()
    const [canAdmin, resultCanAdmin] = CommonApi.Impersonation.useAllowAsAdmin()
    const [canLogin, canLoginResult] = CommonApi.AllowLogin.useAllowAsLogin()
    const [allowPlacement, allowPlacementResult] =
        AdminApi.SubAdmins.useToggleSubadminPlacement()
    const [allowWpCancelationReq, allowWpCancelationReqResult] =
        AdminApi.SubAdmins.toggleWPCancelationReq()
    const [autoAssignWorkplace, resultAutoAssignWorkplace] =
        AdminApi.SubAdmins.useToggleAutoAssignWorkplace()

    const [canAccessBlogs, resultCanAccessBlogs] =
        AdminApi.SubAdmins.useCanAccessBlogs()

    const [canAccessQueries, resultCanAccessQueries] =
        AdminApi.SubAdmins.useCanAccessQueries()

    const [canAccessRPL, resultCanAccessRPL] =
        AdminApi.SubAdmins.useCanAccessRPLDetail()

    const [canAccessTalentPool, resultCanAccessTalentPool] =
        AdminApi.SubAdmins.useCanAccessTalentPool()

    const [canDownloadReport, resultCanDownloadReport] =
        AdminApi.SubAdmins.useCanDownloadReport()

    const [canViewIndustryDetail, resultCanViewIndustryDetail] =
        AdminApi.SubAdmins.useCanViewIndustryDetail()

    const [canViewStudentDetail, resultCanViewStudentDetail] =
        AdminApi.SubAdmins.useCanViewStudentDetail()

    const [canViewRTODetail, resultCanViewRTODetail] =
        AdminApi.SubAdmins.useAccessRtoProfile()

    const onCanViewRTODetailClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanViewRTODetail)
        canViewRTODetail(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View RTO Detail.`,
                })
            }
        })
    }

    const onCanViewStudentDetailClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanViewStudentDetail)
        canViewStudentDetail(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View Student Detail.`,
                })
            }
        })
    }

    const onCanViewIndustryDetailClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanViewIndustryDetail)
        canViewIndustryDetail(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For View Industry Detail.`,
                })
            }
        })
    }

    const onCanReportDownloadClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanDownloadReport)
        canDownloadReport(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For Report Download.`,
                })
            }
        })
    }

    const onCanAccessTalentPoolClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanAccessTalentPool)
        canAccessTalentPool(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Changed Status For Talent Pool.`,
                })
            }
        })
    }

    const onCanAccessRPLClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanAccessRPL)
        canAccessRPL(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For RPL.`,
                })
            }
        })
    }

    const onCanAccessQueriesClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanAccessQueries)
        canAccessQueries(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For Queries.`,
                })
            }
        })
    }

    const onCanAccessBlogsClicked = (subAdmin: SubAdmin) => {
        setResult(resultCanAccessBlogs)
        canAccessBlogs(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `subAdmin "${subAdmin?.user?.name}" Change Status For Blogs.`,
                })
            }
        })
    }

    const onAllowRtoListingClicked = (subAdmin: SubAdmin) => {
        setResult(allowRtoListingResult)
        allowRtoListing(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed for Rto Listing`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed for RTO Listing.`,
                })
            }
        })
    }

    const onAllowIndustryListingClicked = async (subAdmin: SubAdmin) => {
        setResult(allowIndustryListingResult)
        await allowIndustryListing(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed for Industry Listing`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed for Industry Listing.`,
                })
            }
        })
    }

    const onAllowAsAdminClicked = async (subAdmin: SubAdmin) => {
        setResult(resultCanAdmin)
        await canAdmin(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `subAdmin Allowed As Admin`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed as Admin.`,
                })
            }
        })
    }

    const onAllowLoginClicked = async (subAdmin: SubAdmin) => {
        setResult(canLoginResult)
        await canLogin(subAdmin?.user?.id).then((res: any) => {
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

    const onAllowPlacementClicked = async (subAdmin: SubAdmin) => {
        setResult(allowPlacementResult)
        await allowPlacement(subAdmin?.id).then((res: any) => {
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

    const onAllowWpCancelationClicked = async (subAdmin: SubAdmin) => {
        setResult(allowWpCancelationReqResult)
        await allowWpCancelationReq(subAdmin?.id).then((res: any) => {
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

    const onAutoAssignClicked = async (subAdmin: SubAdmin) => {
        setResult(resultAutoAssignWorkplace)
        await autoAssignWorkplace(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed to Auto Assign Workplace`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed to Auto Assign Workplace`,
                })
            }
        })
    }

    const isLoading =
        allowRtoListingResult.isLoading ||
        allowIndustryListingResult.isLoading ||
        resultCanAdmin.isLoading ||
        canLoginResult.isLoading ||
        allowPlacementResult.isLoading ||
        allowWpCancelationReqResult.isLoading ||
        resultAutoAssignWorkplace.isLoading

    return {
        onAllowRtoListingClicked,
        onAllowIndustryListingClicked,
        onAllowAsAdminClicked,
        onAllowLoginClicked,
        onAllowPlacementClicked,
        onAllowWpCancelationClicked,
        onAutoAssignClicked,
        onCanViewRTODetailClicked,
        onCanViewStudentDetailClicked,
        onCanViewIndustryDetailClicked,
        onCanReportDownloadClicked,
        onCanAccessTalentPoolClicked,
        onCanAccessRPLClicked,
        onCanAccessQueriesClicked,
        onCanAccessBlogsClicked,
        result,
        allowRtoListingResult,
        allowIndustryListingResult,
        resultCanAdmin,
        canLoginResult,
        allowPlacementResult,
        allowWpCancelationReqResult,
        resultAutoAssignWorkplace,
        resultCanAccessBlogs,
        resultCanAccessQueries,
        resultCanAccessRPL,
        resultCanAccessTalentPool,
        resultCanDownloadReport,
        resultCanViewIndustryDetail,
        resultCanViewStudentDetail,
        resultCanViewRTODetail,
        isLoading,
    }
}
