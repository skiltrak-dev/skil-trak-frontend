import { Typography } from '@components'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

export const WorkplaceTab = ({
    index,
    active,
    onClick,
}: {
    index: number
    active?: boolean
    onClick?: () => void
}) => {
    const classes = classNames({
        'w-36 py-2.5 px-3 rounded-[5px] flex items-center gap-x-1.5': true,
        'bg-primaryNew': active,
        'bg-white border border-primaryNew': !active,
    })

    return (
        <div
            className={`${classes}`}
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
        >
            <Image
                src={`/images/workplace/${active ? 'lightTab' : 'darkTab'}.png`}
                alt={''}
                width={20}
                height={20}
                className="object-contain"
            />
            <Typography
                medium
                variant="small"
                color={active ? 'text-white' : 'text-black'}
            >
                Workplace {index + 1}
            </Typography>
        </div>
    )
}
