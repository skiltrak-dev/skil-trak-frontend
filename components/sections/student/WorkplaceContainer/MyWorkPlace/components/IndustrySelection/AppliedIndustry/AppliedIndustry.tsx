import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { ProgressStep } from '@components/sections/subAdmin/StudentsContainer'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'

// query
import { useCancelWorkplaceRequestMutation } from '@queries'

type Props = {
    status: any
    appliedIndustry: any
    setIndustrySelection: any
    workplaceCancelRequest: any
}

export const AppliedIndustry = ({
    status,
    appliedIndustry,
    setIndustrySelection,
    workplaceCancelRequest,
}: Props) => {
    const daysLeft = () => {
        let date = new Date(appliedIndustry?.appliedDate)
        const todayDate = new Date()
        const dayTimestamp = 24 * 60 * 60 * 1000
        const time = dayTimestamp * 28 // millisecond for 28 days
        return Math.ceil(
            (date.getTime() + time - todayDate.getTime()) / dayTimestamp
        )
    }

    return (
        <div>
            <Typography variant={'label'}>
                You Have Applied For This Industry
            </Typography>
            <Card>
                <ProgressStep status={status} />
                <div className="py-2 px-4 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                        <img
                            className="w-16 h-16"
                            src={`https://picsum.photos/100/10${appliedIndustry?.id}`}
                            alt=""
                        />
                        <div>
                            {/* <Typography variant={'muted'} color={'gray'}>
                                5km away
                            </Typography> */}
                            <Typography>
                                <span className="font-bold">
                                    {appliedIndustry?.industry?.businessName}
                                </span>
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {appliedIndustry?.industry?.addressLine1},{' '}
                                {appliedIndustry?.industry?.addressLine2}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography variant={'xs'} right>
                            <span className="font-bold">{daysLeft()}</span> days
                            left
                        </Typography>
                        <Button
                            variant={'primary'}
                            text={'Upload Documents'}
                            onClick={() => {
                                setIndustrySelection(
                                    appliedIndustry?.industry?.id
                                )
                            }}
                        />
                    </div>
                </div>
                {workplaceCancelRequest()}
            </Card>
        </div>
    )
}
