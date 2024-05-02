import {
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useContextBar, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course, OptionType, SubAdmin } from '@types'
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
    const contextBar = useContextBar()

    const courses = AdminApi.SubAdmins.useCourses(subAdmin.id)
    const sectorsWithCourses = getSectors(courses.data)

    const [assignCourses, assignCoursesResult] =
        AdminApi.SubAdmins.useAssignCourses()
    const onSubmit = async (values: any) => {
        const { courses } = values
        await assignCourses({
            subadmin: subAdmin.id,
            courses: courses?.map((c: OptionType) => c.value),
        })
    }

    useEffect(() => {
        if (assignCoursesResult.isSuccess) {
            notification.success({
                title: 'Courses Assigned',
                description: 'Courses have been assigned to Sub Admin',
            })
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [assignCoursesResult])

    return (
        <>
            <ShowErrorNotifications result={assignCoursesResult} />
            <div className="flex flex-col gap-y-6">
                <div>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Sectors &amp; Courses Of:
                    </Typography>
                    <Typography variant={'label'}>
                        {subAdmin.user.name}
                    </Typography>
                </div>

                <AssignSectorForm
                    onSubmit={onSubmit}
                    result={assignCoursesResult}
                    addedCourses={subAdmin?.courses}
                />

                <div className={'flex flex-col gap-y-2'}>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Selected Sectors &amp; Courses
                    </Typography>

                    {courses.isLoading ? (
                        <LoadingAnimation size={70} />
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
                                                subAdminId={subAdmin?.id}
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
