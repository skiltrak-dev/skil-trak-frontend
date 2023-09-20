import { NextPage } from 'next'
import { useRef } from 'react'
// Components
// site components
import { ContactUs } from '@components/site/ContactUs'
import { Footer3 } from '@components/site/Footer3'
import { GetStartedWithUs } from '@components/site/GetStartedWithUs'
import { JumboSection } from '@components/site/JumboSection'
import { OurPartners } from '@components/site/OurPartners'
import { WeOperate } from '@components/site/WeOperate'
import { KeyFeatures } from '@components/site/keyFeatures'
import { Navbar2 } from '@components/site/navbar'
import { OurPackages } from '@components/site/ourPackages'
import { StudentPlacementManagement } from '@components/site/studentPlacementManagement'
import { RecentJobCard } from '@components/site/jobs/RecentJobCard'
import { RecentJobsFromOurParnter } from '@components/site/jobs/RecentJobsFromOurParnter'

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

            {/* Our packages */}
            <OurPackages />
            {/* Our Partners */}
            <OurPartners />
            {/* We Operate in the Following States */}
            <WeOperate />
            {/* Recent Jobs From Our Partners */}
            <RecentJobsFromOurParnter />
            {/* Get Started With Us */}
            <GetStartedWithUs contactUsRef={contactUsRef} />
            {/* Lets Talk */}
            <ContactUs contactUsRef={contactUsRef} />
            {/*  Footer */}
            <Footer3 />
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
