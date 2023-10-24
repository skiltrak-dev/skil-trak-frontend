import { ReactElement, useEffect, useState } from 'react'

import {
    Button,
    CalendarEvent,
    Card,
    LoadingAnimation,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { StudentLayout } from '@layouts'
import { StudentApi, useGetStudentCoursesQuery } from '@queries'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ScheduleCard } from '@partials/student/Schedule'
import moment from 'moment'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { useNotification } from '@hooks'
import { AddScheduleContainer } from '@partials/common'

type Props = {}

const Schedule: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const courses = useGetStudentCoursesQuery()
    const course = courses?.data?.find(
        (c: Course) => c.id === Number(router?.query?.course)
    )
    return <AddScheduleContainer course={course} />
}
Schedule.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Schedule' }}>{page}</StudentLayout>
    )
}

export default Schedule
