import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Select,
    ShowErrorNotifications,
    TechnicalError,
    Typography,
} from '@components'
import { ScheduleCalendar } from '@partials/student/Schedule'
import {
    StudentApi,
    SubAdminApi,
    useGetSubAdminStudentWorkplaceDetailQuery,
} from '@queries'
import { Course, Industry, User } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { AddSchedule } from './components'

export const Schedule = ({
    user,
    studentId,
}: {
    studentId: number
    user: User
}) => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedIndustry, setSelectedIndustry] = useState<number | null>(
        null
    )
    const [addSchedule, setAddSchedule] = useState<boolean>(false)

    const router = useRouter()
    const courses = SubAdminApi.Student.useCourses(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })
    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        studentId,
        {
            skip: !studentId,
        }
    )

    const schedules = StudentApi.Schedule.useGetStudentSchedule(
        {
            courseId: Number(selectedCourse),
            userId: user?.id,
            workplace: Number(selectedIndustry),
        },
        {
            skip: !selectedCourse || !selectedIndustry,
        }
    )

    const industriesOptions = useMemo(
        () =>
            studentWorkplace?.data
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
        [studentWorkplace]
    )

    useEffect(() => {
        if (courses.data && courses.data?.length > 0) {
            setSelectedCourse(courses.data?.[0]?.id)
        }
        if (industriesOptions && industriesOptions?.length > 0) {
            setSelectedIndustry(industriesOptions?.[0]?.value)
        }
    }, [courses, industriesOptions])

    const courseOptions = courses.data?.map((course: Course) => ({
        value: course?.id,
        label: course?.title,
        item: course,
    }))

    return (
        <div>
            <ShowErrorNotifications result={schedules} />
            {addSchedule ? (
                <AddSchedule
                    user={user}
                    studentId={studentId}
                    selectedCourse={Number(selectedCourse)}
                    onAddStudentCourse={() => {
                        setAddSchedule(false)
                    }}
                    workplace={
                        industriesOptions?.find(
                            (w: any) => w?.value === Number(selectedIndustry)
                        )?.item
                    }
                />
            ) : (
                <>
                    <Card noPadding>
                        <div className="px-4 py-3.5 border-b border-secondary-dark">
                            <Typography variant="label">Schedule</Typography>
                        </div>
                        <div className="flex justify-between px-4 py-3.5">
                            <div className="flex gap-x-2">
                                <div className="w-72">
                                    <Select
                                        label={'Courses'}
                                        name={'courses'}
                                        value={courseOptions?.find(
                                            (c: any) =>
                                                c?.value === selectedCourse
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
                                            (c: any) =>
                                                c?.value === selectedIndustry
                                        )}
                                        options={industriesOptions}
                                        loading={studentWorkplace.isLoading}
                                        onlyValue
                                        disabled={studentWorkplace.isLoading}
                                        validationIcons
                                        onChange={(e: any) => {
                                            setSelectedIndustry(e)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mt-1">
                                <Button
                                    text={
                                        schedules?.data?.schedule
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
                            {schedules.isError && <TechnicalError />}
                            {schedules?.isLoading ? (
                                <LoadingAnimation />
                            ) : schedules?.data?.schedule ? (
                                <>
                                    <div className="flex gap-x-4 items-center">
                                        <div>
                                            <Typography variant="subtitle">
                                                Start Date
                                            </Typography>
                                            <Typography variant="label">
                                                {moment(
                                                    schedules?.data?.schedule
                                                        ?.startDate
                                                ).format('MMMM DD, YYYY')}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle">
                                                End Date
                                            </Typography>
                                            <Typography variant="label">
                                                {moment(
                                                    schedules?.data?.schedule
                                                        ?.endDate
                                                ).format('MMMM DD, YYYY')}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle">
                                                Total Hours
                                            </Typography>
                                            <Typography variant="label">
                                                {
                                                    schedules?.data?.schedule
                                                        ?.hours
                                                }{' '}
                                                : Hours
                                            </Typography>
                                        </div>
                                    </div>

                                    <ScheduleCalendar
                                        events={[
                                            ...schedules?.data?.schedule?.timeTables?.map(
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
                                <EmptyData />
                            )}
                        </div>
                    </Card>
                </>
            )}
        </div>
    )
}
