import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const OperateStates = () => {
    const [active, setActive] = useState(0)

    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const containerRef = useRef<any>(null)

    const courses = {
        YouthWork: 'Youth work',
        CommunityService: 'Community Service',
        EducationSupport: 'Education Support',
        MentalHealth: 'Mental health',
        EarlyChildhoodEducationAndCare: 'Early childhood education and care',
        Disability: 'Disability',
        AgeingSupport: 'Ageing support',
        HealthServicesAssistance: 'Health services assistance',
        IndividualSupport: 'Individual support ',
    }

    const states = [
        'Western Australia',
        'Northern Territory',
        'Queens Land',
        'Southern Australia',
        'New South Wales',
        'Victoria',
        'Tasmania',
    ]

    const imagesTexts = states?.map((state: string) => ({
        state,
        courses: Object.values(courses),
    }))

    const handleImageClick = (index: number) => {
        setActive(index)
        if (isMobile && containerRef.current) {
            const container = containerRef.current
            const scrollPosition = index * 170
            const duration = 600 // Adjust the duration in milliseconds

            const startTime = performance.now()
            const startScrollLeft = container.scrollLeft

            const animateScroll = (currentTime: number) => {
                const elapsedTime = currentTime - startTime
                const progress = Math.min(elapsedTime / duration, 1)

                container.scrollLeft =
                    startScrollLeft +
                    progress * (scrollPosition - startScrollLeft)

                if (progress < 1) {
                    requestAnimationFrame(animateScroll)
                }
            }

            requestAnimationFrame(animateScroll)
        }
    }
    return (
        <div className="pt-10 pb-16">
            <div className="pb-8 flex justify-center" data-aos="fade-up">
                <Typography
                    variant={isMobile ? 'title' : 'h2'}
                    {...(isMobile
                        ? {
                              center: true,
                          }
                        : {})}
                    bold
                >
                    We operate in following states
                </Typography>
            </div>
            <div
                data-aos="fade-up"
                className="max-w-7xl mx-auto overflow-auto md:overflow-hidden box-content px-10"
                ref={containerRef}
            >
                <div className="w-full flex justify-between gap-x-2 md:gap-x-0 items-center ">
                    {imagesTexts?.map((detail, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setActive(i)}
                            onClick={() => handleImageClick(i)}
                            className={`${
                                i === active ? 'min-w-[280px]' : 'min-w-[160px]'
                            } transition-all duration-500 h-[434px] overflow-hidden relative rounded-[5px]`}
                        >
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-1.5 items-center justify-end pb-6">
                                <Typography
                                    variant={i === active ? 'title' : 'small'}
                                    medium
                                    center
                                    color={
                                        'text-white transition-all duration-500'
                                    }
                                >
                                    {detail?.state}
                                </Typography>{' '}
                                {detail?.courses &&
                                    detail?.courses.length > 0 && (
                                        <div
                                            className={`${
                                                i === active
                                                    ? 'opacity-100 max-h-52 duration-[1700ms]'
                                                    : 'opacity-0 max-h-0 duration-[1200ms]'
                                            } transition-all  overflow-hidden`}
                                        >
                                            <div className="delay-1000 transition-all flex items-center justify-center flex-wrap gap-1.5 w-[80%] mx-auto">
                                                {detail?.courses?.map(
                                                    (course, i) => (
                                                        <p
                                                            className="text-[11px] border text-white border-white px-2 py-1 rounded-md bg-[#ffffff30]"
                                                            key={i}
                                                        >
                                                            {course}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                            <Image
                                src={`/images/site/states/state${i + 2}.png`}
                                alt={''}
                                width={0}
                                height={0}
                                sizes={'100vw 100vh'}
                                className={`min-w-full h-full object-cover`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
