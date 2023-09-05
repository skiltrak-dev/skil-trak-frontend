import React from 'react'

// components
import { ProgressStep, Card, InitialAvatar, Typography } from '@components'
import { StepIndustryChecks } from './StepIndustryChecks'
import {
    AgreementSigned,
    AppliedIndustryCard,
    StepAppointmentBooked,
    StepAwaitingResponse,
    StepCaseOfficerAssigned,
    StepInterview,
    StepPlacementStarted,
} from '@partials/common'
import { StepSignAgreement } from './StepSignAgreement'
import { Course } from '@types'

type Props = {
    status: any
    appliedIndustry: any
    setIndustrySelection?: any
    workplaceCancelRequest: any
    workplaceRequest: any
    studentAdded?: boolean
    course: Course
}

export const AppliedIndustry = ({
    status,
    appliedIndustry,
    setIndustrySelection,
    workplaceCancelRequest,
    workplaceRequest,
    studentAdded,
    course,
}: Props) => {
    const getNextStep = () => {
        switch (status) {
            case 'interview':
                return <StepInterview />

            case 'caseOfficerAssigned':
                return <StepCaseOfficerAssigned />

            case 'awaitingWorkplaceResponse':
                return <StepAwaitingResponse />

            case 'appointmentBooked':
                return <StepAppointmentBooked />

            case 'awaitingAgreementSigned':
                return (
                    <StepSignAgreement
                        appliedIndustryId={appliedIndustry?.id}
                        course={course}
                    />
                )
            case 'AgreementSigned':
                return <AgreementSigned />

            case 'placementStarted':
                return <StepPlacementStarted />

            default:
                return !studentAdded ? (
                    <StepIndustryChecks
                        appliedIndustry={appliedIndustry}
                        setIndustrySelection={setIndustrySelection}
                    />
                ) : null
        }
    }
    return (
        <AppliedIndustryCard
            getNextStep={getNextStep}
            appliedIndustry={appliedIndustry}
            workplaceRequest={workplaceRequest}
            workplaceCancelRequest={workplaceCancelRequest}
            status={status}
        />
    )
}
