import { Button } from '@components'
import React, { useState } from 'react'
import { SubadminOver2MonthsWP } from './SubadminOver2MonthsWP'
import { SubadminOver3WeeksWP } from './SubadminOver3WeeksWP'
import { SubadminUnder3WeeksWP } from './SubadminUnder3WeeksWP'
import { NeedWorkplaceEnum } from '@partials/admin'

export const NeedSubAdminWorkplaces = ({ counts }: { counts: any }) => {
    const [weeksData, setWeeksData] = useState(NeedWorkplaceEnum.Under3Weeks)

    const data = [
        {
            text: `Under 3 Weeks (${counts?.UNDER_3_WEEKS || 0})`,
            value: NeedWorkplaceEnum.Under3Weeks,
            component: SubadminUnder3WeeksWP,
        },
        {
            text: `Over 3 Weeks (${counts?.BETWEEN_3WEEKS_2MONTHS || 0})`,
            value: NeedWorkplaceEnum.Over3Weeks,
            component: SubadminOver3WeeksWP,
        },
        {
            text: `Over 2 Months (${counts?.BEYOND_2_MONTHS || 0})`,
            value: NeedWorkplaceEnum.Over2Months,
            component: SubadminOver2MonthsWP,
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
