import { Typography } from '@components'
import { getUserCredentials } from '@utils'
import Image from 'next/image'
import React from 'react'

export const WorkplaceDetail = () => {
    const name = getUserCredentials()?.name

    return (
        <div className="flex flex-col gap-y-2.5">
            <Image
                src={'/images/workplace/darkTab.png'}
                alt=""
                width={22}
                height={22}
            />
            <Typography
                capitalize
                color="text-[#24556D]"
                variant="subtitle"
                bold
            >
                eligible workplace option for placement
            </Typography>
            <Typography capitalize bold variant="label" color="text-[#333]">
                Dear {name},
            </Typography>
            <Typography capitalize color="text-[#24556D]" variant="label">
                We are excited to inform you that Skiltrak has successfully
                found a matching industry in your area of interest.
            </Typography>
            <Typography capitalize color="text-[#24556D]" variant="label">
                Please review all details of the workplace below & approve your
                request to continue the placement process.
            </Typography>
        </div>
    )
}
