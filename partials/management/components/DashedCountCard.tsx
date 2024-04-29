import { Typography } from '@components'
import React from 'react'
type DashedCountCardProps = {
    title: string
    subtitle: any
    align?: 'left' | 'center' | 'right'
}
export const DashedCountCard = ({
    title,
    subtitle,
    align,
}: DashedCountCardProps) => {
    return (
        <>
            <div
                className={`w-full rounded-md border-2 border-dashed px-3 py-2 `}
            >
                <p
                    className={`text-[10px] text-primaryNew font-medium ${
                        align ? `text-${align}` : ''
                    }`}
                >
                    {title}
                </p>
                <p
                    className={`text-xs text-primaryNew font-semibold ${
                        align ? `text-${align}` : ''
                    }`}
                >
                    {subtitle}
                </p>
            </div>
        </>
    )
}
