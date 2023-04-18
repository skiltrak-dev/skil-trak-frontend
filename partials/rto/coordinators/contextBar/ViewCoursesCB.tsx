import {
    ContextBarLoading,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useContextBar, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course, Rto, Student, SubAdmin } from '@types'
import { useEffect } from 'react'
import { AssignedCourse } from '@partials/rto/student/components'
import { AssignCourseForm } from '../forms'

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses.forEach((c: any) => {
        if ((sectors as any)[c.sector.name]) {
            ;(sectors as any)[c.sector.name].push(c)
        } else {
            ;(sectors as any)[c.sector.name] = []
            ;(sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

export const ViewCoursesCB = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    const { notification } = useNotification()
    const courses = AdminApi.SubAdmins.useCourses(subAdmin.id)
    const sectorsWithCourses = getSectors(courses.data)

    const contextBar = useContextBar()

    const [assignCourses, assignCoursesResult] =
        AdminApi.SubAdmins.useAssignCourses()
    const onSubmit = async (values: any) => {
        const { courses } = values
        await assignCourses({
            subadmin: subAdmin.id,
            courses: courses.map((c: any) => c.value),
        })
    }

    const [unassignCourse, unassignCourseResult] =
        AdminApi.SubAdmins.useUnassignCourse()
    const onCourseRemove = async (course: Course) => {
        await unassignCourse({
            id: Number(subAdmin.id),
            courseId: Number(course.id),
        })
    }

    useEffect(() => {
        if (assignCoursesResult.isSuccess) {
            notification.success({
                title: 'Courses Assigned',
                description: 'Courses have been assigned to Student',
            })
            contextBar.setContent(null)
            contextBar.hide()
            contextBar.setTitle('')
        }
    }, [assignCoursesResult])

    useEffect(() => {
        if (unassignCourseResult.isSuccess) {
            notification.info({
                title: 'Courses Unassigned',
                description: 'Courses have been unassigned to RTO',
            })
            contextBar.setContent(null)
            contextBar.hide()
            contextBar.setTitle('')
        }
    }, [unassignCourseResult])

    return (
        <>
            <ShowErrorNotifications result={assignCoursesResult} />
            <ShowErrorNotifications result={unassignCourseResult} />
            <div className="flex flex-col gap-y-6">
                <div>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Sectors &amp; Courses Of:
                    </Typography>
                    <Typography variant={'label'}>
                        {subAdmin.user.name}
                    </Typography>
                </div>

                <AssignCourseForm
                    onSubmit={onSubmit}
                    result={assignCoursesResult}
                />

                <div className={'flex flex-col gap-y-2'}>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Selected Sectors &amp; Courses
                    </Typography>

                    {courses.isLoading ? (
                        <ContextBarLoading />
                    ) : courses.data?.length ? (
                        Object.keys(sectorsWithCourses).map((sector) => {
                            return (
                                <>
                                    <span
                                        key={sector}
                                        className="text-xs font-medium text-slate-400 border-t pt-2"
                                    >
                                        {sector}
                                    </span>

                                    {(sectorsWithCourses as any)[sector].map(
                                        (c: Course) => (
                                            <AssignedCourse
                                                key={c.id}
                                                course={c}
                                                onRemove={onCourseRemove}
                                            />
                                        )
                                    )}
                                </>
                            )
                        })
                    ) : (
                        <NoData text={'No Courses Assigned'} />
                    )}
                </div>
            </div>
        </>
    )
}
