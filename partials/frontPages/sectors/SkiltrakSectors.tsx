import React from 'react'
import { SharedHeroSection } from '../components'
import { ContentSection } from './ContentSection'
import {
    alliedHealth,
    animalCare,
    beauty,
    business,
    communityServices,
    construction,
    horticulture,
    hospitality,
    individualSupport,
    trafficManagement,
} from './sectorsData'
import { ContentSectionSeparator } from './ContentSectionSeparator'

export const SkiltrakSectors = () => {
    return (
        <div>
            <SharedHeroSection
                title={'Sectors and Courses'}
                description={
                    'At SkilTrak, we help students find eligible industries that align with their career goals, ensuring that your placement is not just a requirement but a launchpad. Through structured documentation, industry connections, and professional mentorship, we support you from your first application to the completion of your placement. With SkilTrak, your journey begins not just with training but with career direction and confidence.'
                }
            />
            <ContentSection
                title="Individual support"
                content={individualSupport}
                iconUrl={'individual-support-icon.png'}
                imageUrl={'individual-support.png'}
                variant="yellow"
                direction="right"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Community Services"
                content={communityServices}
                iconUrl={'community-services-icon.png'}
                imageUrl={'community-services.png'}
                variant="red"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Business"
                content={business}
                iconUrl={'business-icon.png'}
                imageUrl={'business.png'}
                variant="blue"
                direction="right"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Allied Health Assistance"
                content={alliedHealth}
                iconUrl={'allied-health-icon.png'}
                imageUrl={'allied-health.png'}
                variant="yellow"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Beauty"
                content={beauty}
                iconUrl={'beauty-icon.png'}
                imageUrl={'beauty.png'}
                variant="red"
                direction="right"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Animal Care"
                content={animalCare}
                iconUrl={'animal-care-icon.png'}
                imageUrl={'animal-care.png'}
                variant="blue"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Construction"
                content={construction}
                iconUrl={'construction-icon.png'}
                imageUrl={'construction.png'}
                variant="yellow"
                direction="right"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Hospitality"
                content={hospitality}
                iconUrl={'hospitality-icon.png'}
                imageUrl={'hospitality.png'}
                variant="red"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Traffic Management"
                content={trafficManagement}
                iconUrl={'traffic-icon.png'}
                imageUrl={'traffic.png'}
                variant="blue"
                direction="right"
            />
            <ContentSectionSeparator />
            <ContentSection
                title="Horticulture"
                content={horticulture}
                iconUrl={'horticulture-icon.png'}
                imageUrl={'horticulture.png'}
                variant="yellow"
            />
        </div>
    )
}
