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

    const [toggleEsignPopulation, toggleEsignPopulationResult] =
        AdminApi.Rtos.toggleEsignPopulation()
    const [canStudentAddOwnWorkplace, canStudentAddOwnWorkplaceResult] =
        AdminApi.Rtos.canStudentAddOwnWorkplace()
    const [canStudentAddNeedWOrkplace, canStudentAddNeedWOrkplaceResult] =
        AdminApi.Rtos.canStudentAddNeedWorkplace()

    return {
        queries: {
            allowUpdation,
            releaseLogbook,
            allowAutoUpdate,
            allowPermissions,
            rtoCanViewPayment,
            allowScheduleEmail,
            rtoWpApprovalRequest,
            toggleEsignPopulation,
            canStudentAddOwnWorkplace,
            canStudentAddNeedWOrkplace,
        },
        results: {
            allowUpdationResult,
            releaseLogbookResult,
            allowAutoUpdateResult,
            allowPermissionsResult,
            rtoCanViewPaymentResult,
            allowScheduleEmailResult,
            rtoWpApprovalRequestResult,
            toggleEsignPopulationResult,
            canStudentAddOwnWorkplaceResult,
            canStudentAddNeedWOrkplaceResult,
        },
    }
}
