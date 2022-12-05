import { ContextBarLoading, NoData, Typography } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course, Rto, SubAdmin } from '@types'
import { useEffect } from 'react'
import { AssignedCourse } from '../components'
import { AssignSectorForm } from '../form'

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

export const ViewSectorsCB = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    const { notification } = useNotification()
    const courses = AdminApi.SubAdmins.useCourses(subAdmin.id)
    const sectorsWithCourses = getSectors(courses.data)
    //  const courses = subAdmin.courses
    //  const sectorsWithCourses = getSectors(courses)

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
            id: subAdmin.id,
            course: course.id,
        })
    }

    useEffect(() => {
        if (assignCoursesResult.isSuccess) {
            notification.success({
                title: 'Courses Assigned',
                description: 'Courses have been assigned to Sub Admin',
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
                description: 'Courses have been unassigned to Sub Admin',
            })
        }

        if (unassignCourseResult.isError) {
            notification.error({
                title: 'Failed To Unassign',
                description: 'An error occurred while unassign course(s)',
            })
        }
    }, [unassignCourseResult])

    return (
        <div className="flex flex-col gap-y-6">
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Sectors &amp; Courses Of:
                </Typography>
                <Typography variant={'label'}>{subAdmin.user.name}</Typography>
            </div>

            <AssignSectorForm
                onSubmit={onSubmit}
                result={assignCoursesResult}
            />

            <div className={'flex flex-col gap-y-2'}>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Selected Sectors &amp; Courses
                </Typography>

                {courses.data?.length ? (
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
    )
}
