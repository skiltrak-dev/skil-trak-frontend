import React, { ReactNode } from 'react'
import { Typography } from '@components'

export const StudentDetailCard = ({
    title,
    detail,
    children,
}: {
    title: string
    detail: string
    children?: ReactNode
}) => {
    return (
        <div className="w-full px-2.5 py-1.5 border border-[#6B728050] rounded-md flex justify-between items-center">
            <div className="">
                <Typography normal variant="badge" color="text-[#979797] block">
                    {title}
                </Typography>
                <Typography variant="xxs" color="text-[#374151]">
                    {detail}
                </Typography>
            </div>
            {children && <div>{children}</div>}
        </div>
    )
}
