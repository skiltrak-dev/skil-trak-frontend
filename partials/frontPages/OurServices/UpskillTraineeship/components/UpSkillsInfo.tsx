import { Typography } from '@components'
import React from 'react'

export const UpSkillsInfo = () => {
    return (
        <div>
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-3">
                    <Typography variant={'h4'} color={'text-[#25566B]'} bold>
                        Upskill Your Career In Australia
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        We are giving you a chance to come to Australia and
                        upskill your profession in the fields of Hospitality,
                        Commercial Cookery, Mental Health, Aged Care, Disability
                        Sector, Community Services, Allied Health and many more.
                        Whether you're a seasoned professional or just starting,
                        there's a place for you to thrive and upskill your
                        talents in our diverse and dynamic industry.
                    </Typography>
                </div>

                <div className="flex flex-col gap-y-3">
                    <Typography variant={'h4'} color={'text-[#25566B]'} bold>
                        Confirmed Employment by SkilTrak
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        At Skiltrak, we understand the importance of assurance
                        in your career transition. That's why we ensure that
                        your employment will be confirmed before you land in
                        Australia. With our dedicated team of employment and
                        sourcing coordinators and extensive network of
                        industries, we work tirelessly to secure exciting
                        opportunities reshaping your skills and aspirations,
                        giving you peace of mind as you launch into your
                        Australian adventure.
                    </Typography>
                </div>

                {/*  */}

                {/* Looking For */}
                <div className="flex flex-col gap-y-3">
                    <Typography variant={'h4'} color={'text-[#25566B]'} bold>
                        Who We're Looking For
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        If you're between the ages of 24 and 36, with 1 to 5
                        years of experience in the professions mentioned above
                        and any qualification in the field, we want to hear from
                        you! The Australian Job Market is waiting for your
                        contribution. 
                    </Typography>
                </div>

                {/* Next Step */}
                <div className="flex flex-col gap-y-3">
                    <Typography variant={'h4'} color={'text-[#25566B]'} bold>
                        Take the Next Step
                    </Typography>
                    <div className="flex flex-col gap-y-5">
                        <Typography color={'text-[#56585a]'} variant="label">
                            Ready to embark on your Australian adventure? Simply
                            fill out the form below to express your interest and
                            take the first step towards a rewarding career Down
                            Under. Our dedicated team is here to guide you
                            through the process and help you make the most of
                            this exciting opportunity.
                        </Typography>
                        <Typography color={'text-[#56585a]'} variant="label">
                            Join us in shaping the future of Australian
                            hospitality and unlocking the doors to endless
                            possibilities! Fill out the form now to get started.
                        </Typography>
                        <Typography color={'text-[#56585a]'} variant="label">
                            Don't miss out on this chance to elevate your career
                            and experience all that Australia has to offer. Your
                            journey starts here!
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
