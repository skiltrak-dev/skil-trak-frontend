export enum WorkplaceCurrentStatus {
    NotRequested = 'notRequested',
    Applied = 'applied',
    CaseOfficerAssigned = 'caseOfficerAssigned',
    Interview = 'interview',
    AwaitingWorkplaceResponse = 'awaitingWorkplaceResponse',
    AppointmentBooked = 'appointmentBooked',
    AwaitingAgreementSigned = 'awaitingAgreementSigned',
    AgreementSigned = 'AgreementSigned',
    PlacementStarted = 'placementStarted',
    Cancelled = 'cancelled',
    Completed = 'completed',
    NoResponse = 'noResponse',
    Rejected = 'rejected',
    Terminated = 'terminated',
}
export const checkWorkplaceStatus = (currentStatus: WorkplaceCurrentStatus) => {
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
