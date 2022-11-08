import classNames from 'classnames'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

interface NavItemProps {
    link?: string
    Icon?: any
    children: any
    active?: boolean
    color?: boolean
    onClick?: MouseEventHandler
}

export const SideBarItem = ({
    link,
    Icon,
    children,
    active,
    color,
    onClick,
}: NavItemProps) => {
    const classes = classNames({
        // Display
        'flex justify-start items-center cursor-pointer': true,

        // Text
        'text-xs font-semibold text-gray-600': true,

        // Padding & Margins
        'px-4 py-3 gap-x-2 w-full group': true,

        // Hovers
        'hover:bg-orange-100 hover:text-orange-500': !color,
        'hover:bg-red-100 hover:text-red-500': color,

        // Focus
        'focus:outline-none focus:ring-4': true,

        // Others
        'transition-all duration-300 rounded-lg border-transparent': true,

        // Background
        'bg-orange-500 text-white': active,
        'bg-transparent': !active,
    })

    const iconClasses = classNames({
        'text-gray-400': true,
        // Hover
        'group-hover:text-orange-300': !color,
        'group-hover:text-red-300': color,
        // Transition
        'transition-all duration-300': true,
    })

    return link ? (
        <Link href={link}>
            <div className={classes}>
                <Icon className={iconClasses} />
                {children}
            </div>
        </Link>
    ) : (
        <div className={classes} onClick={onClick}>
            <Icon className={iconClasses} />
            {children}
        </div>
    )
}
