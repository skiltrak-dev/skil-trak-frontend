import React from 'react'
import { RtoAboutUsSection } from './RtoAboutUsSection'
import { RtoAccFeatures } from './RtoAccFeatures'
import { RtoApiFeature } from './RtoApiFeature'
import { RtoFaqsSection } from './rtoFaqs'
import { RtoHeroSection } from './RtoHeroSection'
import { RtoFeaturesCard } from './RtoFeaturesCard'
import { EmpoweringRtoSection } from './EmpoweringRtoSection'
import { PricingCard } from './pricing/PricingCard'
import { PricingCards } from './pricing'
import { SidebarScroll } from './sectorAndCourses'
import { TestimonialSectionRtoServices } from './testimonial'
import { ContactSection } from '@partials/frontPages/components'

export const RtoServices = () => {
    return (
        <div>
            <RtoHeroSection />
            <RtoAboutUsSection />
            <RtoFeaturesCard />
            <RtoAccFeatures />
            <EmpoweringRtoSection />
            <RtoApiFeature />
            <PricingCards />
            <SidebarScroll />
            <TestimonialSectionRtoServices />
            <RtoFaqsSection />
            <ContactSection variant="blue" />
        </div>
    )
}
