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
    const [canAccessSubAdmin, resultCanAccessSubAdmin] =
        AdminApi.SubAdmins.useToggleCanAccessSubAdmins()
    const [canAddStudents, resultCanAddStudents] =
        AdminApi.SubAdmins.useCanAddStudents()
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
    const [canViewAllStudents, resultCanViewAllStudents] =
        AdminApi.SubAdmins.useCanViewAllStudents()
    const [canToggleInternalTicket, resultCanToggleInternalTicket] =
        AdminApi.SubAdmins.useToggleInternalTicket()
    const [canToggleRtoList, resultCanToggleRtoList] =
        AdminApi.SubAdmins.useCanViewRtoList()

    const [canGlobalSearch, resultCanGlobalSearch] =
        AdminApi.SubAdmins.toggleCanGlobalSearch()
    return {
        queries: {
            canGlobalSearch,
            canToggleRtoList,
            canToggleInternalTicket,
            allowRtoListing,
            canViewAllStudents,
            allowIndustryListing,
            canAdmin,
            canLogin,
            allowPlacement,
            allowWpCancelationReq,
            autoAssignWorkplace,
            canAccessBlogs,
            canAccessSubAdmin,
            canAccessQueries,
            canAccessRPL,
            canAccessTalentPool,
            canDownloadReport,
            canViewIndustryDetail,
            canViewStudentDetail,
            canViewRTODetail,
            canAddStudents,
        },
        results: {
            resultCanGlobalSearch,
            resultCanToggleRtoList,
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
            resultCanAccessSubAdmin,
            resultCanAddStudents,
            resultCanViewAllStudents,
            resultCanToggleInternalTicket,
        },
    }
}
