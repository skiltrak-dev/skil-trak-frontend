import Link from 'next/link'
import { Fragment } from 'react'

export const NavbarBreadCrumbs = ({
    links,
    title,
}: {
    links: string[]
    title: string
}) => (
    <div className="flex text-xs font-medium gap-x-1 text-gray-300 overflow-scroll remove-scrollbar">
        <Link legacyBehavior href="/">
            <a className="">DASHBOARD</a>
        </Link>{' '}
        <div>/</div>{' '}
        {links.map((link, index) => (
            <Fragment key={index}>
                <Link
                    legacyBehavior
                    href={`/${links.slice(0, index + 1).join('/')}`}
                >
                    <span className="whitespace-pre block cursor-pointer">
                        {link.toUpperCase().replace('-', ' ')}
                    </span>
                </Link>{' '}
                <span>/</span>{' '}
            </Fragment>
        ))}
        <div className="text-gray-400 whitespace-pre">
            {title.toUpperCase()}
        </div>
    </div>
)
