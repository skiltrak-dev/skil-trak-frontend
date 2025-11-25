import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const IndustryServicesMobileApp = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mx-auto items-start max-w-7xl px-4 md:px-0">
            <div className="md:w-1/2">
                <Typography variant="body" color="text-primary">
                    Mobile Apps
                </Typography>
                <div className="space-y-4 mt-4">
                    <Typography variant="h2">Industry app </Typography>
                    <p className="leading-8">
                        Gain instant access to a dynamic pool of qualified,
                        job-ready students with SkilTrak’s Talent Pool. Our
                        platform empowers industries to efficiently identify,
                        shortlist, and schedule top candidates for placements,
                        internships, part-time roles, or long-term employment,
                        all aligned with your organisation’s specific needs,
                        compliance standards, and workforce goals. With
                        real-time insights, seamless communication, and
                        streamlined processes, SkilTrak makes talent acquisition
                        faster, smarter, and more strategic.
                    </p>
                </div>
            </div>
            <div className="md:w-1/2">
                <Image
                    src={
                        '/images/site/services/industry-services/industry-app.png'
                    }
                    alt=""
                    width={800}
                    height={500}
                    className="w-full"
                />
            </div>
        </div>
    )
}
