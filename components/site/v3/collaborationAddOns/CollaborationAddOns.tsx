import React from 'react'
import { CollabAddOnsTitle } from './CollabAddOnsTitle'
import { CollabAddOnsSlider } from './CollabAddOnsSlider'
import { Typography } from '@components/Typography'
import Image from 'next/image'

export const CollaborationAddOns = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-20 mb-4">
                <Typography variant="h2" color="text-[#24556D]">
                    Collaboration Add-Ons
                </Typography>
                <Image
                    src={
                        '/images/site/home-page-v3/who-we-serve/title-line.svg'
                    }
                    alt={`title line`}
                    height={700}
                    width={400}
                    className=""
                />
            </div>
            <div
                style={{
                    backgroundImage:
                        'url(/images/site/home-page-v3/collaboration-add-ons/collab-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="max-w-7xl mx-auto"
            >
                <CollabAddOnsTitle />
                <CollabAddOnsSlider />
            </div>
        </>
    )
}
