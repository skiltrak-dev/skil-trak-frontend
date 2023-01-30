import React, { useState, useEffect } from 'react'
import { WorkingHourCard, initialSchedule } from './components'
import { AddShiftContext } from './contextbar'

//components
import {
    Button,
    Card,
    LoadingAnimation,
    ShowErrorNotifications,
} from '@components'
import {
    useGetAvailableShiftsQuery,
    useAddWorkingHoursMutation,
} from '@queries'
import moment from 'moment'
import { useNotification } from '@hooks'

export const Shifts = () => {
    const [courseWorkingHours, setCourseWorkingHours] = useState<any | null>(
        initialSchedule
    )
    const [workingHoursTime, setWorkingHoursTime] = useState<any | null>(
        initialSchedule
    )
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    // hooks
    const { notification } = useNotification()

    const workingHours = useGetAvailableShiftsQuery()
    const [addWorkingHours, addWorkingHoursResult] =
        useAddWorkingHoursMutation()

    useEffect(() => {
        if (addWorkingHoursResult.isSuccess) {
            notification.success({
                title: 'Shifts Added',
                description: 'Shifts Added Successfully',
            })
        }
    }, [addWorkingHoursResult])

    useEffect(() => {
        if (workingHours.isSuccess) {
            if (workingHours.data?.length) {
                const tempWorkingHours: any = [...workingHoursTime]

                workingHours.data.forEach((schedule: any) => {
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
                setCourseWorkingHours(tempWorkingHours)
            }
            setIsUpdated(true)
        }
    }, [workingHours])

    const onScheduleChange = (schedule: any) => {
        const tempWorkingHours: any = [...courseWorkingHours]
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
        addWorkingHours({
            days: courseWorkingHours?.filter((s: any) => s.dayOn),
        })
    }

    return (
        <Card>
            <ShowErrorNotifications result={addWorkingHoursResult} />
            <div className="flex flex-col gap-y-2 mb-3">
                {workingHours.isLoading ? (
                    <LoadingAnimation />
                ) : workingHours?.isSuccess && isUpdated ? (
                    workingHoursTime.map((schedule: any) => (
                        <WorkingHourCard
                            availability={schedule}
                            onScheduleChange={onScheduleChange}
                        />
                    ))
                ) : null}
            </div>
            {!workingHours.isLoading && !workingHours?.isSuccess && (
                <div className="flex flex-col gap-y-2">
                    {workingHoursTime.map((schedule: any) => (
                        <WorkingHourCard
                            availability={schedule}
                            onScheduleChange={onScheduleChange}
                        />
                    ))}
                </div>
            )}
            <Button
                text={'Submit'}
                onClick={onAddWorkingHours}
                loading={addWorkingHoursResult.isLoading}
                disabled={addWorkingHoursResult.isLoading}
            />
        </Card>
    )
}
