import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { ScheduleTimetable } from '@partials/common/StudentProfileDetail/components/Schedule/components'
import { IndustryApi } from '@queries'
import { Course, Student } from '@types'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AddSchedule } from '../../components'

export const StudentSchedule = ({
    workplace,
    course,
    student,
}: {
    workplace: any
    course: Course
    student: Student
}) => {
    const router = useRouter()
    const [addSchedule, setAddSchedule] = useState<boolean>(false)

    const schedules = IndustryApi.Workplace.useStudentSchedule(
        {
            courseId: course?.id,
            studentUserId: student?.user?.id,
            workplace: workplace?.id,
        },
        {
            skip: !course?.id || !student?.user?.id,
        }
        // {
        //     skip: true,
        // }
    )

    return (
        <div className="relative h-full">
            {/* <div className="z-50 absolute top-0 left-0 w-full h-full bg-[#00000080]">
                <div className="w-full h-full flex justify-center items-start mt-24">
                    <div className="bg-white p-10 rounded-lg w-3/4">
                        <Typography variant="subtitle" center>
                            Our technical department is currently addressing a
                            technical issue. We appreciate your patience as we
                            work to resolve this matter
                        </Typography>
                    </div>
                </div>
            </div> */}
            {addSchedule ? (
                <AddSchedule
                    user={student?.user}
                    course={course}
                    onAddStudentCourse={() => {
                        setAddSchedule(false)
                    }}
                    workplace={workplace?.industries?.[0]?.industry}
                />
            ) : (
                <div className="">
                    <div className="flex justify-between items-center mb-2 py-4 border-b border-secondary-dark">
                        <div className="w-64 px-4">
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
                        <div className="px-4">
                            {' '}
                            <Button
                                text={
                                    schedules?.data && schedules?.data?.schedule
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
                    <Card>
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
                                            {schedules?.data?.schedule?.hours} :
                                            Hours
                                        </Typography>
                                    </div>
                                </div>

                                <ScheduleTimetable
                                    scheduleCourse={
                                        schedules?.data?.schedule?.course
                                    }
                                    scheduleId={schedules?.data?.schedule?.id}
                                />
                                {/* <ScheduleCalendar
                                    events={[
                                        ...schedules?.data?.schedule?.timeTables?.map(
                                            (c: any) => {
                                                const [year, month, day] =
                                                    moment(c?.date)
                                                        .format('YYYY-MM-DD')
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
                                                        ?.schedule?.course,
                                                    schedule: c,
                                                }
                                            }
                                        ),
                                    ]}
                                /> */}
                            </>
                        ) : (
                            schedules?.isSuccess && <EmptyData />
                        )}
                    </Card>
                </div>
            )}
        </div>
    )
}
