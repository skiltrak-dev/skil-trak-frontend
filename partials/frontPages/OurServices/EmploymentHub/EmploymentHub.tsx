import { Button, Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { EmploymentHubCard } from './Card'

export const EmploymentHub = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const employmentCardsData = [
        {
            title: 'Connecting Employers and Job Seekers',
            description:
                "We understand the challenges both employers and job seekers face in navigating the employment landscape. That's why we've created a centralised hub where industries can showcase their job openings, and qualified candidates can explore these opportunities with ease. By facilitating this connection, we strive to streamline the recruitment process for both parties involved.",
            bgColor: 'bg-[#FFE4C1]',
        },
        {
            title: 'Effortless Employment Process',
            description:
                'At SkilTrak, we believe in making the employment process as hassle-free as possible. From handling all documentation and agreements to arranging virtual meetings, we take care of the logistics so that employers and candidates can focus on what matters most: finding the right fit. Our goal is to provide a seamless experience that saves time and resources for everyone involved.',
            bgColor: 'bg-[#D4D7FF]',
        },
        {
            title: 'Unlocking Opportunities',
            description:
                'For qualified individuals, our Employment Section presents a wealth of opportunities to secure positions within highly reputable industries. By leveraging our platform, candidates can increase their chances of landing their dream job and advancing their careers in meaningful ways.',
            bgColor: 'bg-primaryNew',
            dark: true,
        },
    ]

    return (
        <div className="relative">
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[310px] right-0 -z-10"
            />
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[700px] -left-40 -z-10"
            />

            <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-20 sticky top-0">
                <div className="max-w-7xl mx-auto ">
                    <div className="max-w-6xl mx-auto flex flex-col gap-y-7 px-8 md:px-6 xl:px-0">
                        <Typography bold center>
                            <span className="text-xl md:text-3xl lg:text-[47px]">
                                Employment Hub
                            </span>
                        </Typography>
                        <div className="flex flex-col gap-y-2.5">
                            <Typography
                                center
                                // variant={isMobile ? 'label' : 'body'}
                                color={'text-[#25566B]'}
                                bold
                            >
                                <span className="text-[21px]">
                                    Welcome to SkilTrak's Employment Hub
                                </span>
                            </Typography>
                            <Typography
                                center
                                variant={isMobile ? 'label' : 'body'}
                                color={'text-[#56585a]'}
                            >
                                At SkilTrak, we are committed to helping
                                industries seeking talented professionals and
                                qualified individuals ready to set out on their
                                professional pathways. Our new Employment Hub
                                serves as a dynamic platform where registered
                                industries can seamlessly post advertisements
                                for their vacant positions, while prospective
                                candidates who have completed their placements
                                through us gain exclusive access to these
                                opportunities.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/* Get Started Today */}
            <div className="max-w-7xl mx-auto -mt-20 relative z-20 py-10">
                <div className="w-full relative">
                    {employmentCardsData?.map((employment, index) => (
                        <div
                            key={index}
                            className={`sticky top-80 ${
                                index !== 0 ? '-mt-16' : ''
                            } `}
                        >
                            <EmploymentHubCard
                                employment={employment}
                                lastIndex={
                                    employmentCardsData?.length - 1 === index
                                }
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center pt-8">
                    <Button text={'Get Started Today'} />
                </div>
            </div>
        </div>
    )
}
