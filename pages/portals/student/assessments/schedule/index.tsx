import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { BigCalendar, Button } from '@components'
import { useRouter } from 'next/router'

type Props = {}

const Schedule: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const events = [
        {
            allDay: false,
            start: new Date('2022-12-26T02:00:15.221Z'),
            end: new Date('2022-12-27T02:00:15.221Z'),
            title: 'Appointment',
            priority: 'high',
            subTitle: 'Go For It',
        },
        {
            allDay: false,
            end: new Date('2022-11-29T05:00:00.000Z'),
            start: new Date('2022-11-29T07:00:00.000Z'),
            title: 'test larger',
            priority: 'low',
        },
        {
            allDay: false,
            end: new Date('2022-11-29T18:00:00.000Z'),
            start: new Date('2022-11-29T10:00:00.000Z'),
            title: 'test larger',
            priority: 'medium',
        },
        {
            allDay: true,
            end: new Date('2022-11-29T19:00:00.000Z'),
            start: new Date('2022-11-28T19:00:00.000Z'),
            title: 'test all day',
            priority: 'high',
        },
        {
            allDay: true,
            end: new Date('2022-11-30T19:00:00.000Z'),
            start: new Date('2022-11-28T19:00:00.000Z'),
            title: 'test 2 days',
            priority: 'high',
        },
        {
            allDay: false,
            end: new Date('2022-12-02T10:48:15.222Z'),
            start: new Date('2022-11-29T10:48:15.222Z'),
            title: 'test multi-day',
            priority: 'high',
        },
    ]
    return (
        <>
            <Button
                text={'Add Schedule'}
                variant={'info'}
                onClick={() => {
                    router.push('add-schedule')
                }}
            />
            <BigCalendar events={events} />
        </>
    )
}
Schedule.getLayout = (page: ReactElement) => {
    return <StudentLayout pageTitle={{title:"Schedule"}}>{page}</StudentLayout>
}

export default Schedule
