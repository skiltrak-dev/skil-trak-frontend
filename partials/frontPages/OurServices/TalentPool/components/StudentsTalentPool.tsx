import React from 'react'
import { TalentPoolCard } from '../Card'
import { Typography } from '@components'

export const StudentsTalentPool = () => {
    return (
        <TalentPoolCard title="Students">
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant={'label'} color={'text-[#56585a]'} bold>
                        Unlocking Opportunities
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        The journey to finding the perfect job can be
                        challenging, but with SkilTrak's Talent Pool, students
                        and job seekers gain access to a multitude of employment
                        opportunities tailored to their qualifications and
                        preferences
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant={'label'} color={'text-[#56585a]'} bold>
                        Accelerated Employment{' '}
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        By registering with us, students who have completed
                        their qualifications significantly enhance their chances
                        of securing employment early in their careers. Our
                        extensive network of industry partners actively seeks
                        talented individuals to fill their vacant positions,
                        providing students with expedited access to meaningful
                        employment opportunities.
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant={'label'} color={'text-[#56585a]'} bold>
                        Streamlined Process{' '}
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        At SkilTrak, we understand the importance of simplicity
                        and efficiency. That's why we handle everything from
                        scheduling interviews to managing documentation,
                        ensuring a hassle-free student experience every step of
                        the way.
                    </Typography>
                </div>
            </div>
        </TalentPoolCard>
    )
}
