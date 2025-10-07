import React from 'react'
import { SharedHeroSection } from '../components'
import { OurMissionAndVision } from './OurMissionAndVision'
import { WhatSetsUsApart } from './WhatSetsUsApart'
import { MeetOurTeam } from './MeetOurTeam'
import { PodCastSection } from './PodCastSection'

export const AboutUsV3 = () => {
    return (
        <div>
            <SharedHeroSection
                title={'Empowering Education Through Smart Placement Solutions'}
                description={
                    'At SkilTrak, we bridge the gap between students, Registered Training Organisations (RTOs), and industry partners through innovative placement management tools. Built on over 8 years of industry experience, our platform ensures seamless coordination, compliance, and real-world career readiness for learners across Australia.'
                }
                // button
            />
            <OurMissionAndVision />
            <WhatSetsUsApart />
            <MeetOurTeam />
            <PodCastSection />
        </div>
    )
}
