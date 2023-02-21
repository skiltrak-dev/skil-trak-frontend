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
        'cancelled',
        'completed',
        'noResponse',
        'rejected',
        'terminated',
    ]
    const step = requestTypeActions.findIndex(
        (status) => status === currentStatus
    )
    return step + 1
}

export const checkStudentStatus = (studentStatus: string) => {
    const StudentStatus = [
        'active',
        'completed',
        'expired',
        'cancelled',
        'terminated',
    ]

    const step = StudentStatus.findIndex((status) => status === studentStatus)
    return step + 1
}
