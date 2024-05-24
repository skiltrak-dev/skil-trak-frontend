import React, { ReactNode } from 'react'
import { Typography } from '@components'

export const UserProfileDetailCard = ({
    title,
    detail,
    onClick,
    children,
    border = true,
}: {
    title: string
    onClick?: any
    detail: string
    border?: boolean
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
                <p
                    dangerouslySetInnerHTML={{
                        __html: detail,
                    }}
                />
                {/* <Typography variant="xs" color="text-[#374151]">

                    {detail || '---'}
                </Typography> */}
            </div>
            {children && <div>{children}</div>}
        </div>
    )
}
