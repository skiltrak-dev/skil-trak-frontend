import { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
// Components
import { Button, Typography } from '@components'
// site components
import { ContactUs } from '@components/site/ContactUs'
import { Footer3 } from '@components/site/Footer3'
import { Navbar2 } from '@components/site/navbar'
import { OurPartners } from '@components/site/OurPartners'
import { WeOperate } from '@components/site/WeOperate'
import { GetStartedWithUs } from '@components/site/GetStartedWithUs'
import { StudentPlacementManagement } from '@components/site/studentPlacementManagement'
import { OurPackages } from '@components/site/ourPackages'
import { KeyFeatures } from '@components/site/keyFeatures'
import { JumboSection } from '@components/site/JumboSection'

const Home3: NextPage = () => {
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
            {/* Get Started With Us */}
            <GetStartedWithUs contactUsRef={contactUsRef} />
            {/* Lets Talk */}
            <ContactUs contactUsRef={contactUsRef} />
            {/*  Footer */}
            <Footer3 />
        </div>
    )
}
export default Home3
