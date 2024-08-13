import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { AddScheduleContainer } from '@partials/common'
import {
    useGetStudentCoursesQuery,
    useGetWorkplaceIndustriesQuery,
} from '@queries'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

type Props = {}

const Schedule: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const courses = useGetStudentCoursesQuery()
    const workplaces = useGetWorkplaceIndustriesQuery()

    const course = courses?.data?.find(
        (c: Course) => c.id === Number(router?.query?.course)
    )
    const workplace = workplaces?.data
        ?.map((w: any) =>
            w?.industries
                ?.filter((i: any) => i?.applied)
                ?.map((ind: any) => ind?.industry)
        )
        ?.flat()
        ?.find((w: any) => w?.id === Number(router?.query?.workplace))
    return <AddScheduleContainer course={course} workplace={workplace} />
}
Schedule.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Schedule' }}>{page}</StudentLayout>
    )
}

export default Schedule
