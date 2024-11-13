import { Typography } from '@components'
import React from 'react'

export const BranchContactPersonInfoCard = ({ name, email, phone }: any) => {
    return (
        <div className="rounded-md bg-white border border-[#6B7280] bg-opacity-50 p-2">
            <Typography variant="small" color="text-[#979797]">
                Contact Person
            </Typography>
            <Typography variant="small" semibold>
                {name ?? 'N/A'}
            </Typography>
            <Typography variant="small">{email ?? 'N/A'}</Typography>
            <Typography variant="small">{phone ?? 'N/A'}</Typography>
        </div>
    )
}
