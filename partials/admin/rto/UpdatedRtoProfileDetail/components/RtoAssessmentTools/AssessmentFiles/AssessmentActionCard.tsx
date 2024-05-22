import { Tooltip, TooltipPosition } from '@components'
import React from 'react'
import { IconType } from 'react-icons'
import { PulseLoader } from 'react-spinners'

export const AssessmentActionCard = ({
    Icon,
    title,
    onClick,
    loading,
}: {
    title?: string
    Icon: IconType
    loading?: boolean
    onClick: () => void
}) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className="relative group w-7 h-7 rounded-lg flex items-center justify-center bg-primaryNew"
        >
            {loading ? (
                <PulseLoader size={3} color="white" />
            ) : (
                <Icon className="text-white" size={17} />
            )}
            {title && <Tooltip>{title}</Tooltip>}
        </div>
    )
}
