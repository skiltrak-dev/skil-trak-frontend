import { Button } from '@components'
import React, { useState } from 'react'
import { Under3WeeksNeedWorkplace } from './Under3WeeksNeedWorkplace'
import { Over3WeeksNeedWorkplace } from './Over3WeeksNeedWorkplace'
import { Over2MonthsNeedWorkplace } from './Over2MonthsNeedWorkplace'

export enum NeedWorkplace {
    Under3Weeks = 'UNDER_3_WEEKS',
    Over3Weeks = 'BETWEEN_3WEEKS_2MONTHS',
    Over2Months = 'BEYOND_2_MONTHS',
}

export const NeedAdminWorkplaces = ({ counts }: { counts: any }) => {
    const [weeksData, setWeeksData] = useState(NeedWorkplace.Under3Weeks)

    const data = [
        {
            text: `Under 3 Weeks (${counts?.UNDER_3_WEEKS})`,
            value: NeedWorkplace.Under3Weeks,
            component: Under3WeeksNeedWorkplace,
        },
        {
            text: `Over 3 Weeks (${counts?.BETWEEN_3WEEKS_2MONTHS})`,
            value: NeedWorkplace.Over3Weeks,
            component: Over3WeeksNeedWorkplace,
        },
        {
            text: `Over 2 Months (${counts?.BEYOND_2_MONTHS})`,
            value: NeedWorkplace.Over2Months,
            component: Over2MonthsNeedWorkplace,
        },
    ]

    const Component = data?.find((week) => week?.value === weeksData)?.component

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
                {data?.map((d) => (
                    <div className="w-48 h-10">
                        <Button
                            text={d?.text}
                            fullWidth
                            fullHeight
                            variant="info"
                            outline={weeksData !== d?.value}
                            onClick={() => {
                                setWeeksData(d?.value)
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>{Component && <Component />}</div>
        </div>
    )
}
