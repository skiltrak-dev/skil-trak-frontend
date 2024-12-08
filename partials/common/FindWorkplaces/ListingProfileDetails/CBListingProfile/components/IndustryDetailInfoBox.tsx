import { Typography } from '@components'
import React from 'react'

export const IndustryDetailInfoBox = ({ title, data }: any) => {
    return (
        <div className="border rounded-lg py-1.5 px-2.5 w-full">
            <Typography variant="small" color="text-gray-300">
                {title ?? ''}
            </Typography>
            <Typography variant="muted" color="text-gray-500">
                {data ?? 'NA'}
            </Typography>
        </div>
    )
}
