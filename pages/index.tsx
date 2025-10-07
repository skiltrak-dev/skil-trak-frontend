import {
    AssuredPlacement,
    CollaborationAddOns,
    ContactAndBlogs,
    CountsSection,
    HeroSection,
    StudentSuccessStories,
    TrustedByMarquee,
    WhoWeServe,
} from '@components/site'
import { SiteLayout } from '@layouts'
import TechnicalPartners from '@partials/frontPages/home2/TechnicalPartners/TechnicalPartners'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const HomeV3: NextPageWithLayout = ({ featuredBlogs }: any) => {
    return (
        <>
            <HeroSection />
            {/* <TrustedByMarquee /> */}
            <WhoWeServe />
            <CountsSection />
            <AssuredPlacement />
            <CollaborationAddOns />
            {/* ✅ Pass featuredBlogs as props here */}
            <ContactAndBlogs featuredBlogs={featuredBlogs} />
            <StudentSuccessStories />
            <TechnicalPartners />
        </>
    )
}

HomeV3.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

// ✅ Fetch featured blogs from your API
export const getStaticProps = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`
        )
        const data = await res.json()

        // Filter featured blogs
        const featuredBlogs =
            data?.filter((item: any) => item?.isFeatured) || []

        return {
            props: {
                featuredBlogs,
            },
            revalidate: 60, // Rebuild every 60 seconds
        }
    } catch (error) {
        console.error('Error fetching featured blogs:', error)
        return {
            props: {
                featuredBlogs: [],
            },
        }
    }
}

export default HomeV3
