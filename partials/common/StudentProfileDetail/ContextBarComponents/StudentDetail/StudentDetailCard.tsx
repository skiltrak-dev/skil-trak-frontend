import React, { ReactNode } from 'react'
import { Typography } from '@components'

export const StudentDetailCard = ({
    title,
    detail,
    border = true,
    onClick,
    children,
}: {
    title: string
    border?: boolean
    detail: string
    onClick?: any
    children?: ReactNode
}) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`${onClick ? 'cursor-pointer' : ''} ${
                border ? 'border border-[#6B728050] rounded-md' : ''
            } w-full px-2.5 py-1.5  flex justify-between items-center`}
        >
            <div className="">
                <Typography normal variant="xxs" color="text-[#979797] block">
                    {title}
                </Typography>
                <Typography variant="xs" color="text-[#374151]">
                    {detail || '---'}
                </Typography>
            </div>
            {children && <div>{children}</div>}
        </div>
    )
}
