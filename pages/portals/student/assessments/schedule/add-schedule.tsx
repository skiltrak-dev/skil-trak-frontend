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

type Props = {}

const Schedule: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
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

    const courses = useGetStudentCoursesQuery()

    const courseOptions = courses.data?.map((course: Course) => ({
        label: course?.title,
        value: course?.id,
        item: course,
    }))

    useEffect(() => {
        if (courses.isSuccess) {
            setSelectedCourse(courses?.data?.[0]?.id)
        }
    }, [courses])

    const initialSchedule = [
        {
            id: -1,
            name: 'monday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
        {
            id: -2,
            name: 'tuesday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
        {
            id: -3,
            name: 'wednesday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
        {
            id: -4,
            name: 'thursday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
        {
            id: -5,
            name: 'friday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
        {
            id: -1,
            name: 'saturday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
        {
            id: -1,
            name: 'sunday',
            openingTime: '09:00:00',
            closingTime: '17:00:00',
            isActive: false,
        },
    ]

    const [startDate, setStartDate] = useState<string | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

    const [scheduleTime, setScheduleTime] = useState<any | null>(
        initialSchedule
    )
    const [availabilities, setAvailabilities] = useState<any | null>(
        initialSchedule
    )
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    const [createSchedule, createScheduleResult] =
        StudentApi.Schedule.useCreateStudentSchedule()
    const schedules = StudentApi.Schedule.useGetStudentSchedule(
        Number(selectedCourse),
        {
            skip: !selectedCourse,
        }
    )

    const findUniqueDays = () => {
        const uniqueDays = {}
        const result = []

        if (schedules?.data) {
            for (const item of schedules?.data?.calendar) {
                if (!uniqueDays[item.day as keyof typeof uniqueDays]) {
                    ;(uniqueDays as any)[item.day] = true
                    result.push(item)
                }
            }
        }

        return result
    }

    console.log({ result: findUniqueDays() })

    const { notification } = useNotification()

    console.log({ scheduleTime })

    useEffect(() => {
        if (createScheduleResult.isSuccess) {
            router.push(`/portals/student/assessments/schedule`)
        }
    }, [createScheduleResult])

    useEffect(() => {
        if (schedules?.data) {
            const uniqueDays = {}
            const result = []

            if (schedules?.data) {
                for (const item of schedules?.data?.calendar) {
                    if (!uniqueDays[item.day as keyof typeof uniqueDays]) {
                        ;(uniqueDays as any)[item.day] = true
                        result.push(item)
                    }
                }
            }
            if (result?.length > 0) {
                const tempAvailabilities: any = [...scheduleTime]

                result?.forEach((day: any) => {
                    const dayIndex = tempAvailabilities.findIndex(
                        (d: any) => d.name === day?.day
                    )
                    tempAvailabilities[dayIndex].id = day.id
                    tempAvailabilities[dayIndex].openingTime = day.openingTime
                    tempAvailabilities[dayIndex].closingTime = day.closingTime
                    tempAvailabilities[dayIndex].isActive = true
                })

                console.log({ tempAvailabilities })

                setAvailabilities(tempAvailabilities)
                setScheduleTime(tempAvailabilities)
                setSelectedCourse(schedules?.data?.course?.id)
                const startDate = schedules?.data?.startDate?.split('/')
                const date = `${startDate[2]}-${startDate[0]}-${startDate[1]}`
                setStartDate(date)
            }
            setIsUpdated(true)
        }
    }, [schedules])

    useEffect(() => {
        console.log({ selectedCourse })
        setScheduleTime(initialSchedule)
    }, [selectedCourse])

    const onScheduleChange = (schedule: any) => {
        const tempSchedule: any = [...scheduleTime]
        const dayIndex = tempSchedule.findIndex(
            (d: any) => d.name === schedule.name
        )

        tempSchedule[dayIndex].openingTime = moment(schedule.openingTime, [
            'h:mm:ss A',
        ]).format('HH:mm')
        tempSchedule[dayIndex].closingTime = moment(schedule.closingTime, [
            'h:mm:ss A',
        ]).format('HH:mm')
        tempSchedule[dayIndex].isActive = schedule.isActive

        setScheduleTime(tempSchedule)
    }

    const onSubmit = () => {
        if (!startDate) {
            notification.warning({
                title: 'Start Date',
                description: 'Start Date is Required!',
            })
        } else if (!selectedCourse) {
            notification.warning({
                title: 'Course',
                description: 'Course is Required!',
            })
        } else if (!scheduleTime?.filter((c: any) => c?.isActive)?.length) {
            notification.warning({
                title: 'Schedule',
                description: 'Schedule is Required!',
            })
        } else {
            if (
                startDate &&
                selectedCourse &&
                scheduleTime?.filter((c: any) => c?.isActive)?.length > 0
            ) {
                createSchedule({
                    startDate,
                    days: scheduleTime
                        ?.filter((c: any) => c?.isActive)
                        ?.map((c: any) => ({
                            name: c?.name,
                            openingTime: c?.openingTime,
                            closingTime: c?.closingTime,
                        })),
                    course: selectedCourse,
                }).then((res: any) => {
                    console.log('Outer')
                    console.log({ res })
                    if (res?.data) {
                        console.log('Inner')
                        router.push(`/portals/student/assessments/schedule`)
                    }
                })
            }
        }
    }

    console.log({ startDate })
    return (
        <>
            <ShowErrorNotifications result={createScheduleResult} />
            <Card>
                <Typography variant="title">Manage Schedule</Typography>
                <div className="flex justify-between items-center">
                    <div>
                        <TextInput
                            name="startingDate"
                            label={'Starting Date'}
                            placeholder="Start Date"
                            type={'date'}
                            value={startDate}
                            onChange={(e: any) => setStartDate(e.target?.value)}
                        />
                    </div>
                    <div className="w-72">
                        <Select
                            label={'Courses'}
                            name={'courses'}
                            defaultValue={courseOptions}
                            // value={courseOptions?.filter(
                            //     (c: any) =>
                            //         selectedCourse &&
                            //         selectedCourse?.length > 0 &&
                            //         selectedCourse?.includes(c.value)
                            // )}
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
                </div>

                {schedules.isLoading ? (
                    <LoadingAnimation />
                ) : schedules?.isSuccess && isUpdated ? (
                    <>
                        <Typography variant={'small'}>
                            Select Time {'&'} Days
                        </Typography>
                        <div className="my-2 flex flex-col gap-y-2">
                            {scheduleTime?.map((time: any, i: number) => (
                                <ScheduleCard
                                    key={i}
                                    time={time}
                                    setScheduleTime={setScheduleTime}
                                    onScheduleChange={onScheduleChange}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-y-2">
                        {scheduleTime?.map((time: any, i: number) => (
                            <ScheduleCard
                                key={i}
                                time={time}
                                setScheduleTime={setScheduleTime}
                                onScheduleChange={onScheduleChange}
                            />
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-x-4 text-sm text-green-500 mt-3">
                    <Button
                        text={'Submit'}
                        onClick={() => onSubmit()}
                        loading={createScheduleResult.isLoading}
                        disabled={createScheduleResult.isLoading}
                    />
                    {createScheduleResult.isSuccess ? (
                        <div> - Saved</div>
                    ) : null}
                </div>
            </Card>
        </>
    )
}
Schedule.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Schedule' }}>{page}</StudentLayout>
    )
}

export default Schedule
