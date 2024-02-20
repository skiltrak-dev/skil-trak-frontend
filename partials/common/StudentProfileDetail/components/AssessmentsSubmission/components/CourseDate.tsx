import React, { useEffect, useState } from 'react'
import { ActionButton, ShowErrorNotifications } from '@components'
import { AddCourseDateForm } from '../forms'
import { SubAdminApi } from '@queries'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'
import { CourseTime } from './CourseTime'
import { Course } from '@types'

export const CourseDate = ({
    course,
    active,
}: {
    active: boolean
    course: Course
}) => {
    const router = useRouter()

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [addCourseDate, setAddCourseDate] = useState<boolean>(false)

    const { notification } = useNotification()

    const [addCourseStartEndDate, addCourseStartEndDateResult] =
        SubAdminApi.Student.addCourseStartEndDate()
    const [updateCourseStartEndDate, updateCourseStartEndDateResult] =
        SubAdminApi.Student.useUpdateCourseStartEndDate()

    useEffect(() => {
        setIsEdit(false)
        setAddCourseDate(false)
    }, [course])

    const onCancel = () => {
        setIsEdit(false)
        setAddCourseDate(false)
    }

    const onEdit = () => {
        setIsEdit(true)
        setAddCourseDate(true)
    }

    const onSubmit = (values: any) => {
        if (isEdit) {
            updateCourseStartEndDate({
                startTime: moment(new Date(values?.startTime))
                    .add(1, 'day')
                    .format('YYYY-MM-DD') as any,
                endTime: moment(new Date(values?.endTime))
                    .add(1, 'day')
                    .format('YYYY-MM-DD') as any,
                id: course?.timing[0]?.id,
            }).then((res: any) => {
                if (res?.data) {
                    notification.info({
                        title: 'Course Date Updated',
                        description: 'Course Date Updated Successfully',
                    })
                    setIsEdit(false)
                    setAddCourseDate(false)
                }
            })
        } else {
            addCourseStartEndDate({
                startTime: moment(new Date(values?.startTime))
                    .add(1, 'day')
                    .format('YYYY-MM-DD') as any,
                endTime: moment(new Date(values?.endTime))
                    .add(1, 'day')
                    .format('YYYY-MM-DD') as any,
                courseId: course?.id,
                studentId: Number(router?.query?.id),
            }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Course Date Added',
                        description: 'Course Date Added Successfully',
                    })
                    setAddCourseDate(false)
                }
            })
        }
    }
    return (
        <div>
            <ShowErrorNotifications result={addCourseStartEndDateResult} />
            <ShowErrorNotifications result={updateCourseStartEndDateResult} />
            {addCourseDate ? (
                <AddCourseDateForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    result={
                        isEdit
                            ? updateCourseStartEndDateResult
                            : addCourseStartEndDateResult
                    }
                    timing={course?.timing?.[0]}
                    active={active}
                />
            ) : course?.timing && course?.timing?.length > 0 ? (
                <CourseTime
                    timing={course?.timing?.[0]}
                    onEdit={onEdit}
                    active={active}
                />
            ) : (
                <ActionButton
                    variant="error"
                    onClick={() => {
                        setAddCourseDate(!addCourseDate)
                    }}
                >
                    Add Date
                </ActionButton>
            )}
        </div>
    )
}
