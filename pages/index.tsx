import { lazy, ReactElement, useEffect, useRef, useState } from 'react'

import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { NoData } from '@components'

const JumboSection = lazy(() => import('@components/site/JumboSection'))
const FeatureBlogs = lazy(
    () => import('@components/site/FeatureBlogs/FeatureBlogs')
)
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
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    return (
        <div>
            <JumboSection />
            {/* <Asia100Award /> */}
            {/* Key Features */}
            <KeyFeatures /> {/* Student Placement Management System */}
            <StudentPlacementManagement />{' '}
            <div className="relative">
                {/* Our packages */}
                <OurPackages />{' '}
            </div>
            {/* Our Partners */}
            <OurPartners /> {/* We Operate in the Following States */}
            <OperateStates />
            <GetStarted contactUsRef={contactUsRef} /> <RecentJobs />
            <ContactUs /> {/*  */}
            <TechnicalPartners />
            <FeatureBlogs blogs={data} />
            <div
                className="trustpilot-widget mb-2"
                data-locale="en-US"
                data-template-id="56278e9abfbbba0bdcd568bc"
                data-businessunit-id="674fb3169ddbaeac9ead5f92"
                data-style-height="52px"
                data-style-width="100%"
            >
                <a
                    href="https://www.trustpilot.com/review/skiltrak.com.au"
                    target="_blank"
                    rel="noopener"
                >
                    Trustpilot
                </a>
            </div>
            <LatestUpdates />
        </div>
    )
}

Home3.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`)
    const data = await res.json()
    if (!data) {
        return <NoData text="No Data" />
    }
    return {
        props: {
            data,
        },
        revalidate: 3600,
    }
}

export default Home3
