import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const TalentPoolSection = () => {
    return (
        <div className="md:mx-auto md:max-w-7xl md:px-0 px-4 py-6 md:py-10 mt-10">
            <div className="flex flex-col md:flex-row gap-10 md:justify-between md:items-start">
                <div className="space-y-6 md:w-1/2">
                    <div className="">
                        <Typography variant="body" color="text-primary" medium>
                            Sign-up to Talent Pool
                        </Typography>
                        <Typography variant="h1" bold>
                            Talent Pool
                        </Typography>
                    </div>
                    <Typography variant="body">
                        SkilTrak’s Talent Pool is your gateway to real career
                        opportunities. As a student, you can build a
                        professional profile that gets you noticed by industry
                        employers and RTOs looking for skilled, job-ready
                        talent. Whether you're searching for a placement,
                        internship, part-time job, or full-time role, the Talent
                        Pool makes it easier to get matched, shortlisted, and
                        scheduled, all in one streamlined, compliant platform
                        designed to support your career journey from classroom
                        to workplace.
                    </Typography>
                </div>
                <div className="md:w-1/2">
                    <Image
                        width={400}
                        height={400}
                        // sizes="100vw"
                        alt="Skiltrak Mockup"
                        className="w-full "
                        src={
                            '/images/site/services/student-services/phone-laptop-combine.png'
                        }
                    />
                </div>
            </div>
        </div>
    )
}
