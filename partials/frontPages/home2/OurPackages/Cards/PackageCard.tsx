import { Typography } from '@components'
import React from 'react'

export const PackageCard = ({
    active,
    packageData,
    packageTypes,
    onClick,
}: {
    active?: boolean
    packageTypes: any
    packageData: any
    onClick: () => void
}) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`py-8 md:py-0 cursor-pointer flex flex-col justify-center gap-y-6 md:gap-y-5 shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] rounded-[10px] px-7 h-full ${
                active
                    ? 'bg-gradient-to-t from-[#072337] to-[#0D3958]'
                    : 'bg-white'
            }`}
        >
            <div>
                <Typography variant="title" color={active ? 'text-white' : ''}>
                    {packageData?.title}
                </Typography>
                <Typography
                    variant="label"
                    color={active ? 'text-white' : 'text-[#606F7B]'}
                >
                    {packageData?.subTitle}
                </Typography>
            </div>

            {/* <Typography variant="label" color={active ? 'text-white' : ''}>
                <span className="text-4xl font-semibold">
                    {' '}
                    ${packageData?.price}
                </span>{' '}
                <span className={active ? 'text-white' : 'text-[#606F7B]'}>
                    / Month
                </span>
            </Typography> */}
        </div>
    )
}
