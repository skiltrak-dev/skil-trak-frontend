import { initialSchedule } from '@partials/industry/AvailableShifts/components'
import { useGetAvailableShiftsQuery } from '@queries'
import { useEffect, useState } from 'react'
import {
    FreeHoursCard,
    TradingHoursCard
} from './cards'

export const IndustryShiftingHours = () => {

    const industryAvailableHours = useGetAvailableShiftsQuery()

    const [workingHoursTime, setWorkingHoursTime] = useState<any | null>([
        ...initialSchedule.map((day) => ({ ...day })), // shallow copy
    ])

    useEffect(() => {
        if (
            !industryAvailableHours.isLoading &&
            !industryAvailableHours.isFetching &&
            industryAvailableHours?.data &&
            industryAvailableHours?.isSuccess
        ) {
            if (industryAvailableHours?.data?.length > 0) {
                const tempWorkingHours: any = [...workingHoursTime]

                industryAvailableHours?.data?.forEach((schedule: any) => {
                    const dayIndex = tempWorkingHours.findIndex(
                        (d: any) => d.day === schedule.day
                    )
                    tempWorkingHours[dayIndex].id = schedule.id
                    tempWorkingHours[dayIndex].openingTime =
                        schedule.openingTime
                    tempWorkingHours[dayIndex].closingTime =
                        schedule.closingTime
                    tempWorkingHours[dayIndex].dayOn = schedule.dayOn
                    tempWorkingHours[dayIndex].break = schedule.break
                    tempWorkingHours[dayIndex].breakStart = schedule.breakStart
                    tempWorkingHours[dayIndex].breakEnd = schedule.breakEnd
                    tempWorkingHours[dayIndex].shifts = schedule.shifts
                })

                setWorkingHoursTime(tempWorkingHours)
            }
        }
    }, [industryAvailableHours])

    return (
        <div className="flex flex-col gap-y-2.5">
            <TradingHoursCard
                workingHoursTime={workingHoursTime}
                industryAvailableHours={industryAvailableHours}
            />
            <FreeHoursCard workingHoursTime={workingHoursTime} />
        </div>
    )
}
