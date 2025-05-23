import { AdminApi, CommonApi } from '@queries'

export const usePermissionQueries = () => {
    const [releaseLogbook, releaseLogbookResult] =
        AdminApi.Rtos.autoReleaseLogbook()

    const [allowUpdation, allowUpdationResult] =
        AdminApi.Rtos.useAllowUpdation()

    const [allowAutoUpdate, allowAutoUpdateResult] =
        AdminApi.Rtos.rtoAutoComplete()

    const [allowPermissions, allowPermissionsResult] =
        AdminApi.Rtos.allowPartialSubmission()
    const [rtoWpApprovalRequest, rtoWpApprovalRequestResult] =
        AdminApi.Rtos.rtoWpApprovalRequest()
    return {
        queries: {
            allowUpdation,
            releaseLogbook,
            allowAutoUpdate,
            allowPermissions,
            rtoWpApprovalRequest,
        },
        results: {
            allowUpdationResult,
            releaseLogbookResult,
            allowAutoUpdateResult,
            allowPermissionsResult,
            rtoWpApprovalRequestResult,
        },
    }
}
