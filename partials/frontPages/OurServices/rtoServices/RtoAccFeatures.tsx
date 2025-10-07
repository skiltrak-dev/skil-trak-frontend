import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const RtoAccFeatures = () => {
    return (
        <div className="flex flex-col md:justify-between md:gap-20 gap-4 md:flex-row items-center md:items-start my-10 md:my-0">
            <div className="md:ml-40 md:mt-32 md:mb-10  px-4 md:px-0">
                <div className="space-y-4 ">
                    <Typography variant="label" medium color={'text-primary'}>
                        Feature
                    </Typography>
                    <Typography variant="h1" bold color={'text-primaryNew'}>
                        SkilTrak Training Organizations’ Account Features
                    </Typography>
                    <Typography variant="body">
                        SkilTrak RTOs account provides a streamlined platform to
                        manage student placements, track compliance, facilitate
                        host engagement, and generate reports, all in one place.
                        Empower your team with tools built to simplify
                        operations and ensure quality outcomes.
                    </Typography>
                </div>
                <div className="flex md:items-start items-center gap-x-10 justify-center gap-y-6 md:flex-row flex-col w-full mt-12">
                    <div className="md:w-1/2 space-y-4">
                        <Image
                            src={
                                '/images/site/services/rto-services/rto-feature-icon.png'
                            }
                            alt="rto document"
                            width={150}
                            height={150}
                            className="mx-auto"
                        />
                        <Typography variant="title" bold center>
                            Manage Compliance
                        </Typography>
                        <Typography variant="body" center>
                            All your RTO compliance requirements are available
                            from a simple click request. Visit our
                        </Typography>
                    </div>
                    <div className="md:w-1/2 space-y-4">
                        <Image
                            src={
                                '/images/site/services/student-services/student-features/process.png'
                            }
                            alt="student"
                            width={150}
                            height={150}
                            className="mx-auto"
                        />
                        <Typography variant="title" bold center>
                            Enhanced Communication
                        </Typography>
                        <Typography variant="body" center>
                            Learners can access discussions, notifications,
                            emails and information about workplaces etc. All
                            parties can
                        </Typography>
                    </div>
                </div>
            </div>
            <Image
                src={'/images/site/services/rto-services/rto-features.png'}
                alt="student"
                width={660}
                height={585}
                className=""
            />
        </div>
    )
}
