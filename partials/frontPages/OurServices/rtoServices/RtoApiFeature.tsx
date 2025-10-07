import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const RtoApiFeature = () => {
    return (
        <div className="md:mx-auto md:max-w-7xl md:px-0 px-4 md:py-0">
            <div className="flex flex-col md:flex-row gap-10 md:justify-between">
                <div className="">
                    <Image
                        width={500}
                        height={400}
                        // sizes="100vw"
                        alt="Skiltrak Mockup"
                        className=""
                        src={
                            '/images/site/services/rto-services/rto-features-mockups.png'
                        }
                    />
                </div>
                <div className="space-y-6 md:w-1/2 md:mt-40">
                    <div className="">
                        <Typography variant="body" color="text-primary" medium>
                            API
                        </Typography>
                        <Typography variant="h1" bold>
                            Customise API To Integrate with your LMS
                        </Typography>
                    </div>
                    <p className="mt-10 leading-8">
                        SkilTrak offers seamless API integration with your
                        existing LMS, enabling RTOs to streamline student
                        placements effortlessly. With one-click enrolment and
                        real-time data sync, manual entry is eliminated,
                        ensuring efficient onboarding, automated tracking, and
                        full administrative control. Designed for flexibility,
                        our API delivers a smooth experience for both staff and
                        students, simplifying workflows while enhancing
                        productivity.
                    </p>
                </div>
            </div>
        </div>
    )
}
