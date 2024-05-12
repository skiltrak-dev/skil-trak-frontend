import { Typography } from '@components'
import React from 'react'
import { RtoProfileProgressTypes } from './RtoProfileProgress'

export const ProgressView = ({
    progress,
}: {
    progress: RtoProfileProgressTypes
}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
                <div
                    className="h-3.5 w-3.5 rounded-full"
                    style={{
                        background: progress?.color,
                    }}
                ></div>
                <Typography>
                    <span className="text-[13px]">{progress?.title}</span>
                </Typography>
            </div>
            <Typography variant="label">
                <span
                    className="text-[13px]"
                    style={{
                        color: progress?.color,
                    }}
                >
                    {progress?.percent}%
                </span>
            </Typography>
        </div>
    )
}
