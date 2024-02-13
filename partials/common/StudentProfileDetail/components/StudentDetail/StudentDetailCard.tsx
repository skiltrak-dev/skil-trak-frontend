import React from 'react'
import { Typography } from '@components'

export const StudentDetailCard = ({
    title,
    detail,
}: {
    title: string
    detail: string
}) => {
    return (
        <div className="w-full px-2.5 py-1.5 border border-[#6B728050] rounded-md">
            <Typography normal variant="badge" color="text-[#979797] block">
                {title}
            </Typography>
            <Typography variant="xxs" color="text-[#374151]">
                {detail}
            </Typography>
        </div>
    )
}
