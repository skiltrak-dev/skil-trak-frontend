import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'
import { AnimatedWaves } from './animatedWaves'

export const CountsSection = () => {
    const counts = [
        {
            count: '2500',
            subtitle: 'Students Placed',
        },
        {
            count: '36000',
            subtitle: 'Industry Connections',
        },
        {
            count: '25',
            subtitle: 'RTOs ',
        },
        {
            count: '10',
            subtitle: 'Courses ',
        },
    ]
    return (
        <div className="">
            <div
                className="h-[400px] w-full bg-cover bg-center bg-no-repeat flex items-center"
                style={{
                    backgroundImage:
                        'url(/images/site/home-page-v3/counts-bg.png)',
                }}
            >
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
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
