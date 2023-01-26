import React from 'react'

// components
import { ProgressStep, Card, InitialAvatar, Typography } from '@components'

type Props = {
    getNextStep: any
    appliedIndustry: any
    workplaceRequest: any
    workplaceCancelRequest: Function
    status: any
}

export const AppliedIndustryCard = ({
    getNextStep,
    appliedIndustry,
    workplaceRequest,
    workplaceCancelRequest,
    status,
}: Props) => {
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
                    <div className="py-2 md:px-4 rounded-lg flex flex-col md:flex-row gap-y-2 justify-between items-start">
                        <div className="flex flex-col gap-y-3.5">
                            <div className="flex md:items-center gap-x-2">
                                <InitialAvatar
                                    name={appliedIndustry?.industry?.user?.name}
                                    imageUrl={
                                        appliedIndustry?.industry?.user?.avatar
                                    }
                                    large
                                />
                                <div>
                                    {/* <Typography variant={'muted'} color={'gray'}>
                5km away
            </Typography> */}
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

                            <div className="px-10 md:px-20">
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

                        <div className="mt-3 md:mt-0">{getNextStep()}</div>
                    </div>

                    {workplaceCancelRequest(true)}
                </div>
            </Card>
        </div>
    )
}
