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

    const [rtoCanViewPayment, rtoCanViewPaymentResult] =
        AdminApi.Rtos.rtoCanViewPaymentStatusToggle()

    const [allowScheduleEmail, allowScheduleEmailResult] =
        AdminApi.Rtos.allowScheduleEmailToggle()

    return {
        queries: {
            allowUpdation,
            releaseLogbook,
            allowAutoUpdate,
            allowPermissions,
            rtoCanViewPayment,
            allowScheduleEmail,
            rtoWpApprovalRequest,
        },
        results: {
            allowUpdationResult,
            releaseLogbookResult,
            allowAutoUpdateResult,
            allowPermissionsResult,
            rtoCanViewPaymentResult,
            allowScheduleEmailResult,
            rtoWpApprovalRequestResult,
        },
    }
}
