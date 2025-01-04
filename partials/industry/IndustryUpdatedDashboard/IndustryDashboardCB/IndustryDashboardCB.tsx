import { UpdatedCourseList } from '@partials/common'
import { Industry } from '@types'
import { getSectors } from '@utils'
import React from 'react'
import {
    AddIndustryType,
    ApplyForRPL,
    IndustryDashboardAppointments,
} from './components'

export const IndustryDashboardCB = ({ industry }: { industry: Industry }) => {
    const sectorsWithCourses = getSectors(industry?.courses)

    return (
        <div className="flex flex-col gap-y-5">
            <AddIndustryType />
            <div className="shadow-profiles rounded-md border border-[#6B7280] bg-white p-2.5">
                <UpdatedCourseList sectorsWithCourses={sectorsWithCourses} />
            </div>
            <IndustryDashboardAppointments />
            <ApplyForRPL short />
        </div>
    )
}
