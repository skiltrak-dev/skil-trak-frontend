import { Typography } from '@components'
import React from 'react'

export const ProfileCard = ({
    title,
    detail,
}: {
    title: string
    detail: string
}) => {
    return (
        <div className="border border-dashed border-[#24556D] rounded-[5px] px-3.5 py-2.5 flex justify-between items-center">
            <Typography variant="xs" medium>
                {title}
            </Typography>
            <Typography variant="small" semibold>
                {detail}
            </Typography>
        </div>
    )
}
