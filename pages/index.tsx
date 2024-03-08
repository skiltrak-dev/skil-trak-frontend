import { ReactElement, useRef } from 'react'
// Components
// site components
import { JumboSection } from '@components/site/JumboSection'
import { KeyFeatures } from '@components/site/keyFeatures'
import { StudentPlacementManagement } from '@components/site/studentPlacementManagement'
import { SiteLayout } from '@layouts'
import {
    ContactUs,
    GetStarted,
    LatestUpdates,
    OperateStates,
    OurPackages,
    OurPartners,
    RecentJobs,
    TechnicalPartners,
} from '@partials/frontPages'
import { NextPageWithLayout } from '@types'

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
