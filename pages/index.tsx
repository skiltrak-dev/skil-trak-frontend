import { ReactElement, useRef } from 'react'

// Components
// site components
import { JumboSection } from '@components/site/JumboSection'
import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import dynamic from 'next/dynamic'
const LatestUpdates = dynamic(
    () => import('@partials/frontPages/home2/LatestUpdates/LatestUpdates')
)
const RecentJobs = dynamic(
    () => import('@partials/frontPages/home2/RecentJobs/RecentJobs')
)
const TechnicalPartners = dynamic(
    () =>
        import('@partials/frontPages/home2/TechnicalPartners/TechnicalPartners')
)
const OurPartners = dynamic(
    () => import('@partials/frontPages/home2/OurPartners/OurPartners')
)
const OurPackages = dynamic(
    () => import('@partials/frontPages/home2/OurPackages/OurPackages')
)
const OperateStates = dynamic(
    () => import('@partials/frontPages/home2/OperateStates/OperateStates')
)
const GetStarted = dynamic(
    () => import('@partials/frontPages/home2/GetStarted/GetStarted')
)
const ContactUs = dynamic(
    () => import('@partials/frontPages/home2/ContactUs/ContactUs')
)
const StudentPlacementManagement = dynamic(
    () =>
        import(
            '@components/site/studentPlacementManagement/StudentPlacementManagement'
        )
)
const KeyFeatures = dynamic(
    () => import('@components/site/keyFeatures/KeyFeatures')
)

const Home3: NextPageWithLayout = ({ data }: any) => {
    const contactUsRef = useRef(null)
    return (
        <div>
            <JumboSection />
            {/* Key Features */}
            <KeyFeatures />
            {/* Student Placement Management System */}
            <StudentPlacementManagement />
            <div className="relative">
                {/* Our packages */}
                <OurPackages />
            </div>
            {/* Our Partners */}
            <OurPartners />
            {/* We Operate in the Following States */}

            <OperateStates />

            <GetStarted contactUsRef={contactUsRef} />

            <RecentJobs />

            <ContactUs />

            {/*  */}
            <TechnicalPartners />

            <LatestUpdates />
        </div>
    )
}

Home3.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export async function getStaticProps() {
    return {
        props: {
            data: [],
        },
    }
}

export default Home3
