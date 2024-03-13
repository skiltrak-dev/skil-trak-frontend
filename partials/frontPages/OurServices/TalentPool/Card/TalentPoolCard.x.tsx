import { Typography } from '@components'
import React, { ReactNode } from 'react'

export const TalentPoolCard = ({
    title,
    center,
    children,
}: {
    title: string
    center?: boolean
    children: ReactNode
}) => {
    return (
        <div className="shadow-site p-7 rounded-[10px] bg-white flex flex-col gap-y-5">
            <Typography variant="h4" color={'text-[#25566B]'} center={center}>
                {title}
            </Typography>

            {children}
        </div>
    )
}
