import React, { useEffect, useState } from 'react'
import { SubAdminApi } from '@queries'
import { Course, User } from '@types'
import { StudentSchedule } from '@partials/industry/currentStudents/tabs/detail/StudentSchedule'
import { useRouter } from 'next/router'
import { Button, Select } from '@components'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { AddScheduleContainer } from '@partials/common'

export const Schedule = ({ user }: { user: User }) => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [addSchedule, setAddSchedule] = useState<boolean>(false)

    const router = useRouter()
    const courses = SubAdminApi.Student.useCourses(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

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
            <div className='w-full h-14 border rounded-md text-2xl font-bold flex justify-center items-center'>
                In Progress
            </div>
            {addSchedule ? (
                <AddScheduleContainer
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
                                text={'Add Schedule'}
                                variant={'info'}
                                onClick={() => {
                                    setAddSchedule(true)
                                }}
                            />
                        </div>
                    </div>
                    <StudentSchedule
                        course={{ id: Number(selectedCourse) } as Course}
                        user={user}
                    />
                </>
            )}
        </div>
    )
}
