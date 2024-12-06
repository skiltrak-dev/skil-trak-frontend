import classNames from 'classnames'
import { ReactNode } from 'react'

interface CardProps {
    children?: ReactNode
    noPadding?: boolean
    shadowType?: 'soft' | 'hard' | 'profile' | 'profile2'
    shadowColor?: string
    layout?: 'wrap' | 'fluid' | 'min'
    fullHeight?: boolean
    border?: boolean
    borderColor?: string
}

export const Card = ({
    children,
    noPadding,
    shadowType,
    shadowColor = 'shadow-black/5',
    layout = 'fluid',
    fullHeight,
    border,
    borderColor,
}: CardProps) => {
    const classes = classNames({
        'w-full': layout === 'fluid',
        '!h-full': fullHeight,
        'w-fit': layout === 'wrap',
        'w-[450px]': layout === 'min',
        'bg-white rounded-xl': true,
        'shadow-xl': !shadowType || shadowType === 'soft',
        shadow: shadowType === 'hard',
        'shadow-profiles': shadowType === 'profile',
        'shadow-profiles2': shadowType === 'profile2',
        'p-0': noPadding,
        'p-4': !noPadding,
        border: border,
        'border-[#6B728050]': !borderColor,
        borderColor,
    })
    return <div className={`${classes} ${shadowColor}`}>{children}</div>
}
