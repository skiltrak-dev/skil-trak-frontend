import { ReactElement, useEffect, useMemo, useState } from 'react'

import { StudentLayout } from '@layouts'
import { Course, Industry, NextPageWithLayout } from '@types'
import {
    BigCalendar,
    Button,
    CalendarEvent,
    Card,
    EmptyData,
    LoadingAnimation,
    Select,
    ShowErrorNotifications,
    TechnicalError,
    Typography,
} from '@components'
import { useRouter } from 'next/router'
import {
    StudentApi,
    useGetStudentCoursesQuery,
    useGetWorkplaceIndustriesQuery,
} from '@queries'
import { ScheduleCalendar } from '@partials/student/Schedule'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import moment from 'moment'

type Props = {}

const Schedule: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedIndustry, setSelectedIndustry] = useState<number | null>(
        null
    )

    const events: CalendarEvent[] = [
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

    const schedules = StudentApi.Schedule.useGetStudentSchedule(
        {
            courseId: Number(selectedCourse),
            workplace: Number(selectedIndustry),
        },
        {
            skip: !selectedCourse || !selectedIndustry,
        }
    )
    const courses = useGetStudentCoursesQuery()
    const workplace = useGetWorkplaceIndustriesQuery()

    const industriesOptions = useMemo(
        () =>
            workplace?.data
                ?.map((w: any) =>
                    w?.industries
                        ?.filter((i: any) => i?.applied)
                        ?.map((ind: any) => ind?.industry)
                )
                ?.flat()
                ?.map((ind: Industry) => ({
                    label: ind?.user?.name,
                    value: ind?.id,
                    item: ind,
                })),
        [workplace]
    )

    useEffect(() => {
        if (router.query?.course) {
            setSelectedCourse(Number(router.query.course))
        } else if (courses.isSuccess) {
            setSelectedCourse(courses?.data?.[0]?.id)
        }

        if (router.query?.workplace) {
            setSelectedIndustry(Number(router.query.workplace))
        } else if (industriesOptions && industriesOptions?.length > 0) {
            setSelectedIndustry(industriesOptions?.[0]?.value)
        }
    }, [courses, industriesOptions, router])

    const courseOptions = courses.data?.map((course: Course) => ({
        label: course?.title,
        value: course?.id,
        item: course,
    }))

    console.log({ industriesOptions })

    return (
        <>
            <ShowErrorNotifications result={schedules} />
            <div className="flex justify-between items-center">
                <div className="flex gap-x-2">
                    <div className="w-72">
                        <Select
                            label={'Courses'}
                            name={'courses'}
                            defaultValue={courseOptions}
                            value={courseOptions?.find(
                                (c: any) => c?.value === selectedCourse
                            )}
                            options={courseOptions}
                            loading={courses.isLoading}
                            onlyValue
                            disabled={courses.isLoading}
                            validationIcons
                            components={{
                                Option: CourseSelectOption,
                            }}
                            formatOptionLabel={formatOptionLabel}
                            onChange={(e: any) => {
                                setSelectedCourse(e)
                            }}
                        />
                    </div>
                    <div className="w-72">
                        <Select
                            label={'Workplaces'}
                            name={'workplace'}
                            defaultValue={industriesOptions}
                            value={industriesOptions?.find(
                                (c: any) => c?.value === selectedIndustry
                            )}
                            options={industriesOptions}
                            loading={workplace.isLoading}
                            onlyValue
                            disabled={workplace.isLoading}
                            validationIcons
                            onChange={(e: any) => {
                                setSelectedIndustry(e)
                            }}
                        />
                    </div>
                </div>
                <Button
                    text={
                        schedules?.data && schedules?.data?.schedule
                            ? 'Edit Schedule'
                            : 'Add Schedule'
                    }
                    variant={'info'}
                    onClick={() => {
                        router.push({
                            pathname: 'schedule/add-schedule',
                            query: {
                                course: selectedCourse,
                                workplace: selectedIndustry,
                            },
                        })
                    }}
                />
            </div>
            <div className="mt-3">
                <Card>
                    {schedules.isError && <TechnicalError />}
                    {schedules?.isLoading || schedules.isFetching ? (
                        <LoadingAnimation />
                    ) : schedules?.data && schedules?.data?.schedule ? (
                        <>
                            <div className="flex gap-x-4 items-center">
                                <div>
                                    <Typography variant="subtitle">
                                        Start Date
                                    </Typography>
                                    <Typography variant="label">
                                        {moment(
                                            schedules?.data?.schedule?.startDate
                                        ).format('MMMM DD, YYYY')}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="subtitle">
                                        End Date
                                    </Typography>
                                    <Typography variant="label">
                                        {moment(
                                            schedules?.data?.schedule?.endDate
                                        ).format('MMMM DD, YYYY')}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="subtitle">
                                        Total Hours
                                    </Typography>
                                    <Typography variant="label">
                                        {schedules?.data?.schedule?.hours} :
                                        Hours
                                    </Typography>
                                </div>
                            </div>

                            <ScheduleCalendar
                                events={[
                                    ...schedules?.data?.schedule?.timeTables?.map(
                                        (c: any) => {
                                            const [year, month, day] = moment(
                                                c?.date
                                            )
                                                .format('YYYY-MM-DD')
                                                .split('-')
                                                .map(Number)
                                            const [hour, minute] =
                                                c?.openingTime
                                                    .split(':')
                                                    .map(Number)
                                            const [closingHour, closingMinute] =
                                                c?.closingTime
                                                    .split(':')
                                                    .map(Number)
                                            return {
                                                start: new Date(
                                                    year,
                                                    month - 1,
                                                    day,
                                                    hour,
                                                    minute
                                                ),
                                                end: new Date(
                                                    year,
                                                    month - 1,
                                                    day,
                                                    closingHour,
                                                    closingMinute
                                                ),
                                                course: schedules?.data?.course,
                                                schedule: c,
                                            }
                                        }
                                    ),
                                ]}
                            />
                        </>
                    ) : (
                        <EmptyData />
                    )}
                </Card>
            </div>
        </>
    )
}
Schedule.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Schedule' }}>{page}</StudentLayout>
    )
}

export default Schedule
