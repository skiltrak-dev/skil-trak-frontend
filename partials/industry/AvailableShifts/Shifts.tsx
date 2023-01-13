import React, { useState } from 'react'
import { WorkingHourCard } from './components'
import { AddShiftContext } from './contextbar'

//components
import { Button, Card } from '@components'
import {
    useGetAvailableShiftsQuery,
    useAddWorkingHoursMutation,
} from '@queries'
import moment from 'moment'

const initialSchedule = [
    {
        day: 'monday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
    {
        day: 'tuesday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
    {
        day: 'wednesday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
    {
        day: 'thursday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
    {
        day: 'friday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
    {
        day: 'saturday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
    {
        day: 'sunday',
        openingTime: '09:00',
        closingTime: '17:00',
        break: false,
        breakStart: null,
        breakEnd: null,
        dayOff: false,
    },
]

export const Shifts = () => {
    const [scheduleTime, setScheduleTime] = useState<any | null>(
        initialSchedule
    )
    console.log('scheduleTime', scheduleTime)
    const [availabilities, setAvailabilities] = useState<any | null>(
        initialSchedule
    )

    const workingHours = useGetAvailableShiftsQuery()
    const [addWorkingHours, addWorkingHoursResult] =
        useAddWorkingHoursMutation()

    const onScheduleChange = (schedule: any) => {
        const tempSchedule: any = [...scheduleTime]
        const dayIndex = tempSchedule.findIndex(
            (d: any) => d.day === schedule.day
        )

        tempSchedule[dayIndex].openingTime = moment(schedule.openingTime, [
            'h:mm A',
        ]).format('HH:mm')
        tempSchedule[dayIndex].closingTime = moment(schedule.closingTime, [
            'h:mm A',
        ]).format('HH:mm')
        tempSchedule[dayIndex].dayOff = schedule.dayOff
        tempSchedule[dayIndex].break = schedule.break
        tempSchedule[dayIndex].breakStart = schedule.breakStart
        tempSchedule[dayIndex].breakEnd = schedule.breakEnd

        setScheduleTime(tempSchedule)
    }

    const onAddWorkingHours = () => {
        addWorkingHours({ days: scheduleTime?.filter((s: any) => s.dayOff) })
    }

    return (
        <Card>
            <div className="flex flex-col gap-y-2 mb-3">
                {initialSchedule.map((schedule) => (
                    <WorkingHourCard
                        availability={schedule}
                        onScheduleChange={onScheduleChange}
                    />
                ))}
            </div>
            <Button
                text={'Submit'}
                onClick={onAddWorkingHours}
                loading={addWorkingHoursResult.isLoading}
                disabled={addWorkingHoursResult.isLoading}
            />
        </Card>
    )
}
