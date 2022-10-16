import Link from 'next/link'
import { Fragment } from 'react'

export const NavbarBreadCrumbs = ({
    links,
    title,
}: {
    links: string[]
    title: string
}) => {
    return (
        <div className="flex text-xs font-medium gap-x-1 text-gray-300">
            <Link href="/">
                <a className="">DASHBOARD</a>
            </Link>{' '}
            <div>/</div>{' '}
            {links.map((link, index) => (
                <Fragment key={index}>
                    <Link href={`/${links.slice(0, index + 1).join('/')}`}>
                        {link.toUpperCase().replace('-', ' ')}
                    </Link>{' '}
                    <span>/</span>{' '}
                </Fragment>
            ))}
            <div className="text-gray-400">{title.toUpperCase()}</div>
        </div>
    )
}
