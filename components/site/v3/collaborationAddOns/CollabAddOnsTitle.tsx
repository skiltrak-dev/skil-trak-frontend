import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

export const CollabAddOnsTitle = () => {
    return (
        <div className="mx-auto flex justify-center flex-col max-w-7xl items-center ">
            <div className="flex flex-col items-center justify-center gap-x-2 ml-16 w-3/5 mt-6">
                {/* <span className="bg-[#9B2000] w-12 h-[2px]"></span> */}
                <Typography variant="title" semibold color="text-[#9B2000]">
                    Become a Premium Partner with SkilTrak
                </Typography>
                <Typography variant="body" color="text-primaryNew" center>
                    We provide additional services for our partners to ensure a
                    brighter future of vocational training. Join SkilTrak’s
                    trusted network of migration agents, consultancies, industry
                    leaders, and simulation lab owners to deliver compliant
                    placements, real-world training, and job-ready outcomes
                    across Australia.
                </Typography>
                {/* <span className="bg-[#9B2000] w-14 h-[2px]"></span> */}
            </div>
        </div>
    )
}
