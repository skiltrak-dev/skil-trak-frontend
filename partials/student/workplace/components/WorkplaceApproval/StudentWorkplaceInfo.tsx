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
            data: !industry?.location
                ? industry?.addressLine1
                : industry?.location?.address || '---',
        },
        {
            name: 'Website',
            data: industry?.industry?.website || '---',
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
