import { Typography } from '@components'
import React from 'react'
import { ServiceCard } from './Card'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

export interface OurServicesProps {
    text: string
    image: string
    link: string
}

export const OurServices = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const serviceData: OurServicesProps[] = [
        {
            text: 'Work Based Training',
            image: 'training.png',
            link: 'work-based-training',
        },
        {
            text: 'Talent Pool',
            image: 'talent-pool.png',
            link: 'talent-pool',
        },
        // {
        //     text: 'Employment Hub',
        //     image: 'businessman.png',
        //     link: 'employment-hub',
        // },
        // {
        //     text: 'Upskill Traineeship Program',
        //     image: 'upskilling.png',
        //     link: 'upskill-traineeship-program',
        // },
    ]
    return (
        <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-5">
            <div className="max-w-7xl mx-auto ">
                <div className="flex flex-col gap-y-3 px-8 md:px-6 xl:px-0">
                    <Typography bold center>
                        <span className="text-xl md:text-3xl lg:text-[47px]">
                            Our Services
                        </span>
                    </Typography>
                    <Typography center variant={isMobile ? 'label' : 'body'}>
                        Discover our wide range of services catered to your
                        requirements, including Work-Based Training, Talent
                        pool, Employment Hub, and Upskill Traineeship
                        Programmes. Supporting Industries, RTOs, and Students
                        alike, click your desired extension below to get our
                        all-inclusive solutions
                    </Typography>
                </div>

                {/*  */}
                <div className="pt-10 px-4 md:px-2 xl:px-0 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4 md:gap-y-6">
                    {serviceData?.map(
                        (service: OurServicesProps, i: number) => (
                            <ServiceCard key={i} service={service} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
