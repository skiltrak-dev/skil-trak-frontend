import React from 'react'
import { ImportantDocuments } from '@partials/common'
import { Supervisor } from '@partials/common'
import { useIndustryProfileQuery } from '@queries'
import { IndustryLocations } from '@partials/common/IndustryProfileDetail/components'
import {
    IndustryDashboardRD,
    IndustryDashboardStudents,
    IndustryServices,
    IndustryShiftingHours,
} from './components'

export const IndustryUpdatedDashboard = () => {
    const { data } = useIndustryProfileQuery()
    return (
        <div>
            <IndustryShiftingHours industry={data} />
            <IndustryDashboardRD />
            <div className="h-96">
                <IndustryServices />
            </div>
            <IndustryDashboardStudents />
            <ImportantDocuments
                coureseRequirementsLink={
                    '/portals/industry/course-requirements'
                }
            />
            <Supervisor industry={data} />
            <div>
                <IndustryLocations industry={data} />
            </div>
        </div>
    )
}
