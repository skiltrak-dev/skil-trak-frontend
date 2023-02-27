import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { IoIosArrowRoundBack } from 'react-icons/io'

interface BackButtonProps {
    text?: string
    link?: string | null
}

export const BackButton = ({ text, link }: BackButtonProps) => {
    const router = useRouter()

    const navigateBack = () => {
        router.back()
    }

    const classes =
        'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'

    return link ? (
        <Link href={`/${link === '/' ? '' : link}`} className={classes}>
            <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
            <span className="ml-2">{text || 'Back To Previous'}</span>
        </Link>
    ) : (
        <div className={classes} onClick={navigateBack}>
            <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
            <span className="ml-2">{text || 'Back To Previous'}</span>
        </div>
    )
}
