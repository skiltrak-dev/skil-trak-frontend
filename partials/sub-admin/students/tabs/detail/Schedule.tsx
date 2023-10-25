import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Select,
    TechnicalError,
    Typography,
} from '@components'
import { ScheduleCalendar } from '@partials/student/Schedule'
import { StudentApi, SubAdminApi } from '@queries'
import { Course, User } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AddSchedule } from './AddSchedule'

export const Schedule = ({
    user,
    studentId,
}: {
    studentId: number
    user: User
}) => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [addSchedule, setAddSchedule] = useState<boolean>(false)

    const router = useRouter()
    const courses = SubAdminApi.Student.useCourses(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })
    const schedules = StudentApi.Schedule.useGetStudentSchedule(
        { courseId: Number(selectedCourse), userId: user?.id },
        {
            skip: !selectedCourse,
        }
    )

    useEffect(() => {
        if (courses.data && courses.data?.length > 0) {
            setSelectedCourse(courses.data?.[0]?.id)
        }
    }, [courses])

    const courseOptions = courses.data?.map((course: Course) => ({
        value: course?.id,
        label: course?.title,
        item: course,
    }))
    return (
        <div>
            {addSchedule ? (
                <AddSchedule
                    user={user}
                    studentId={studentId}
                    selectedCourse={Number(selectedCourse)}
                    onAddStudentCourse={() => {
                        setAddSchedule(false)
                    }}
                />
            ) : (
                <>
                    <div className="flex justify-between mt-3">
                        <div className="w-72">
                            <Select
                                label={'Courses'}
                                name={'courses'}
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
                        <div>
                            <Button
                                text={
                                    schedules?.data
                                        ? 'Edit Schedule'
                                        : 'Add Schedule'
                                }
                                variant={'info'}
                                onClick={() => {
                                    setAddSchedule(true)
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <Card>
                            {schedules.isError && <TechnicalError />}
                            {schedules?.isLoading ? (
                                <LoadingAnimation />
                            ) : schedules?.data ? (
                                <>
                                    <div className="flex gap-x-4 items-center">
                                        <div>
                                            <Typography variant="subtitle">
                                                Start Date
                                            </Typography>
                                            <Typography variant="label">
                                                {moment(
                                                    schedules?.data?.startDate
                                                ).format('MMMM DD, YYYY')}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle">
                                                End Date
                                            </Typography>
                                            <Typography variant="label">
                                                {moment(
                                                    schedules?.data?.endDate
                                                ).format('MMMM DD, YYYY')}
                                            </Typography>
                                        </div>
                                    </div>

                                    <ScheduleCalendar
                                        events={[
                                            ...schedules?.data?.timeTables?.map(
                                                (c: any) => {
                                                    const [year, month, day] =
                                                        moment(c?.date)
                                                            .format(
                                                                'YYYY-MM-DD'
                                                            )
                                                            .split('-')
                                                            .map(Number)
                                                    const [hour, minute] =
                                                        c?.openingTime
                                                            .split(':')
                                                            .map(Number)
                                                    const [
                                                        closingHour,
                                                        closingMinute,
                                                    ] = c?.closingTime
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
                                                        course: schedules?.data
                                                            ?.course,
                                                        schedule: c,
                                                    }
                                                }
                                            ),
                                        ]}
                                    />
                                </>
                            ) : (
                                schedules?.isSuccess && <EmptyData />
                            )}
                        </Card>
                    </div>
                </>
            )}
        </div>
    )
}
