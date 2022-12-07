import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { ProgressStep } from '@components/sections/subAdmin/StudentsContainer'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'

// query
import { useCancelWorkplaceRequestMutation } from '@queries'
import { StepIndustryChecks } from './StepIndustryChecks'
import { InitialAvatar } from '@components/InitialAvatar'
import { StepInterview } from './StepInterview'
import { StepAwaitingResponse } from './StepAwaitingResponse'
import { StepAppointmentBooked } from './StepAppointmentBooked'
import { StepSignAgreement } from './StepSignAgreement'
import { StepPlacementStarted } from './StepPlacementStarted'

type Props = {
    status: any
    appliedIndustry: any
    setIndustrySelection: any
    workplaceCancelRequest: any
    workplaceRequest: any
}

export const AppliedIndustry = ({
    status,
    appliedIndustry,
    setIndustrySelection,
    workplaceCancelRequest,
    workplaceRequest,
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
                return <StepSignAgreement />

            case 'placementStarted':
                return <StepPlacementStarted />

            default:
                return (
                    <StepIndustryChecks
                        appliedIndustry={appliedIndustry}
                        setIndustrySelection={setIndustrySelection}
                    />
                )
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
                                <img
                                    className="w-16 h-16 rounded-md"
                                    src={`https://picsum.photos/100/10${appliedIndustry?.id}`}
                                    alt=""
                                />
                                <div>
                                    {/* <Typography variant={'muted'} color={'gray'}>
                5km away
            </Typography> */}
                                    <p className="font-semibold">
                                        {
                                            appliedIndustry?.industry
                                                ?.businessName
                                        }
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
                                        <InitialAvatar
                                            name={
                                                workplaceRequest?.assignedTo
                                                    .user.name
                                            }
                                        />
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

                        <div>{getNextStep()}</div>
                    </div>

                    {workplaceCancelRequest(true)}
                </div>
            </Card>
        </div>
    )
}
