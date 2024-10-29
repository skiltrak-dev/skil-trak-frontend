import { ReactElement, lazy, useRef } from 'react'

// Components
// site components
// import { JumboSection } from '@components/site/JumboSection'
import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import dynamic from 'next/dynamic'
import { VisibilityObserver } from '@components'

const VirtualizedPageContent = dynamic(
    () => import('@components/VirtualizedPageContent'),
    { ssr: false }
)

const JumboSection = lazy(() => import('@components/site/JumboSection'))
const LatestUpdates = lazy(
    () => import('@partials/frontPages/home2/LatestUpdates/LatestUpdates')
)
const RecentJobs = lazy(
    () => import('@partials/frontPages/home2/RecentJobs/RecentJobs')
)
const TechnicalPartners = lazy(
    () =>
        import('@partials/frontPages/home2/TechnicalPartners/TechnicalPartners')
)
const OurPartners = lazy(
    () => import('@partials/frontPages/home2/OurPartners/OurPartners')
)
const OurPackages = lazy(
    () => import('@partials/frontPages/home2/OurPackages/OurPackages')
)
const OperateStates = lazy(
    () => import('@partials/frontPages/home2/OperateStates/OperateStates')
)
const GetStarted = lazy(
    () => import('@partials/frontPages/home2/GetStarted/GetStarted')
)
const ContactUs = lazy(
    () => import('@partials/frontPages/home2/ContactUs/ContactUs')
)
const StudentPlacementManagement = lazy(
    () =>
        import(
            '@components/site/studentPlacementManagement/StudentPlacementManagement'
        )
)
const KeyFeatures = lazy(
    () => import('@components/site/keyFeatures/KeyFeatures')
)

const Home3: NextPageWithLayout = ({ data }: any) => {
    const contactUsRef = useRef(null)

    const sections = [
        { Component: JumboSection, height: 400 },
        { Component: KeyFeatures, height: 600 },
        { Component: StudentPlacementManagement, height: 800 },
        { Component: OurPackages, height: 600 },
        { Component: OurPartners, height: 400 },
        { Component: OperateStates, height: 500 },
        { Component: GetStarted, height: 400 },
        { Component: RecentJobs, height: 600 },
        { Component: ContactUs, height: 500 },
        { Component: TechnicalPartners, height: 400 },
        { Component: LatestUpdates, height: 600 },
    ]

    // return (
    //     <div>
    //         {/* JumboSection stays outside virtualization since it's above the fold */}
    //         {/* <JumboSection /> */}

    //         {/* Virtualized content */}
    //         <VirtualizedPageContent sections={sections} />
    //     </div>
    // )
    return (
        <div>
            <JumboSection />
            {/* Key Features */}
            <VisibilityObserver>
                <KeyFeatures />
            </VisibilityObserver>
            {/* Student Placement Management System */}

            <VisibilityObserver>
                <StudentPlacementManagement />
            </VisibilityObserver>
            <div className="relative">
                {/* Our packages */}
                <VisibilityObserver>
                    <OurPackages />
                </VisibilityObserver>
            </div>
            {/* Our Partners */}
            <VisibilityObserver>
                <OurPartners />
            </VisibilityObserver>
            {/* We Operate in the Following States */}

            <VisibilityObserver>
                <OperateStates />
            </VisibilityObserver>

            <VisibilityObserver>
                <GetStarted contactUsRef={contactUsRef} />
            </VisibilityObserver>

            <VisibilityObserver>
                <RecentJobs />
            </VisibilityObserver>

            <VisibilityObserver>
                <ContactUs />
            </VisibilityObserver>

            {/*  */}
            <VisibilityObserver>
                <TechnicalPartners />
            </VisibilityObserver>

            <VisibilityObserver>
                <LatestUpdates />
            </VisibilityObserver>
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
