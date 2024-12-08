import { Typography } from '@components'
import React from 'react'

export const CBSectorInfoBox = ({ code, name }: any) => {
    return (
        <div className="border rounded-lg px-3 py-2 bg-[#95C6FB] bg-opacity-15 flex flex-col gap-y-2">
            <Typography variant="muted" color="text-[#24556D]">
                {code ?? 'NA'}
            </Typography>
            <Typography variant="small" semibold color="text-gray-600">
                {name ?? 'NA'}
            </Typography>
        </div>
    )
}
