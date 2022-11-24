import { Card, Typography, Button } from '@components'
import { ScheduleCard } from './components'
import { useState } from 'react'

import { useSetScheduleMutation } from '@queries'
export const SetScheduleContainer = () => {
    const [scheduleTime, setScheduleTime] = useState<any[] | null>([])
    const [setSchedule, setScheduleResult] = useSetScheduleMutation()

    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]
    return (
        <Card>
            <Typography variant={'small'}>Select Time {'&'} Days</Typography>
            <div className="my-2 flex flex-col gap-y-2">
                {days.map((day, i) => (
                    <ScheduleCard
                        key={day}
                        setScheduleTime={setScheduleTime}
                        day={day}
                    />
                ))}
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
