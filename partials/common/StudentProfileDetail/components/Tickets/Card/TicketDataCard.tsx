import { Typography } from '@components'
import React, { ReactNode } from 'react'

export const TicketDataCard = ({
    text,
    title,
    children,
    subText,
}: {
    title: string
    text?: string
    children?: ReactNode
    subText?: string
}) => {
    return (
        <div className="bg-gray-500 rounded-lg p-2.5">
            <span className="text-[10px] block text-white">{title}</span>
            <Typography variant={'xs'} color="text-white">
                {text || children}
            </Typography>
            <span className="text-[10px] block text-white">{subText}</span>
        </div>
    )
}
