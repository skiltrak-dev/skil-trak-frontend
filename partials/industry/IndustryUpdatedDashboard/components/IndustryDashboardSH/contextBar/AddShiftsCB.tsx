import moment from 'moment'
import { AdminApi } from '@queries'
import { useEffect, useState } from 'react'
import { AddWorkingHoursCard } from '../cards'
import { initialSchedule } from '@partials/industry/AvailableShifts/components'
import { Button, ShowErrorNotifications } from '@components'

export const AddShiftsCB = ({
    industryUserId,
    industryAvailableHours,
}: {
    industryUserId: number
    industryAvailableHours: any
}) => {
    const [workingHoursTime, setWorkingHoursTime] = useState<any | null>(
        initialSchedule
    )

    const [addHours, addHoursResult] = AdminApi.Industries.useAddIndustryHours()

    useEffect(() => {
        if (industryAvailableHours) {
            if (industryAvailableHours?.length > 0) {
                const tempWorkingHours: any = [...workingHoursTime]

                industryAvailableHours?.forEach((schedule: any) => {
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
                // setCourseWorkingHours(tempWorkingHours)
            }
            // setIsUpdated(true)
        }
    }, [industryAvailableHours])

    const onScheduleChange = (schedule: any) => {
        const tempWorkingHours: any = [...workingHoursTime]
        const dayIndex = tempWorkingHours.findIndex(
            (d: any) => d.day === schedule.day
        )

        tempWorkingHours[dayIndex].openingTime = moment(schedule.openingTime, [
            'h:mm A',
        ]).format('HH:mm')
        tempWorkingHours[dayIndex].closingTime = moment(schedule.closingTime, [
            'h:mm A',
        ]).format('HH:mm')
        tempWorkingHours[dayIndex].dayOn = schedule.dayOn
        tempWorkingHours[dayIndex].break = schedule.break
        tempWorkingHours[dayIndex].breakStart = schedule.breakStart
        tempWorkingHours[dayIndex].breakEnd = schedule.breakEnd

        setWorkingHoursTime(tempWorkingHours)
    }

    const onAddWorkingHours = () => {
        addHours({
            body: {
                days: workingHoursTime?.filter((s: any) => s.dayOn),
            },
            id: industryUserId,
        })
    }
    return (
        <>
            <ShowErrorNotifications result={addHoursResult} />
            <div className="flex flex-col gap-y-4">
                {workingHoursTime?.map((time: any) => (
                    <AddWorkingHoursCard
                        key={time?.day}
                        availability={time}
                        onScheduleChange={onScheduleChange}
                    />
                ))}
                <Button
                    text={'Submit'}
                    onClick={onAddWorkingHours}
                    loading={addHoursResult.isLoading}
                    disabled={addHoursResult.isLoading}
                />
            </div>
        </>
    )
}
