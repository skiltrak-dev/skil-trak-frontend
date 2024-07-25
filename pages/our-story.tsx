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
    OurStoryStudentSection,
} from '@partials/frontPages'
import OurPartners from '@partials/frontPages/home2/OurPartners/OurPartners'
import { NextPageWithLayout } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import Marquee from 'react-fast-marquee'

const items = [
    {
        title: 'Slide 1',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).
        With a steadfast commitment to aligning your aspirations with industry demands, we offer an extensive array of sectors spanning various fields of interest. Our recent successes have seen a surge in employment and placements in sectors such as`,
        image: '/images/our-story/mental-health.png',
    },
    {
        title: 'Slide 2',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/disability.png',
    },
    {
        title: 'Slide 3',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/hospitality.png',
    },
    {
        title: 'Slide 4',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/commercial-cookery.png',
    },
    {
        title: 'Slide 5',
        description: `SkilTrak is your premier destination for tailored employment and placement services in Australia. At SkilTrak, we specialise in providing employment in top-notch industries to individual candidates as well as students affiliated with our partnered Registered Training Organisations (RTOs).`,
        image: '/images/our-story/commercial-cookery.png',
    },
]

const OurStory: NextPageWithLayout = () => {
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
            <div className="skiltrak-is-working-with-bg">
                <div className="pt-16">
                    <Typography variant="h2" medium center>
                        Skiltrak Is Working With
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto max-w-7xl mt-9">
                    <div className="bg-white rounded-lg p-3 border-gradient border-2">
                        <Image
                            src={'/images/our-story/skiltrak-logo.svg'}
                            alt="Logo"
                            width={162}
                            height={48}
                        />
                    </div>
                    <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                    <div className="h-[1px] w-[80%] mx-auto border-dashed border-[#24536B] border md:block hidden"></div>
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div className="bg-white rounded-lg w-32 h-14 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center">
                                <Image
                                    src={'/images/our-story/rto.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/rto.svg'}
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    RTO’s
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div className="bg-white rounded-lg w-32 h-14 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center">
                                <Image
                                    src={'/images/our-story/industry.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/industry.svg'}
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    Industries
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div className="bg-white rounded-lg w-32 h-14 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center">
                                <Image
                                    src={'/images/our-story/student.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/student.svg'}
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    Students
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div className="bg-white rounded-lg w-40 h-16 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center">
                                <Image
                                    src={'/images/our-story/handshake.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/handshake.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    International Ventures
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-11">
                    <Link
                        href="/auth/signup"
                        className=" text-white md:text-white md:text-base text-xs font-medium bg-orange-400 rounded-lg px-4 py-2 uppercase"
                    >
                        sign up to your desire portal
                    </Link>
                </div>
            </div>

            {/* Our LMS */}
            <OurStoryLmsSection />

            {/* RTO */}

            <OurStoryRtoSection />
            <OurStoryIndustrySection />
            <OurStoryStudentSection />

            <OurStoryInternationalVentureSection />
            <OurStoryMapSection />
            <OurPartners />

            <div className="bg-[#EB8329] py-[72px] mt-5 px-4">
                <Typography variant="title" color="text-white" center>
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
