import { MouseEventHandler, useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { Typography } from '@components'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'
import { Desktop } from '@components/Responsive'
import classNames from 'classnames'

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
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const Icon = icon
    const classes = classNames({
        'cursor-pointer transition-all': true,
        'flex items-center gap-x-2 p-2 hover:bg-secondary': !isMobile,
        'bg-gray-100 p-2 rounded-md': isMobile,
    })

    const [itemCount, setItemCount] = useState('0')
    useEffect(() => {
        if (count > max) {
            setItemCount(`${max}+`)
        } else {
            setItemCount(`${count}`)
        }
    }, [])
    return (
        <div className="relative" onClick={onClick}>
            <div className={classes}>
                <Icon />
                <div className="hidden md:flex">
                    <Typography variant={'muted'}>{text}</Typography>
                    <MdKeyboardArrowDown />
                </div>
            </div>
            <span className="w-5 h-5 flex items-center justify-center text-center text-white absolute -top-2 -right-2 bg-error rounded-full text-xs">
                {itemCount}
            </span>
        </div>
    )
}
