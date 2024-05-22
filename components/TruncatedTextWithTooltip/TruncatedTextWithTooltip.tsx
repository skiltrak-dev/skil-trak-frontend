import { Typography } from '@components/Typography'
import { ellipsisText } from '@utils'
import React from 'react'

export const TruncatedTextWithTooltip = ({
    text,
    maxLength,
    fontSize,
    textColor,
    position,
}: {
    text: string
    fontSize?: number
    maxLength?: number
    textColor?: string
    position?: {
        left?: boolean
        right?: boolean
        top?: boolean
        bottom?: boolean
    }
}) => {
    const checkLength = maxLength ? maxLength : 15
    return (
        <div className="group relative">
            <Typography>
                <span
                    className="cursor-pointer"
                    style={{
                        fontSize: fontSize ? `${fontSize}px` : '14px',
                        color: textColor || 'black',
                    }}
                >
                    {ellipsisText(text, maxLength || 15)}
                </span>
            </Typography>
            {text && text?.length > checkLength && (
                <div
                    className={`hidden group-hover:block w-60 absolute  ${
                        position?.bottom ? 'bottom-full' : 'top-full'
                    } ${
                        position?.right ? 'right-0' : 'left-0'
                    }  p-2 z-20 shadow rounded-md text-black bg-white max-h-44 overflow-auto custom-scrollbar`}
                >
                    {text}
                </div>
            )}
        </div>
    )
}
