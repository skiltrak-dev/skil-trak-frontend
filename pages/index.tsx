import { NextPage } from 'next'
import { useRef } from 'react'
// Components
// site components
import { Footer4 } from '@components/site'
import { GetStartedWithUs } from '@components/site/GetStartedWithUs'
import { JumboSection } from '@components/site/JumboSection'
import { OurTechnicalPartners } from '@components/site/OurTechnicalPartners'
import { RecentJobsFromOurPartner } from '@components/site/jobs/RecentJobsFromOurPartner'
import { KeyFeatures } from '@components/site/keyFeatures'
import { Navbar2 } from '@components/site/navbar'
import { StudentPlacementManagement } from '@components/site/studentPlacementManagement'
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

const Home3: NextPage = ({ data }: any) => {
    const contactUsRef = useRef(null)
    return (
        <div>
            <Navbar2 />
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

            {/*  Footer */}
            <Footer4 />
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            data: [],
        },
    }
}

export default Home3
