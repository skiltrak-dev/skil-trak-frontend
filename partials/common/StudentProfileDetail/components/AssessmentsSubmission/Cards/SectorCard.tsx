import React from 'react'
import { Typography } from '@components'
import { Sector } from '@types'

export const SectorCard = ({
    sector,
    active,
    onClick,
}: {
    sector: Sector
    active?: boolean
    onClick: () => void
}) => {
    return (
        <div
            onClick={onClick}
            className={`w-full ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark'
            }  rounded-md p-4 cursor-pointer`}
        >
            <Typography
                variant="small"
                medium
                color={active ? 'text-white' : '#77757F'}
            >
                Sector
            </Typography>
            <Typography
                variant="label"
                medium
                color={active ? 'text-white' : '#374151'}
            >
                {sector?.name}
            </Typography>
        </div>
    )
}
