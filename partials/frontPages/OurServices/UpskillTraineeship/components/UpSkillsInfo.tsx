import { Typography } from '@components'
import React from 'react'

export const UpSkillsInfo = () => {
    return (
        <div>
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-3">
                    <Typography variant={'h4'} color={'text-[#25566B]'} bold>
                        Access to Top Talent{' '}
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        Are you a skilled hospitality professional seeking new
                        opportunities and experiences? Look no further! Our
                        invitation is extended to the overseas Hospitality
                        Industry and commercial cookery workers working anywhere
                        outside Australia like you, eager to elevate your career
                        in the vibrant Australian hospitality scene.
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
                        Australian adventure
                    </Typography>
                </div>

                {/*  */}
                <div className="flex flex-col gap-y-5">
                    <Typography variant="h4" color={'text-[#25566B]'}>
                        Why Australia?
                    </Typography>

                    {/*  */}
                    <div className="flex flex-col gap-y-1">
                        <Typography
                            variant="label"
                            color={'text-[#56585a]'}
                            extraBold
                        >
                            Dynamic Hospitality Hub
                        </Typography>
                        <Typography variant="label" color={'text-[#56585a]'}>
                            From bustling urban cafes to world-class
                            restaurants, Australia offers a diverse and thriving
                            hospitality landscape that is constantly evolving.
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="flex flex-col gap-y-1">
                        <Typography
                            variant="label"
                            color={'text-[#56585a]'}
                            extraBold
                        >
                            International Exposure
                        </Typography>
                        <Typography variant="label" color={'text-[#56585a]'}>
                            Join a multicultural workforce and immerse yourself
                            in a melting pot of cultures, cuisines, and
                            experiences.
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="flex flex-col gap-y-1">
                        <Typography
                            variant="label"
                            color={'text-[#56585a]'}
                            extraBold
                        >
                            Career Development
                        </Typography>
                        <Typography variant="label" color={'text-[#56585a]'}>
                            Gain invaluable experience, refine your skills, and
                            broaden your horizons in one of the world's most
                            sought-after hospitality destinations.
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="flex flex-col gap-y-1">
                        <Typography
                            variant="label"
                            color={'text-[#56585a]'}
                            extraBold
                        >
                            Quality of Life
                        </Typography>
                        <Typography variant="label" color={'text-[#56585a]'}>
                            Gain invaluable experience, refine your skills, and
                            broaden your horizons in one of the world's most
                            sought-after hospitality destinations.
                        </Typography>
                    </div>
                </div>

                {/* Looking For */}
                <div className="flex flex-col gap-y-3">
                    <Typography variant={'h4'} color={'text-[#25566B]'} bold>
                        Who We're Looking For
                    </Typography>
                    <Typography color={'text-[#56585a]'} variant="label">
                        If you're between the ages of 24 and 36, with 1 to 5
                        years of experience in the hospitality industry and any
                        qualification in the field, we want to hear from you!
                        Whether you're a talented chef, a skilled barista, or a
                        passionate front-of-house professional, there's a place
                        for you in Australia's thriving hospitality industry.
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
