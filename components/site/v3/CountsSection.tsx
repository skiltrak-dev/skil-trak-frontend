import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'
import { AnimatedWaves } from './animatedWaves'

export const CountsSection = ({ homepageCounts }: any) => {
    const counts = [
        {
            count: homepageCounts?.students || 0,
            subtitle: 'Students Placed',
        },
        {
            count: homepageCounts?.listing || 0,
            subtitle: 'Industry Connections',
        },
        {
            count: homepageCounts?.rtos || 0,
            subtitle: 'RTOs ',
        },
        {
            count: homepageCounts?.courses || 0,
            subtitle: 'Courses ',
        },
    ]
    return (
        <div className="">
            <div
                className=" h-[400px] w-full bg-cover bg-center bg-no-repeat flex items-center "
                style={{
                    backgroundImage:
                        'url(/images/site/home-page-v3/counts-bg.webp)',
                }}
            >
                <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
                    {counts.map((count, index) => (
                        <div
                            key={index}
                            className="bg-primaryNew rounded-xl px-8 py-6 border-2 border-[#9B2000] space-y-2 text-center"
                        >
                            <Typography variant="h4" color="text-white">
                                {count.count}
                            </Typography>
                            <Typography variant="body" color="text-white">
                                {count.subtitle}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatedWaves />
        </div>
    )
}
