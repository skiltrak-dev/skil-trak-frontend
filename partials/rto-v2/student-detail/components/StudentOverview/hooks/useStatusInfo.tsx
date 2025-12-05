import { WorkplaceCurrentStatus } from '@utils'
import {
    IWorkplaceIndustries,
    WorkplaceWorkIndustriesType,
} from 'redux/queryTypes'

export const useStatusInfo = ({
    workplace,
    workIndustry,
}: {
    workplace: IWorkplaceIndustries
    workIndustry: WorkplaceWorkIndustriesType
}) => {
    const statusMapping = {
        [WorkplaceCurrentStatus.NotRequested]: 'Student Added',
        [WorkplaceCurrentStatus.Applied]: 'Request Generated',
        [WorkplaceCurrentStatus.CaseOfficerAssigned]: 'Coordinator Assigned',
        [WorkplaceCurrentStatus.Interview]: 'Interview',
        [WorkplaceCurrentStatus.AwaitingStudentResponse]: 'Waiting for Student',
        [WorkplaceCurrentStatus.AwaitingRtoResponse]: 'Waiting for RTO',
        [WorkplaceCurrentStatus.AwaitingWorkplaceResponse]:
            'Waiting for Industry',
        [WorkplaceCurrentStatus.IndustryEligibility]:
            'Industry Eligibility Check',
        [WorkplaceCurrentStatus.AppointmentBooked]: 'Appointment',
        [WorkplaceCurrentStatus.AwaitingAgreementSigned]: 'Agreement Pending',
        [WorkplaceCurrentStatus.AgreementSigned]: 'Agreement Signed',
        [WorkplaceCurrentStatus.PlacementStarted]: 'Placement Started',
        [WorkplaceCurrentStatus.Completed]: 'Schedule Completed',
        [WorkplaceCurrentStatus.Cancelled]: 'Cancelled',
        [WorkplaceCurrentStatus.NoResponse]: 'No Response',
        [WorkplaceCurrentStatus.Rejected]: 'Rejected',
        [WorkplaceCurrentStatus.Terminated]: 'Terminated',
    }

    const statusOrder = [
        WorkplaceCurrentStatus.NotRequested,
        WorkplaceCurrentStatus.Applied,
        WorkplaceCurrentStatus.CaseOfficerAssigned,
        WorkplaceCurrentStatus.Interview,
        WorkplaceCurrentStatus.AwaitingStudentResponse,
        WorkplaceCurrentStatus.AwaitingRtoResponse,
        WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
        WorkplaceCurrentStatus.AppointmentBooked,
        WorkplaceCurrentStatus.AwaitingAgreementSigned,
        WorkplaceCurrentStatus.AgreementSigned,
        WorkplaceCurrentStatus.PlacementStarted,
        WorkplaceCurrentStatus.Completed,
    ]

    // Function to generate statuses based on current status
    const generateStatuses = (
        currentStatus: WorkplaceCurrentStatus,
        dateData?: any
    ) => {
        const currentIndex = statusOrder.indexOf(currentStatus)

        return statusOrder.map((status, index) => ({
            label: statusMapping[status],
            completed: index < currentIndex,
            current: index === currentIndex,
            date: dateData?.[status] || null,
        }))
    }

    const statuses = generateStatuses(workplace?.currentStatus, {
        [WorkplaceCurrentStatus.NotRequested]: workIndustry?.appliedDate,
        [WorkplaceCurrentStatus.Applied]: workIndustry?.appliedDate,
        [WorkplaceCurrentStatus.CaseOfficerAssigned]:
            workIndustry?.caseOfficerAssignedDate,
        [WorkplaceCurrentStatus.Interview]: workIndustry?.interviewDate,
        [WorkplaceCurrentStatus.AwaitingStudentResponse]: (workIndustry as any)
            ?.awaitingStudentResponseDate,
        [WorkplaceCurrentStatus.AwaitingRtoResponse]: (workIndustry as any)
            ?.awaitingRtoResponseDate,
        [WorkplaceCurrentStatus.AwaitingWorkplaceResponse]:
            workIndustry?.awaitingWorkplaceResponseDate,
        [WorkplaceCurrentStatus.AppointmentBooked]:
            workIndustry?.appointmentBookedDate,
        [WorkplaceCurrentStatus.AwaitingAgreementSigned]:
            workIndustry?.awaitingAgreementSignedDate,
        [WorkplaceCurrentStatus.AgreementSigned]:
            workIndustry?.AgreementSignedDate,
        [WorkplaceCurrentStatus.PlacementStarted]:
            workIndustry?.placementStartedDate,
        [WorkplaceCurrentStatus.Completed]: workIndustry?.isCompletedDate,
    })

    const getNextStep = () => {
        const currentIndex = statuses.findIndex((step) => step.current === true)

        // If no current step found or current is the last step
        if (currentIndex === -1 || currentIndex === statuses.length - 1) {
            return null
        }

        return statuses[currentIndex + 1]
    }

    const getPreviousStep = () => {
        const currentIndex = statuses.findIndex((step) => step.current === true)

        // If no current step found or current is the first step
        if (currentIndex <= 0) {
            return null
        }

        return statuses[currentIndex - 1]
    }

    const getCurrentStep = () => {
        return statuses.find((step) => step.current === true) || null
    }

    console.log({ statuses })

    const completedCount = statuses.filter((s) => s.completed).length
    const totalCount = statuses.length
    const progressPercent = Math.round((completedCount / totalCount) * 100)

    return {
        statuses,
        totalCount,
        completedCount,
        progressPercent,
        nextStep: getNextStep(),
        previousStep: getPreviousStep(),
        currentStep: getCurrentStep(),
    }
}
