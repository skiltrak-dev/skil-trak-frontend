import { Typography } from '@components'
import { Industry } from '@types'
import React from 'react'

export const WorkplaceInfo = ({
    industry,
    direction,
}: {
    direction?: string
    industry: Industry
}) => {
    return (
        <div className="flex flex-col h-full">
            <Typography variant="label" medium>
                Workplace Information
            </Typography>
            <div
                className={`border border-[#D5D5D5] rounded-[10px] px-2.5 py-2 flex ${
                    direction ? direction : 'flex-col'
                }  gap-y-[11px] flex-grow`}
            >
                <div>
                    <Typography variant="small" color="text-[#24556D]">
                        Name
                    </Typography>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        {industry?.user?.name}
                    </Typography>
                </div>
                <div>
                    <Typography variant="small" color="text-[#24556D]">
                        Address
                    </Typography>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        {industry?.addressLine1}
                    </Typography>
                </div>
                <div>
                    <Typography variant="small" color="text-[#24556D]">
                        Website
                    </Typography>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        {industry?.website}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
