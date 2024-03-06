import React from 'react'
import { TalentPoolCard } from '../Card'
import { Typography } from '@components'

export const IndustriesTalentPool = () => {
    return (
        <TalentPoolCard title="Industries">
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant={'label'} color={'text-[#56585a]'} bold>
                        Access to Top Talent{' '}
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        In today's competitive landscape, finding skilled
                        professionals is paramount to success. With SkilTrak's
                        Talent Pool, industries gain access to a pool of
                        pre-qualified candidates who have undergone rigorous
                        assessments to ensure their readiness for the Australian
                        job market.
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant={'label'} color={'text-[#56585a]'} bold>
                        Customised Selection{' '}
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        Industries can browse through candidate profiles and
                        work experience to identify individuals who align with
                        their specific requirements. From scheduling interviews
                        to conducting assessments, SkilTrak facilitates a
                        seamless selection process that empowers industries to
                        make informed hiring decisions.
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant={'label'} color={'text-[#56585a]'} bold>
                        Addressing Staff Shortages{' '}
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        Staff shortages can impede growth and hinder
                        productivity. The Talent Pool feature has proven to be a
                        game-changer for industries, enabling them to mitigate
                        staff shortages by recruiting professional staff members
                        who are equipped to drive organisational success.
                    </Typography>
                </div>
            </div>
        </TalentPoolCard>
    )
}
