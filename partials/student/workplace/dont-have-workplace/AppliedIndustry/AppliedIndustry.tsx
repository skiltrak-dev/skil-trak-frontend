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
    StepPlacementCompleted,
    StepPlacementStarted,
} from '@partials/common'
import { StepSignAgreement } from './StepSignAgreement'
import { Course } from '@types'
import { WorkplaceCurrentStatus } from '@utils'

type Props = {
    status: any
    course: Course
    appliedIndustry: any
    workplaceRequest: any
    studentAdded?: boolean
    setIndustrySelection?: any
    workplaceCancelRequest: any
}

export const AppliedIndustry = ({
    status,
    course,
    studentAdded,
    appliedIndustry,
    workplaceRequest,
    setIndustrySelection,
    workplaceCancelRequest,
}: Props) => {
    const getNextStep = () => {
        switch (status) {
            case WorkplaceCurrentStatus.Interview:
                return <StepInterview />

            case WorkplaceCurrentStatus.CaseOfficerAssigned:
                return <StepCaseOfficerAssigned />

            case WorkplaceCurrentStatus.AwaitingWorkplaceResponse:
                return <StepAwaitingResponse />

            case WorkplaceCurrentStatus.AppointmentBooked:
                return <StepAppointmentBooked />

            case WorkplaceCurrentStatus.AwaitingAgreementSigned:
                return (
                    <StepSignAgreement
                        appliedIndustryId={appliedIndustry?.id}
                        course={course}
                    />
                )
            case WorkplaceCurrentStatus.AgreementSigned:
                return <AgreementSigned />

            case WorkplaceCurrentStatus.PlacementStarted:
                return <StepPlacementStarted />
            case WorkplaceCurrentStatus.Completed:
                return <StepPlacementCompleted />

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
