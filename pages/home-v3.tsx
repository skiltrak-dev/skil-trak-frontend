import {
    AssuredPlacement,
    CollaborationAddOns,
    ContactAndBlogs,
    CountsSection,
    HeroSection,
    StudentSuccessStories,
    TrustedByMarquee,
    WhoWeServe
} from '@components/site'
import { SiteLayout } from '@layouts'
import TechnicalPartners from '@partials/frontPages/home2/TechnicalPartners/TechnicalPartners'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const HomeV3: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <>
            <HeroSection />
            <TrustedByMarquee />
            <WhoWeServe />
            <CountsSection />
            <AssuredPlacement />
            <CollaborationAddOns />
            <ContactAndBlogs />
            <StudentSuccessStories />
            <TechnicalPartners />
        </>
    )
}

HomeV3.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default HomeV3
