import { AdminApi, CommonApi } from '@queries'

export const usePermissionQueries = () => {
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
    return {
        queries: {
            allowRtoListing,
            allowIndustryListing,
            canAdmin,
            canLogin,
            allowPlacement,
            allowWpCancelationReq,
            autoAssignWorkplace,
            canAccessBlogs,
            canAccessQueries,
            canAccessRPL,
            canAccessTalentPool,
            canDownloadReport,
            canViewIndustryDetail,
            canViewStudentDetail,
            canViewRTODetail,
        },
        results: {
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
        },
    }
}
