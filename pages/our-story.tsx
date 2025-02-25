import { Typography } from '@components'
import { SiteLayout } from '@layouts'
import {
    GoogleReviewSlider,
    OurStoryInternationalVentureSection,
    OurStoryLetsCollaborateSection,
    OurStoryLmsSection,
    OurStoryMapSection,
    OurStoryProfilesSections,
    OurStorySkiltrakAppSection,
    OurStorySkiltrakIsWorkingWithSection,
    RtoReviewSlider,
    Services,
    WhoAreWe,
} from '@partials/frontPages'
import OurPartners from '@partials/frontPages/home2/OurPartners/OurPartners'
import { OurTrustedPartner } from '@partials/frontPages/ourStory/components/OurTrustedPartner'
import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import { MouseEvent, ReactElement } from 'react'

const OurStory: NextPageWithLayout = () => {
    const websiteUsersCount = CommonApi.Website.useGetUserWebsiteCountQuery()

    const handleSmoothScroll = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const element = document.querySelector('#contact-us')
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    // Input date of birth
    const joiningDate = '2018-01-01'

    // Calculate age
    const diff = moment().diff(moment(joiningDate, 'YYYY-MM-DD'), 'years')
    return (
        <>
            <Head>
                <title>Our Story</title>
                <meta
                    name="description"
                    content={`SkilTrak is your premier destination for tailored employment and
                        placement services in Australia. At SkilTrak, we specialize in
                        providing employment in top-notch industries to individual
                        candidates as well as students affiliated with our partnered
                        Registered Training Organizations (RTOs).`}
                    key="desc"
                />
            </Head>
            {/* Welcome Card */}

            <div className="bg-[#F7A619] mx-auto max-w-7xl flex flex-col justify-center items-center p-4     md:p-12 rounded-b-md">
                <h1 className="text-white text-center text-xl md:text-4xl font-extrabold leading-normal [text-shadow:_0px_7px_14px_rgba(0_0_0_/_0.25)]">
                    Welcome to SkilTrak
                </h1>
                <p className="text-white capitalize font-medium text-base md:text-lg">
                    Your Ideal ally in career support
                </p>
                <div className="flex items-center md:w-[544px] bg-white gap-x-2.5 md:gap-x-5 justify-center py-2.5 px-8 rounded-lg shadow-md mt-7">
                    <Typography
                        variant="muted"
                        color="text-[#21506A]"
                        capitalize
                    >
                        {websiteUsersCount?.data?.students || 0} students
                    </Typography>
                    <span className="w-[1px] h-5 md:h-3 bg-[#21506A]"></span>
                    <Typography
                        variant="muted"
                        color="text-[#21506A]"
                        capitalize
                    >
                        {websiteUsersCount?.data?.industries || 0} industry
                        partners
                    </Typography>
                    <span className="w-[2px] h-5 md:h-3 bg-[#21506A]"></span>
                    <Typography
                        variant="muted"
                        color="text-[#21506A]"
                        capitalize
                    >
                        {diff} years of experience
                    </Typography>
                </div>
            </div>

            {/* Sectors Carousal  */}
            <WhoAreWe />
            {/* <Carousel items={items} /> */}

            {/* Services */}
            <Services />

            {/* Skiltrak is working with */}
            <OurStorySkiltrakIsWorkingWithSection />

            {/* Our LMS */}
            <OurStoryLmsSection />

            {/* RTO */}
            <OurStoryProfilesSections />

            <OurStoryMapSection />

            <OurPartners />
            <div className="mt-12">
                <OurTrustedPartner />
            </div>
            {/* <OurStoryInternationalVentureSection /> */}

            <div className="bg-[#EB8329] py-[72px] mt-5 px-4">
                <Typography variant="h4" color="text-white" center>
                    HEAR FROM THOSE WHO'VE EXPERIENCED EXCELLENCE
                </Typography>
            </div>
            {/* <div className="flex items-center justify-between flex-col md:flex-row gap-4 mx-auto max-w-7xl my-8 px-4 md:px-0 md:my-16">
                {googleReviews?.map((review, i) => (
                    <GoogleReviewCard
                        review={review?.review}
                        name={review?.name}
                        rating={review?.rating}
                        link={review?.link}
                        key={i}
                    />
                ))}
            </div> */}
            <div>
                <GoogleReviewSlider />
            </div>
            <div className="mx-auto max-w-7xl w-full my-20">
                <Image
                    src={'/images/roadmap.png'}
                    alt={''}
                    width={0}
                    height={0}
                    sizes={'100vh 100vw'}
                    className="w-full h-full"
                />
            </div>

            <RtoReviewSlider />
            <OurStorySkiltrakAppSection />
            <OurStoryLetsCollaborateSection />
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            data: [],
        },
    }
}

OurStory.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}
export default OurStory
