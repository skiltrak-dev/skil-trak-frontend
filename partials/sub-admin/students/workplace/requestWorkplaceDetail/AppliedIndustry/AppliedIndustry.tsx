import React from 'react'

// components
import { ProgressStep, Card, InitialAvatar, Typography } from '@components'
import { StepIndustryChecks } from './StepIndustryChecks'
import { StepSignAgreement } from './StepSignAgreement'
import {
    AgreementSigned,
    StepAppointmentBooked,
    StepAwaitingResponse,
    StepInterview,
    StepPlacementStarted,
} from '@partials/common'

type Props = {
    status: any
    appliedIndustry: any
    setIndustrySelection?: any
    workplaceCancelRequest: any
    workplaceRequest: any
    studentAdded?: boolean
    studentProvidedWorkplace?: boolean
}

export const AppliedIndustry = ({
    status,
    appliedIndustry,
    setIndustrySelection,
    workplaceCancelRequest,
    workplaceRequest,
    studentAdded,
    studentProvidedWorkplace,
}: Props) => {
    const getNextStep = () => {
        switch (status) {
            case 'interview':
                return <StepInterview />

            case 'awaitingWorkplaceResponse':
                return <StepAwaitingResponse />

            case 'appointmentBooked':
                return <StepAppointmentBooked />

            case 'awaitingAgreementSigned':
                return (
                    <StepSignAgreement
                        appliedIndustryId={appliedIndustry?.id}
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
        <div>
            <Typography variant={'label'}>
                You have applied for this industry
            </Typography>
            <Card noPadding>
                <div className="border-b pt-4 w-full overflow-hidden overflow-x-scroll remove-scrollbar">
                    <ProgressStep status={status} />
                </div>

                <div className="py-2 px-4">
                    <div className="py-2 px-4 rounded-lg flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-x-2">
                                {appliedIndustry?.industry?.user?.name && (
                                    <InitialAvatar
                                        name={
                                            appliedIndustry?.industry?.user
                                                ?.name
                                        }
                                        imageUrl={
                                            appliedIndustry?.industry?.user
                                                ?.avatar
                                        }
                                        large
                                    />
                                )}
                                <div>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        {Number(
                                            appliedIndustry?.distance
                                        )?.toFixed(2)}{' '}
                                        Km Away
                                    </Typography>
                                    <p className="font-semibold">
                                        {appliedIndustry?.industry?.user?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {
                                            appliedIndustry?.industry
                                                ?.addressLine1
                                        }
                                        ,{' '}
                                        {
                                            appliedIndustry?.industry
                                                ?.addressLine2
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="px-20">
                                <p className="text-xs text-gray-400">
                                    Case Officer:
                                </p>
                                {workplaceRequest?.assignedTo ? (
                                    <div className="flex items-center gap-x-2">
                                        {workplaceRequest?.assignedTo.user
                                            .name && (
                                            <InitialAvatar
                                                name={
                                                    workplaceRequest?.assignedTo
                                                        .user.name
                                                }
                                            />
                                        )}
                                        <span className="text-sm">
                                            {
                                                workplaceRequest?.assignedTo
                                                    .user.name
                                            }
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-sm font-medium text-orange-300">
                                        Not Assigned Yet
                                    </p>
                                )}
                            </div>
                        </div>

                        {!studentProvidedWorkplace && (
                            <div>{getNextStep()}</div>
                        )}
                    </div>

                    {workplaceCancelRequest(true)}
                </div>
            </Card>
        </div>
    )
}
