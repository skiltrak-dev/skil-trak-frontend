import { Typography } from '@components'
import { SiteLayout } from '@layouts'
import {
    GoogleReviewCard,
    OurStoryInternationalVentureSection,
    OurStoryLetsCollaborateSection,
    OurStoryLmsSection,
    OurStoryMapSection,
    OurStoryProfilesSections,
    OurStorySkiltrakAppSection,
    OurStorySkiltrakIsWorkingWithSection,
    Services,
    WhoAreWe,
    OurStoryStudentSection,
} from '@partials/frontPages'
import OurPartners from '@partials/frontPages/home2/OurPartners/OurPartners'
import { OurTrustedPartner } from '@partials/frontPages/ourStory/components/OurTrustedPartner'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'
import { ReactElement } from 'react'

const OurStory: NextPageWithLayout = () => {
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
                <h2 className="text-white text-center text-xl md:text-4xl font-extrabold leading-normal [text-shadow:_0px_7px_14px_rgba(0_0_0_/_0.25)]">
                    Welcome to SkilTrak
                </h2>
                <p className="text-white capitalize font-medium text-base md:text-lg">
                    Your Ideal ally in career support
                </p>
                <div className="flex items-center md:w-[544px] bg-white gap-x-2.5 md:gap-x-5 justify-center py-2.5 px-8 rounded-lg shadow-md mt-7">
                    <Typography
                        variant="muted"
                        color="text-[#21506A]"
                        capitalize
                    >
                        1000+ students
                    </Typography>
                    <span className="w-[1px] h-5 md:h-3 bg-[#21506A]"></span>
                    <Typography
                        variant="muted"
                        color="text-[#21506A]"
                        capitalize
                    >
                        3000+ industry partners
                    </Typography>
                    <span className="w-[2px] h-5 md:h-3 bg-[#21506A]"></span>
                    <Typography
                        variant="muted"
                        color="text-[#21506A]"
                        capitalize
                    >
                        6 years of experience
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
            <OurStoryInternationalVentureSection />

            <div className="bg-[#EB8329] py-[72px] mt-5 px-4">
                <Typography variant="h4" color="text-white" center>
                    HEAR FROM THOSE WHO'VE EXPERIENCED EXCELLENCE
                </Typography>
            </div>
            <div className="flex items-center justify-between flex-col md:flex-row gap-4 mx-auto max-w-7xl my-8 px-4 md:px-0 md:my-16">
                {[...Array(3)].map((_, i) => (
                    <GoogleReviewCard key={i} />
                ))}
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
