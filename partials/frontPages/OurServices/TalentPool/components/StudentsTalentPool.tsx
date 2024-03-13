import React from 'react'
import { TalentPoolCard, TalentPoolType } from '../Card'
import { Typography } from '@components'

const forStudentsTalentPool: TalentPoolType[] = [
    {
        image: '/unlockingOpportunities.png',
        title: 'Unlocking Opportunities',
        description:
            "The journey to finding the perfect job can be challenging, but with SkilTrak's Talent Pool, students and job seekers gain access to a multitude of employment opportunities tailored to their qualifications and preferences",
    },
    {
        image: '/acceleratedEmployment.png',
        title: 'Accelerated Employment',
        description:
            'By registering with us, students who have completed their qualifications significantly enhance their chances of securing employment early in their careers. Our extensive network of industry partners actively seeks talented individuals to fill their vacant positions, providing students with expedited access to meaningful employment opportunities.',
    },
    {
        image: '/streamlinedProcess.png',
        title: 'Streamlined Process',
        description:
            "At SkilTrak, we understand the importance of simplicity and efficiency. That's why we handle everything from scheduling interviews to managing documentation, ensuring a hassle-free student experience every step of the way.",
    },
]

export const StudentsTalentPool = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div data-aos="fade-up">
                <Typography color={'text-[#25566B]'} variant="h3" bold center>
                    For Students
                </Typography>
            </div>
            <div className="flex flex-col gap-y-3.5">
                {forStudentsTalentPool.map((student: TalentPoolType) => (
                    <TalentPoolCard detail={student} />
                ))}
            </div>
        </div>
    )
}
