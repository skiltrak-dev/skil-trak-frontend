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

export const getStudentWorkplaceAppliedIndustry = (workplace: any) => {
    return workplace?.industries?.find((industry: any) => industry?.applied)
}

export const studentsListWorkplace = (workplace: any) => {
    const activeWorkplace = workplace?.filter(
        (wp: any) =>
            wp?.currentStatus !== WorkplaceCurrentStatus.Cancelled ||
            wp?.currentStatus !== WorkplaceCurrentStatus.Terminated ||
            wp?.currentStatus !== WorkplaceCurrentStatus.Rejected ||
            wp?.currentStatus !== WorkplaceCurrentStatus.NoResponse
    )

    const latestWorkplace = activeWorkplace?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        }
    )

    const appliedIndustry =
        getStudentWorkplaceAppliedIndustry(latestWorkplace)?.industry

    return appliedIndustry
}
