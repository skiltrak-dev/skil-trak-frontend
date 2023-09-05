import { NextPage } from 'next'
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

const Home3: NextPage = () => {
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
            {/* Get Started With Us */}
            <GetStartedWithUs />
            {/* Lets Talk */}
            <ContactUs />
            {/*  Footer */}
            <Footer3 />
        </div>
    )
}
export default Home3
