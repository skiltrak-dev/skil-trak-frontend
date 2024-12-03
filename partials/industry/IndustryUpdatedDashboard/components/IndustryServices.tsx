import { Typography } from '@components'
import React from 'react'
import { ServiceCard, ServiceCardType } from '../cards'

export const IndustryServices = () => {
    const serviceData: ServiceCardType[] = [
        {
            image: '/images/industry/requestVolunteer.png',
            link: '/portals/industry/students/request-a-volunteer',
            linkText: 'More Details',
            title: 'Request a volunteer',
        },
        {
            image: '/images/industry/talentPool.png',
            title: 'Talent Pool',
            linkText: 'More Details',
            link: '/portals/industry/talent-pool',
        },
        {
            image: '/images/industry/jobs.png',
            title: 'Jobs',
            linkText: 'More Details',
            link: '/portals/industry/jobs/advertised-jobs',
        },
    ]
    return (
        <div className="h-full">
            <Typography variant="title">SERVICES</Typography>

            <div className="flex gap-x-5 h-[calc(100%-28px)]">
                {serviceData.map((data, i) => (
                    <ServiceCard data={data} />
                ))}
            </div>
        </div>
    )
}
