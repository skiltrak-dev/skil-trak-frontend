import { MouseEventHandler, useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { Typography } from '@components'

interface BadgeButtonProps {
    onClick: MouseEventHandler
    icon: any
    count: number
    max: number
    text: string
}

export const BadgeButton = ({
    onClick,
    icon,
    count,
    max,
    text,
}: BadgeButtonProps) => {
    const [itemCount, setItemCount] = useState('0')
    const Icon = icon

    useEffect(() => {
        if (count > max) {
            setItemCount(`${max}+`)
        } else {
            setItemCount(`${count}`)
        }
    }, [])
    return (
        <div className="relative">
            <div
                className="flex items-center gap-x-2 cursor-pointer transition-all p-2  hover:bg-secondary"
                onClick={onClick}
            >
                <Icon />
                <Typography variant={'muted'}>{text}</Typography>
                <MdKeyboardArrowDown />
            </div>
            <span className="w-5 h-5 flex items-center justify-center text-center text-white absolute -top-2 -right-2 bg-error rounded-full text-xs">
                {itemCount}
            </span>
        </div>
    )
}
