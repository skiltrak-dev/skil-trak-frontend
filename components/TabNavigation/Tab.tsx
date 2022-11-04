import classNames from 'classnames'
import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'

interface TabBadge {
    text: string
    color: string
}

interface Href {
    pathname: string
    query: any
}

export interface TabProps {
    label: string
    href: Href
    badge?: TabBadge
    active?: boolean
    element: ReactElement | ReactNode
}

export const Tab = ({ label, href, badge, active, element }: TabProps) => {
    const classes = classNames({
        'text-sm font-semibold p-4 border-b transition-all duration-500': true,
        'flex items-center': true,
        'text-gray-400': !active,
        'text-gray-800 border-orange-500': active,
    })

    const badgeClasses = classNames({
        'text-[11px] ml-2 font-medium px-1 rounded transition-all duration-500':
            true,
        'bg-indigo-300 text-indigo-700': !active,
        'bg-indigo-500 text-white': active,
    })

    return (
        <div className={classes}>
            <Link href={href}>{label}</Link>
            {badge && badge.text && (
                <span className={badgeClasses}>{badge?.text}</span>
            )}
        </div>
    )
}
