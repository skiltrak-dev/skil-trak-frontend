import { ScheduleCalendar } from '@partials/student/Schedule'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StudentApi } from '@queries'
import { Course } from '@types'
import { LoadingAnimation, NoData } from '@components'
import { currentMonthDates } from '@utils'

export const ScheduleTimetable = ({
    startDate,
    scheduleId,
    scheduleCourse,
}: {
    startDate?: Date
    scheduleId: number
    scheduleCourse: Course
}) => {
    const [startScheduleDate, setStartScheduleDate] = useState<Date | null>(
        null
    )

    const monthDays = currentMonthDates(startScheduleDate)

    const [selectedDates, setSelectedDates] = useState<{
        start: Date | null
        end: Date | null
    }>({
        start: monthDays?.[0]?.toDate(),
        end: monthDays?.[monthDays?.length - 1]?.toDate(),
    })
    const [mount, setMount] = useState(false)

    useEffect(() => {
        if (!mount) {
            setMount(true)
        }
    }, [])

    const timeSlots = StudentApi.Schedule.scheduleTimeSlots(
        {
            scheduleId,
            search: `startDate:${moment(selectedDates?.start).format(
                'YYYY-MM-DD'
            )},endDate:${moment(selectedDates?.end).format('YYYY-MM-DD')}`,
        },
        {
            skip: !scheduleId,
            refetchOnMountOrArgChange: 150,
        }
    )

    const lowestIdData = useMemo(
        () =>
            timeSlots?.data?.reduce(
                (min: any, current: any) =>
                    current?.id < min?.id ? current : min,
                timeSlots?.data?.[0]
            ),
        [timeSlots?.data]
    )

    const onSelectedDate = useCallback((dates: any) => {
        setSelectedDates(dates)
    }, [])

    const onNavigateDate = (e: Date) => {
        setStartScheduleDate(e)
    }

    const events = timeSlots?.data?.map((c: any) => {
        const [year, month, day] = moment(c?.date)
            .format('YYYY-MM-DD')
            .split('-')
            .map(Number)
        const [hour, minute] = c?.openingTime.split(':').map(Number)
        const [closingHour, closingMinute] = c?.closingTime
            .split(':')
            .map(Number)

        return {
            start: new Date(year, month - 1, day, hour, minute),
            end: new Date(year, month - 1, day, closingHour, closingMinute),
            course: scheduleCourse,
            schedule: c,
        }
    })

    return (
        <div>
            {timeSlots.isError ? (
                <NoData text="There is some technical issue in slots!" />
            ) : null}

            <div className="relative">
                {timeSlots.isLoading || timeSlots.isFetching ? (
                    <div className="absolute w-full h-full flex items-center justify-center bg-[#ffffff95] z-50">
                        <LoadingAnimation />
                    </div>
                ) : null}
                {mount && (
                    <ScheduleCalendar
                        events={events}
                        onSelectedDate={onSelectedDate}
                        onNavigateDate={onNavigateDate}
                        startData={
                            startScheduleDate ||
                            (timeSlots?.isSuccess && lowestIdData?.date) ||
                            (timeSlots?.isSuccess && startDate)
                        }
                    />
                )}
            </div>
        </div>
    )
}
