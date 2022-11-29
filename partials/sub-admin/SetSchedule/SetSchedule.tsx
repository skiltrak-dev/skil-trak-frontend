import { Card, Typography, Button, LoadingAnimation } from '@components'
import { ScheduleCard } from './components'
import { useEffect, useState } from 'react'

import { useSetScheduleMutation, useSetScheduledListQuery } from '@queries'
export const SetScheduleContainer = () => {
    const [scheduleTime, setScheduleTime] = useState<any | null>([])
    const [availabilities, setAvailabilities] = useState<any | null>([
        {
            name: 'monday',
        },
        {
            name: 'tuesday',
        },
        {
            name: 'wednesday',
        },
        {
            name: 'thursday',
        },
        {
            name: 'friday',
        },
        {
            name: 'saturday',
        },
        {
            name: 'sunday',
        },
    ])

    const [setSchedule, setScheduleResult] = useSetScheduleMutation()
    const setScheduledList = useSetScheduledListQuery()

    useEffect(() => {
        if (setScheduledList.isSuccess) {
            const weekDays = setScheduledList?.data?.map((d: any) => d.name)
            const subAdminAvailability = availabilities?.map((d: any) =>
                weekDays.includes(d.name)
                    ? setScheduledList?.data?.find(
                          (day: any) => day.name === d.name
                      )
                    : { name: d.name }
            )
            setAvailabilities(subAdminAvailability)
        }
    }, [setScheduledList])

    return (
        <Card>
            <Typography variant={'small'}>Select Time {'&'} Days</Typography>
            <div className="my-2 flex flex-col gap-y-2">
                {setScheduledList.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    availabilities?.map((availability: any) => (
                        <ScheduleCard
                            key={availability.name}
                            setScheduleTime={setScheduleTime}
                            availability={availability}
                        />
                    ))
                )}
            </div>

            <Button
                text={'Submit'}
                onClick={() => setSchedule({ days: scheduleTime })}
                loading={setScheduleResult.isLoading}
                disabled={setScheduleResult.isLoading}
            />
        </Card>
    )
}
