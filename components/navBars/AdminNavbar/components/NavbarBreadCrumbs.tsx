import Link from 'next/link'
import { Fragment } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

export const NavbarBreadCrumbs = ({
    links,
    title,
}: {
    links: string[]
    title: string
}) => (
    <div className="flex items-center text-xs font-medium gap-x-2 text-gray-300 overflow-scroll remove-scrollbar">
        <Link legacyBehavior href="/">
            <a className="text-gray-400">DASHBOARD</a>
        </Link>{' '}
        <IoIosArrowForward />{' '}
        {links.map((link, index) => (
            <Fragment key={index}>
                <Link
                    legacyBehavior
                    href={`/${links.slice(0, index + 1).join('/')}`}
                >
                    <span className="whitespace-pre block text-gray-400 cursor-pointer">
                        {link.toUpperCase().replace('-', ' ')}
                    </span>
                </Link>{' '}
                <IoIosArrowForward />{' '}
            </Fragment>
        ))}
        <div className="text-blue-400 whitespace-pre">
            {title.toUpperCase()}
        </div>
    </div>
)
