import { Typography } from '@components'
import React from 'react'

export const InfoCard = ({ title, data }: any) => {
    return (
        <div className="rounded-md bg-white border border-[#6B7280] bg-opacity-50 p-2 w-full">
            <Typography variant="small" color="text-[#979797]">
                {title ?? 'N/A'}
            </Typography>
            <Typography variant="small" semibold>
                {data ?? 'N/A'}
            </Typography>
        </div>
    )
}
