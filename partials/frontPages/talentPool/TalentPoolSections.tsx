import React from 'react'
import { SharedHeroSection } from '../components'
import { TalentPoolInfoCard } from './TalentPoolInfoCard'
import { forIndustries, forStudents } from './cardsData'
import { TalentPoolTitle } from './TalentPoolTitle'
import { ContentSectionSeparator } from '../sectors'
import { Button, Typography } from '@components'
import Link from 'next/link'

export const TalentPoolSections = () => {
    return (
        <div>
            <SharedHeroSection
                title={'Welcome to SkilTrak Talent Pool'}
                subheading="Building Brighter Future Opportunities"
                description={
                    "At SkilTrak, we're excited to introduce our latest service, the Talent Pool, designed to revolutionise the way students and industries connect in the ever-evolving job market. Our Talent Pool is a dynamic platform that seamlessly connects aspiring professionals with industry leaders, fostering mutually beneficial relationships that drive success. Here's how our Talent Pool benefits both candidates and industries"
                }
            />
            <div className="max-w-7xl mx-auto md:my-20 my-10 px-4 md:px-0">
                <TalentPoolTitle title="For Students" />
                <div className="grid grid-cols-1 md:grid-cols-3 items-start justify-center gap-6 md:gap-20 my-10 md:my-20">
                    {forStudents?.map((item: any) => (
                        <TalentPoolInfoCard
                            title={item?.title}
                            description={item?.description}
                            icon={item?.icon}
                            key={item?.title}
                        />
                    ))}
                </div>
            </div>
            <ContentSectionSeparator />
            <div className="max-w-7xl mx-auto md:my-20 my-10 px-4 md:px-0">
                <TalentPoolTitle title="For Industries" />
                <div className="grid grid-cols-1 md:grid-cols-3 items-start justify-center gap-6 md:gap-20 my-10 md:my-20">
                    {forIndustries?.map((item: any) => (
                        <TalentPoolInfoCard
                            title={item?.title}
                            description={item?.description}
                            icon={item?.icon}
                            key={item?.title}
                        />
                    ))}
                </div>
            </div>
            <div className="max-w-7xl mx-auto md:my-20 my-10 px-4 md:px-0 space-y-8">
                <TalentPoolTitle title="Join Skiltrak Today" />
                <Typography center>
                    Whether you're a job seeker embarking on a new career
                    journey or an industry leader seeking top talent, SkilTrak's
                    Talent Pool is your gateway to unparalleled opportunities
                    and connections. Register with us today to unlock the full
                    potential of our Talent Pool and discover a world of
                    possibilities. <br /> <br /> At SkilTrak, we're committed to
                    shaping the future of work by empowering individuals and
                    industries to thrive in an ever-evolving landscape. Join us
                    on this journey and experience the transformation power of
                    the Talent Pool firsthand. Together, we'll shape a path
                    towards a brighter future, capturing each opportunity as a
                    stepping stone towards collective success.
                </Typography>
                <div className="flex justify-center items-center pt-5">
                    <Link href={'/auth/login'}>
                        <Button text="Join Talent Pool" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
