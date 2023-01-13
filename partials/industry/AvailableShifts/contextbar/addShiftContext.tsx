import { ContextBarLoading, NoData, Typography } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course, Rto } from '@types'
import { Fragment, useEffect } from 'react'
import { AddShiftForm } from '../form'

export const AddShiftContext = ({ day }: { day: string }) => {
    const { notification } = useNotification()

    const [assignCourses, assignCoursesResult] =
        AdminApi.Rtos.useAssignCourses()

    const [unassignCourse, unassignCourseResult] =
        AdminApi.Rtos.useUnassignCourses()

    useEffect(() => {
        if (assignCoursesResult.isSuccess) {
            notification.success({
                title: 'Courses Assigned',
                description: 'Courses have been assigned to RTO',
            })
        }

        if (assignCoursesResult.isError) {
            notification.error({
                title: 'Courses Assignment Failed',
                description: 'An error occurred while assigning course(s)',
            })
        }
    }, [assignCoursesResult])

    useEffect(() => {
        if (unassignCourseResult.isSuccess) {
            notification.info({
                title: 'Courses Unassigned',
                description: 'Courses have been unassigned to RTO',
            })
        }

        if (unassignCourseResult.isError) {
            notification.error({
                title: 'Failed To Unassign',
                description: 'An error occurred while unassign course(s)',
            })
        }
    }, [unassignCourseResult])

    const onSubmit = (values: any) => {
        console.log('values', values)
    }

    return (
        <div className="flex flex-col gap-y-6">
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Day:
                </Typography>
                <Typography variant={'label'}>{day}</Typography>
            </div>

            <AddShiftForm onSubmit={onSubmit} result={assignCoursesResult} />

            <div className={'flex flex-col gap-y-2'}>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Selected Sectors &amp; Courses
                </Typography>
            </div>
        </div>
    )
}
