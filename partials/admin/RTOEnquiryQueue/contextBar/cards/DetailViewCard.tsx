import { Typography } from '@components'
import React from 'react'

export const DetailViewCard = ({
    title,
    description,
    Icon,
}: {
    title: string
    description: string
    Icon?: any
}) => {
    return (
        <div>
            <Typography variant="small" color="text-[#8c8c8c]">
                {title}
            </Typography>
            <Typography
                variant="small"
                color="text-[#262626]"
                className="mt-1 flex items-center flex-wrap gap-2"
            >
                {Icon && <Icon className="h-3.5 w-3.5 text-[#F7A619]" />}
                {description}
            </Typography>
        </div>
    )
}
