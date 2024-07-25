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
        <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3.5 h-[490px] overflow-hidden">
                <div className="h-full">
                    <IndustryShiftingHours />
                </div>
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-5 gap-x-3.5">
                    <div className="lg:col-span-3 h-[490px] ">
                        <IndustryDashboardRD />
                    </div>
                    <div className="lg:col-span-2 h-full ">
                        <IndustryServices />
                    </div>
                </div>
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
