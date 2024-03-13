import React from 'react'
import { TalentPoolCard, TalentPoolType } from '../Card'
import { Typography } from '@components'

const forIndustriesTalentPool: TalentPoolType[] = [
    {
        image: '/unlockingOpportunities.png',
        title: 'Access to Top Talent',
        description:
            "In today's competitive landscape, finding skilled professionals is paramount to success. With SkilTrak's Talent Pool, industries gain access to a pool of pre-qualified candidates who have undergone rigorous assessments to ensure their readiness for the Australian job market.",
    },
    {
        image: '/acceleratedEmployment.png',
        title: 'Customised Selection',
        description:
            'Industries can browse through candidate profiles and work experience to identify individuals who align with their specific requirements. From scheduling interviews to conducting assessments, SkilTrak facilitates a seamless selection process that empowers industries to make informed hiring decisions.',
    },
    {
        image: '/streamlinedProcess.png',
        title: 'Addressing Staff Shortages',
        description:
            'Staff shortages can impede growth and hinder productivity. The Talent Pool feature has proven to be a game-changer for industries, enabling them to mitigate staff shortages by recruiting professional staff members who are equipped to drive organisational success.',
    },
]

export const IndustriesTalentPool = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div data-aos="fade-up">
                <Typography color={'text-[#25566B]'} variant="h3" bold center>
                    For Industries
                </Typography>
            </div>
            <div className="flex flex-col gap-y-3.5">
                {forIndustriesTalentPool.map((student: TalentPoolType) => (
                    <TalentPoolCard detail={student} />
                ))}
            </div>
        </div>
    )
}
