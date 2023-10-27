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
import { Course, NextPageWithLayout, User } from '@types'
import { useRouter } from 'next/router'
import { ScheduleCard } from '@partials/student/Schedule'
import moment from 'moment'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { useNotification } from '@hooks'

type Props = {}

export const AddScheduleContainer = ({
    user,
    course,
    onAddStudentCourse,
}: {
    user?: User
    course: Course
    onAddStudentCourse?: () => void
}) => {
    const [selectedHours, setSelectedHours] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (course) {
            setSelectedHours(course?.hours)
        }
    }, [course])

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
    const [editSchedule, editScheduleResult] =
        StudentApi.Schedule.useEditStudentSchedule()

    const schedules = StudentApi.Schedule.useGetStudentSchedule(
        { courseId: Number(course?.id), userId: user?.id },
        {
            skip: !course,
        }
    )

    // const findUniqueDays = () => {
    //     const uniqueDays = {}
    //     const result = []

    //     if (schedules?.data) {
    //         for (const item of schedules?.data?.calendar) {
    //             if (!uniqueDays[item.day as keyof typeof uniqueDays]) {
    //                 ;(uniqueDays as any)[item.day] = true
    //                 result.push(item)
    //             }
    //         }
    //     }

    //     return result
    // }

    const { notification } = useNotification()

    useEffect(() => {
        if (createScheduleResult.isSuccess) {
            if (onAddStudentCourse) {
                onAddStudentCourse()
            } else {
                router.push(`/portals/student/assessments/schedule`)
            }
        }
    }, [createScheduleResult])
    useEffect(() => {
        if (editScheduleResult.isSuccess) {
            if (onAddStudentCourse) {
                onAddStudentCourse()
            } else {
                router.push(`/portals/student/assessments/schedule`)
            }
        }
    }, [editScheduleResult])

    useEffect(() => {
        if (schedules?.data) {
            const uniqueDays = {}
            const result = []

            if (schedules?.data) {
                for (const item of schedules?.data?.timeTables) {
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

                setAvailabilities(tempAvailabilities)
                setScheduleTime(tempAvailabilities)
                setSelectedCourse(schedules?.data?.course?.id)
                const startDate = moment(schedules?.data?.startDate)
                    .format('YYYY-MM-DD')
                    ?.split('-')

                const date = `${startDate[0]}-${startDate[1]}-${startDate[2]}`
                setStartDate(date)
            }
            setIsUpdated(true)
        }
    }, [schedules])

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
        } else if (!selectedHours) {
            notification.warning({
                title: 'Hours',
                description: 'Hours is Required!',
            })
        } else if (!course) {
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
                course &&
                scheduleTime?.filter((c: any) => c?.isActive)?.length > 0 &&
                selectedHours
            ) {
                if (schedules?.data) {
                    editSchedule({
                        id: schedules?.data?.id,
                        startDate,
                        days: scheduleTime
                            ?.filter((c: any) => c?.isActive)
                            ?.map((c: any) => ({
                                name: c?.name,
                                openingTime: c?.openingTime,
                                closingTime: c?.closingTime,
                            })),
                        course: course?.id,
                        hours: selectedHours,
                        stdUser: user?.id,
                    })
                } else {
                    createSchedule({
                        startDate,
                        days: scheduleTime
                            ?.filter((c: any) => c?.isActive)
                            ?.map((c: any) => ({
                                name: c?.name,
                                openingTime: c?.openingTime,
                                closingTime: c?.closingTime,
                            })),
                        course: course?.id,
                        hours: selectedHours,
                        stdUser: user?.id,
                    })
                }
            }
        }
    }

    return (
        <>
            <ShowErrorNotifications result={editScheduleResult} />
            <ShowErrorNotifications result={createScheduleResult} />
            <Card>
                <Typography variant="title">Manage Schedule</Typography>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="w-72">
                            <Typography variant="small">Course</Typography>
                            <div className="flex flex-col border rounded py-2 px-1">
                                <Typography variant="small">
                                    {course?.code}
                                </Typography>
                                <Typography variant="label" semibold>
                                    {course?.title}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-2">
                        <TextInput
                            name="hours"
                            label="Add Hours"
                            placeholder="Add Hours"
                            value={selectedHours}
                            onChange={(e: any) => {
                                setSelectedHours(e.target.value)
                            }}
                        />
                        <TextInput
                            name="startingDate"
                            label={'Starting Date'}
                            placeholder="Start Date"
                            type={'date'}
                            value={startDate}
                            onChange={(e: any) => setStartDate(e.target?.value)}
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
                        text={schedules?.data ? 'Update' : 'Submit'}
                        {...(schedules?.data
                            ? {
                                  outline: true,
                              }
                            : {})}
                        onClick={() => onSubmit()}
                        loading={createScheduleResult.isLoading}
                        disabled={createScheduleResult.isLoading}
                    />
                    {createScheduleResult.isSuccess ||
                    editScheduleResult.isSuccess ? (
                        <div> - Saved</div>
                    ) : null}
                </div>
            </Card>
        </>
    )
}
