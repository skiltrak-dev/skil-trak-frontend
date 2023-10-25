import {
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { ScheduleCalendar } from '@partials/student/Schedule'
import { Course } from '@types'
import moment from 'moment'

export const StudentSchedule = ({
    course,
    schedules,
}: {
    course: Course
    schedules: any
}) => {
    return (
        <div>
            <div className="mt-3">
                <Card>
                    {schedules.isError && <TechnicalError />}
                    {schedules?.isLoading ? (
                        <LoadingAnimation />
                    ) : schedules?.data ? (
                        <>
                            <Typography>
                                Start Date :{' '}
                                {moment(schedules?.data?.startDate).format(
                                    'MMM DD, YYYY'
                                )}
                            </Typography>
                            <Typography>
                                End Date :{' '}
                                {moment(schedules?.data?.endDate).format(
                                    'MMM DD, YYYY'
                                )}
                            </Typography>
                            <ScheduleCalendar
                                events={[
                                    ...schedules?.data?.calendar?.map(
                                        (c: any) => {
                                            const [year, month, day] = c?.date
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
        </div>
    )
}
