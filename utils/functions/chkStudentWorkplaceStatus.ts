export const checkWorkplaceStatus = (currentStatus: string) => {
    const requestTypeActions = [
        'notRequested',
        'applied',
        'caseOfficerAssigned',
        'interview',
        'awaitingWorkplaceResponse',
        'appointmentBooked',
        'awaitingAgreementSigned',
        'AgreementSigned',
        'placementStarted',
        'completed',
        'cancelled',
        'rejected',
        'terminated',
    ]
    const step = requestTypeActions.findIndex(
        (status) => status === currentStatus
    )
    return step > 0 ? (step < 10 ? step + 1 : 9) : 1
}
