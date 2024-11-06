import { Typography } from '@components'
import React from 'react'

export const WorkplaceInfoCard = ({
    name,
    data,
}: {
    name: string
    data: string
}) => {
    return (
        <div className="grid grid-cols-5 rounded-[5px] overflow-hidden">
            <div className="col-span-2 bg-[#F7910F26] p-3.5">
                <Typography variant="xxs" color="text-[#24556D]">
                    {name}
                </Typography>
            </div>
            <div className="col-span-3 bg-[#F7910F] p-3.5">
                <Typography variant="small" bold color="text-white">
                    {data}
                </Typography>
            </div>
        </div>
    )
}
