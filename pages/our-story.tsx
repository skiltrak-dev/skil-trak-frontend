import { Typography } from '@components'
import { SiteLayout } from '@layouts'
import { Carousel } from '@partials/common'
import {
    GoogleReviewCard,
    OurStoryIndustrySection,
    OurStoryInternationalVentureSection,
    OurStoryLetsCollaborateSection,
    OurStoryLmsSection,
    OurStoryMapSection,
    OurStoryRtoSection,
    OurStorySkiltrakAppSection,
    OurStorySkiltrakIsWorkingWithSection,
    OurStoryStudentSection,
} from '@partials/frontPages'
import OurPartners from '@partials/frontPages/home2/OurPartners/OurPartners'
import { NextPageWithLayout } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect, useRef } from 'react'
import Marquee from 'react-fast-marquee'

import { motion, useTransform, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const items = [
    {
        title: 'Mental Health',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).
        With a steadfast commitment to aligning your aspirations with industry demands, we offer an extensive array of sectors spanning various fields of interest. Our recent successes have seen a surge in employment and placements in sectors such as`,
        image: '/images/our-story/mental-health.png',
    },
    {
        title: 'Disability Support',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/disability.png',
    },
    {
        title: 'Hospitality',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/hospitality.png',
    },
    {
        title: 'Commercial Cookery',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/commercial-cookery.png',
    },
    {
        title: 'Allied Health Assistance',
        image: '/images/our-story/allied-health-care.jpg',
    },
    {
        title: 'School Based Education Support',
        image: '/images/our-story/school-based-education-support.jpg',
    },
    {
        title: 'Cleaning Operations',
        image: '/images/our-story/cleaning-operations.jpg',
    },
    {
        title: 'Business to Business Sales',
        image: '/images/our-story/business-to-business-sales.jpg',
    },
    {
        title: 'Supply Chain Operations (Warehousing Operations)',
        image: '/images/our-story/warehouse-operations.jpg',
    },
]

const OurStory: NextPageWithLayout = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])

    return (
        <>
            {/* Welcome Card */}
            <div className="bg-[#F7A619] mx-auto max-w-7xl flex flex-col justify-center items-center p-4     md:p-12 rounded-b-md">
                <h2 className="text-white text-center text-xl md:text-4xl font-extrabold leading-normal [text-shadow:_0px_7px_14px_rgba(0_0_0_/_0.25)]">
                    Welcome to SkilTrak
                </h2>
                <p className="text-white font-medium text-base md:text-lg">
                    Your Ideal ally in career support
                </p>
                <div className="flex items-center md:w-[544px] bg-white gap-x-2.5 md:gap-x-5 justify-center py-2.5 px-8 rounded-lg shadow-md mt-7">
                    <Typography variant="muted" color="text-[#21506A]">
                        1000+ students
                    </Typography>
                    <span className="w-[1px] h-5 md:h-3 bg-[#21506A]"></span>
                    <Typography variant="muted" color="text-[#21506A]">
                        3000+ industry partners
                    </Typography>
                    <span className="w-[2px] h-5 md:h-3 bg-[#21506A]"></span>
                    <Typography variant="muted" color="text-[#21506A]">
                        6 years of experience
                    </Typography>
                </div>
            </div>

            {/* Sectors Carousal  */}
            <Carousel items={items} />

            {/* Services */}
            <div className="mt-10">
                <Typography variant="h2" center>
                    SERVICES
                </Typography>
                <div className="mt-4">
                    <div className="bg-gradient-to-r from-[#893D00] to-[#F7A619] py-2">
                        <Marquee
                            className="w-full py-2 flex items-center gap-x-9"
                            direction={'left'}
                            speed={35}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <Typography
                                            variant="body"
                                            semibold
                                            color="text-white"
                                            center
                                            uppercase
                                        >
                                            Work Based Training
                                        </Typography>
                                        <div className="w-[2px] h-9 bg-white mx-9"></div>
                                    </div>
                                )
                            )}
                        </Marquee>
                    </div>

                    <div className="bg-gradient-to-r from-[#000000] to-[#666666] py-2">
                        <Marquee
                            className="w-full py-2 flex items-center gap-x-9"
                            direction={'right'}
                            speed={35}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <Typography
                                            variant="body"
                                            semibold
                                            color="text-white"
                                            center
                                            uppercase
                                        >
                                            TALENT POOL
                                        </Typography>
                                        <div className="w-[2px] h-9 bg-white mx-9"></div>
                                    </div>
                                )
                            )}
                        </Marquee>
                    </div>
                    <div className="bg-gradient-to-r from-[#666666] to-[#0D3958] py-2">
                        <Marquee
                            className="w-full py-2 flex items-center gap-x-9"
                            speed={35}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <Typography
                                            variant="body"
                                            semibold
                                            color="text-white"
                                            center
                                            uppercase
                                        >
                                            Employment Hub
                                        </Typography>
                                        <div className="w-[2px] h-9 bg-white mx-9"></div>
                                    </div>
                                )
                            )}
                        </Marquee>
                    </div>

                    <div className="bg-gradient-to-r from-[#F7A619] to-[#893D00] py-2">
                        <Marquee
                            className="w-full py-2 flex items-center gap-x-9"
                            direction={'right'}
                            speed={35}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <Typography
                                            variant="body"
                                            semibold
                                            color="text-white"
                                            uppercase
                                            center
                                        >
                                            Upskill Traineeship Program
                                        </Typography>
                                        <div className="w-[2px] h-9 bg-white mx-9"></div>
                                    </div>
                                )
                            )}
                        </Marquee>
                    </div>
                </div>
            </div>

            {/* Skiltrak is working with */}
            <OurStorySkiltrakIsWorkingWithSection />

            {/* Our LMS */}
            <OurStoryLmsSection />

            {/* RTO */}
            {isMobile ? (
                <>
                    <OurStoryRtoSection />
                    <OurStoryIndustrySection />
                    <OurStoryStudentSection />
                </>
            ) : (
                <section ref={targetRef} className="relative h-[300vh]">
                    <div className="sticky top-5 flex h-screen items-center overflow-hidden">
                        <motion.div
                            style={{ x }}
                            className="flex flex-nowrap w-full"
                        >
                            <motion.div
                                className="min-w-full flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <OurStoryRtoSection />
                            </motion.div>
                            <motion.div
                                className="min-w-full flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <OurStoryIndustrySection />
                            </motion.div>
                            <motion.div
                                className="min-w-full flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <OurStoryStudentSection />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            )}
            <OurStoryMapSection />

            <OurPartners />
            <OurStoryInternationalVentureSection />

            <div className="bg-[#EB8329] py-[72px] mt-5 px-4">
                <Typography variant="h4" color="text-white" center>
                    HEAR FROM THOSE WHO'VE EXPERIENCED EXCELLENCE
                </Typography>
            </div>
            <div className="flex items-center justify-between flex-col md:flex-row gap-4 mx-auto max-w-7xl my-8 px-4 md:px-0 md:my-16">
                <GoogleReviewCard />
                <GoogleReviewCard />
                <GoogleReviewCard />
            </div>
            <OurStorySkiltrakAppSection />
            <OurStoryLetsCollaborateSection />
        </>
    )
}

OurStory.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}
export default OurStory
