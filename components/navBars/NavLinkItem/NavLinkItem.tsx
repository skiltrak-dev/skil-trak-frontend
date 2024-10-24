import { Typography } from '@components/Typography'
import { MediaQueries, UserRoles } from '@constants'
import { StudentApi, IndustryApi } from '@queries'
import { isActiveRoute } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const NavLinkItem = ({ nav, PREFIX }: { PREFIX: string; nav: any }) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const router = useRouter()
    // const isActive = (pathname: string) => {
    //     return isActiveRoute(pathname, router, PREFIX, true)
    // }
    const isActive =
        router?.pathname?.split('/')[3] === nav?.link?.split('/')[3]
    // e-sign === e-sign

    const defaultClasses =
        'transition-all duration-300 px-2.5 py-2  flex flex-col md:flex-row gap-x-2 items-center rounded-md'
    return (
        <li className="relative ">
            <Link legacyBehavior href={nav.link}>
                <a
                    className={`${
                        isActive ? nav.activeClasses : nav.inActiveClasses
                    } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                    aria-label={`${nav.link}`}
                >
                    <span>
                        <nav.Icon size={isMobile || nav?.mini ? 24 : 14} />
                    </span>
                    {nav?.text ? (
                        <span className="text-xs 2xl:text-[13] font-semibold whitespace-pre">
                            {nav?.text}
                        </span>
                    ) : null}
                </a>
            </Link>
            {nav?.count > 0 && (
                <div className="absolute -top-1 -right-2 bg-success rounded-full w-4 h-4 flex justify-center items-center">
                    <Typography variant="xs" color="text-white" semibold>
                        {nav?.count}
                    </Typography>
                </div>
            )}
        </li>
    )
}
