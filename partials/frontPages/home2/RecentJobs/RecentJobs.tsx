import { Typography } from '@components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { JobCard } from './cards'
import { JobsSlider } from './components'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

const RecentJobs = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div
            className="relative py-10"
            data-aos="fade-up"
            data-aos-duration="3000"
        >
            {/* <Image
                src={'images/site/packages/packagesShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-full h-full absolute left-0 -z-10"
            /> */}

            <div className="max-w-7xl mx-auto flex flex-col gap-y-">
                <div className="flex flex-col md:flex-row gap-y-1 justify-center md:justify-between items-center">
                    <Typography
                        variant={isMobile ? 'title' : 'h2'}
                        {...(isMobile
                            ? {
                                  center: true,
                              }
                            : {})}
                        bold
                    >
                        Recent Jobs From Our Partners
                    </Typography>
                    <div className="flex justify-end">
                        <Link href={'/jobs'} legacyBehavior>
                            <a className="underline text-primary text-[15px] font-bold">
                                View All Job
                            </a>
                        </Link>
                    </div>
                </div>

                {/* Jobs */}
                <div className="pt-6" data-aos="fade-up">
                    <JobsSlider />
                </div>
            </div>
        </div>
    )
}

export default RecentJobs
