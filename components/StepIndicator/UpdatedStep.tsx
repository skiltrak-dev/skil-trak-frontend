import { Typography } from '@components/Typography'
import React from 'react'
interface StepProps {
    visited?: boolean
    label: string
    last?: boolean
    fluid?: boolean
    vertical?: boolean
    horizontal?: boolean
}
export const UpdatedStep = ({
    label,
    visited,
    last,
    fluid,
    vertical,
    horizontal,
}: StepProps) => {
    return (
        <div className="flex items-center gap-x-6">
            <p className="text-xs md:text-base !m-0">{label}</p>
        </div>
    )
}
