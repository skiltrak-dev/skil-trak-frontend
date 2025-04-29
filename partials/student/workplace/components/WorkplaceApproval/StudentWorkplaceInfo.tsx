import { Typography } from '@components'
import { Industry } from '@types'
import React from 'react'
import { WorkplaceInfoCard } from './WorkplaceInfoCard'

export const StudentWorkplaceInfo = ({
    industry,
    direction,
}: {
    direction?: string
    industry: any
}) => {
    const industryData = [
        {
            name: 'Name',
            data: industry?.industry?.user?.name || '---',
        },
        {
            name: 'Address',
            data: industry?.industry?.addressLine1 || '---',
        },
        {
            name: 'Website',
            data: industry?.industry?.website || '---',
        },
    ]
    console.log(industry);
    return (
        <div className="flex flex-col h-full">
            <Typography variant="label" medium>
                Workplace Information
            </Typography>

            <div className="flex flex-col gap-y-2.5">
                {industryData?.map((industry: any) => (
                    <WorkplaceInfoCard {...industry} />
                ))}
            </div>
        </div>
    )
}
