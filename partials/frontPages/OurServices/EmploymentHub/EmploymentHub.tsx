import { Button, Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
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
            bgColor: 'bg-secondary-dark',
        },
        {
            title: 'Get Started Today',
            description:
                "Whether you're an industry looking to fill a crucial position or a qualified individual seeking new opportunities, we invite you to explore our Employment Hub and take advantage of all that it has to offer. Join us in building a brighter future where talent meets opportunity.",

            bgColor: 'bg-primaryNew',
            dark: true,
        },
    ]

    const [isSticky, setIsSticky] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    const employmentHubRef = useRef<any>()

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setScrollY(scrollPosition)
            const employmentHubOffsetTop = employmentHubRef?.current?.offsetTop

            // Check if the scroll position is below the Employment Hub section
            if (scrollPosition > employmentHubOffsetTop) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll)

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

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

            <div
                className={`ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-20 sticky  transition-all duration-1000`}
                style={{
                    top: isSticky ? `-${scrollY / 3.5}px` : '80px',
                }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-6xl mx-auto flex flex-col gap-y-7 px-8 md:px-6 xl:px-0">
                        <h1 className="font-bold text-center text-xl md:text-3xl lg:text-[47px]">
                            Employment Hub
                        </h1>
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
                            className={`sticky top-20 md:top-[360px] ${
                                index !== 0 ? '-mt-20 md:-mt-16' : ''
                            } `}
                            ref={
                                employmentCardsData?.length - 1 === index
                                    ? employmentHubRef
                                    : null
                            }
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
            </div>
        </div>
    )
}
