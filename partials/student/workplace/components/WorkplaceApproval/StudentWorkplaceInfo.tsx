import { Typography } from '@components'
import { Industry } from '@types'
import React from 'react'
import { WorkplaceInfoCard } from './WorkplaceInfoCard'

export const StudentWorkplaceInfo = ({
    industry,
    direction,
}: {
    direction?: string
    industry: Industry
}) => {
    const industryData = [
        {
            name: 'Name',
            data: industry?.user?.name || '---',
        },
        {
            name: 'Address',
            data: industry?.addressLine1 || '---',
        },
        {
            name: 'Website',
            data: industry?.website || '---',
        },
    ]
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
