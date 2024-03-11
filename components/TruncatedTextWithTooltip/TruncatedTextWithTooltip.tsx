import { Typography } from '@components/Typography'
import { ellipsisText } from '@utils'
import React from 'react'

export const TruncatedTextWithTooltip = ({
    text,
    maxLength,
}: {
    text: string
    maxLength?: number
}) => {
    return (
        <div className="group relative">
            <Typography variant={'label'}>
                <span className="cursor-pointer">
                    {ellipsisText(text, maxLength || 15)}
                </span>
            </Typography>
            {text && (
                <div className="hidden group-hover:block w-60 absolute top-full left-0 p-2 z-20 shadow rounded-md bg-white max-h-44 overflow-auto custom-scrollbar">
                    {text}
                </div>
            )}
        </div>
    )
}
