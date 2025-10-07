import React from 'react'
import { HeroSectionIndServices } from './HeroSectionIndServices'
import { IndustryServicesAboutUsSection } from './IndustryServicesAboutUsSection'
import { SkiltrakACompleteSolution } from './SkiltrakACompleteSolution'
import { IndustryServicesEmployeeScheduling } from './IndustryServicesEmployeeScheduling'
import { IndustryServicesWorkFlowSection } from './IndustryServicesWorkFlowSection'
import { IndustryServicesMobileApp } from './IndustryServicesMobileApp'
import { IndustryServicesTestimonial } from './IndustryServicesTestimonial'
import { IndustryServicesFaqsSection } from './faqs'
import { IndustryServicesSidebarScroll } from './industryServicesSectorAndCourses'
import { InfoCardsGrid } from './infoCards'
import { ContactSection } from '@partials/frontPages/components'

export const IndustryServices = () => {
    return (
        <div>
            <HeroSectionIndServices />
            <IndustryServicesAboutUsSection />
            <InfoCardsGrid />
            <SkiltrakACompleteSolution />
            <IndustryServicesEmployeeScheduling />
            <IndustryServicesWorkFlowSection />
            <IndustryServicesSidebarScroll />
            <IndustryServicesMobileApp />
            <IndustryServicesTestimonial />
            <IndustryServicesFaqsSection />
            <ContactSection variant="red" />
        </div>
    )
}
