import React from 'react'
import { IconType } from 'react-icons'
import { HiUserCircle } from 'react-icons/hi'

export const LabelCard = ({
    top,
    left,
    right,
    background,
    Icon,
}: {
    top?: number
    left?: number
    right?: number
    background?: { from: string; to: string }
    Icon?: IconType
}) => {
    return (
        <div
            className="w-10 h-10 flex justify-center items-center rounded-lg absolute"
            style={{
                top: `${top}px`,
                left: `${left}px`,
                right: `${right}px`,
                background: `linear-gradient(180deg, ${background?.from} 0%, ${background?.to} 100%)`,
            }}
        >
            {Icon ? (
                <Icon className="text-white text-lg" />
            ) : (
                <HiUserCircle className="text-white text-lg" />
            )}
        </div>
    )
}
