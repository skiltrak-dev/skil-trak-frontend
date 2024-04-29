import { Typography } from '@components'
import { DashedCountCard } from '@partials/management/components'
import React from 'react'

export const KpiTypeCard = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5">
            <div className="flex justify-center mb-4">
                <Typography variant={'label'} center bold>
                    Workplace request
                </Typography>
            </div>
            <div className="flex flex-col gap-y-2.5">
                <DashedCountCard
                    title="Result Date"
                    subtitle={'Nov 20, 2022  -  Nov 27, 2022'}
                    // center
                    align="left"
                />
                <DashedCountCard
                    title="First Time Student"
                    subtitle={'124 Student'}
                    // center
                    align="left"
                />
                <DashedCountCard
                    title="Student Duplication"
                    subtitle={'20 Student'}
                    // center
                    align="left"
                />
            </div>
            <div className={`justify-center flex mt-5`}>
                <button
                    // onClick={onChangeTeamLead}
                    className="text-blue-500 text-sm underline"
                >
                    Add Feedback
                </button>
            </div>
        </div>
    )
}
