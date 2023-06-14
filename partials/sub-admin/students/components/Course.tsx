import { useEffect, useState } from 'react'

// Icons
import { BiCheck } from 'react-icons/bi'

// components
import {
    Typography,
    Button,
    TextInput,
    ShowErrorNotifications,
    ActionButton,
} from '@components'
import { IoClose, IoPencil } from 'react-icons/io5'

// queries
import { useUpdateSubAdminCourseDurationMutation } from '@queries'
import { useRouter } from 'next/router'
import { getCourseResult, getDate } from '@utils'

import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import moment from 'moment'
import { BsPencilFill } from 'react-icons/bs'

export const Course = ({
    course,
    studentId,
}: {
    course: any
    studentId: number
}) => {
    const pathname = useRouter()
    const profileId: any = pathname.query.profileId
    const [addDate, setAddDate] = useState(false)
    const [duration, setDuration] = useState<{
        startTime: Date
        endTime: Date
    }>({
        startTime: new Date(),
        endTime: new Date(),
    })
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const { notification } = useNotification()

    const result = getCourseResult(course?.results)

    const [timeDuration] = useUpdateSubAdminCourseDurationMutation()
    const [addCourseStartEndDate, addCourseStartEndDateResult] =
        SubAdminApi.Student.addCourseStartEndDate()
    const [updateCourseStartEndDate, updateCourseStartEndDateResult] =
        SubAdminApi.Student.useUpdateCourseStartEndDate()

    useEffect(() => {
        if (course?.timing && course?.timing?.length > 0) {
            setDuration({
                startTime: moment(course?.timing[0]?.startDate).format(
                    'YYYY-MM-DD'
                ) as any,
                endTime: moment(course?.timing[0]?.endDate).format(
                    'YYYY-MM-DD'
                ) as any,
            })
        }
    }, [course])

    useEffect(() => {
        if (addCourseStartEndDateResult.isSuccess) {
            notification.success({
                title: 'Time Added',
                description: 'Time Added Successfully',
            })
            setAddDate(false)
        }
    }, [addCourseStartEndDateResult])

    useEffect(() => {
        if (updateCourseStartEndDateResult.isSuccess) {
            notification.info({
                title: 'Time Updates',
                description: 'Time Updates Successfully',
            })
            setAddDate(false)
            setIsEdit(false)
        }
    }, [updateCourseStartEndDateResult])

    const badge = (text: string, outline?: boolean) => {
        return (
            <Typography variant={'badge'} uppercase>
                <span
                    className={`p-1 rounded ${
                        outline ? 'border border-success' : 'bg-success'
                    }`}
                >
                    {text}
                </span>
            </Typography>
        )
    }

    return (
        <>
            <ShowErrorNotifications result={addCourseStartEndDateResult} />
            <ShowErrorNotifications result={updateCourseStartEndDateResult} />
            <div className="px-2 py-2.5 flex justify-between items-center bg-gray-50">
                <div className="border-l-4 border-red-500 px-1">
                    <div className="flex gap-x-2">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {course?.code}
                        </Typography>
                        {/* {badge(course?.isActive ? 'Active' : 'Not Active', true)} */}
                        {badge(result?.result || 'Not Assessed')}
                    </div>
                    <Typography variant={'label'}>{course?.title}</Typography>
                </div>
                <div>
                    {addDate ? (
                        <div className="flex items-center gap-x-2.5">
                            <TextInput
                                label={'Start Date'}
                                type={'date'}
                                name={'startDate'}
                                value={duration.startTime}
                                onChange={(e: any) => {
                                    setDuration({
                                        ...duration,
                                        startTime: e.target.value,
                                    })
                                }}
                            />
                            <TextInput
                                label={'End Date'}
                                type={'date'}
                                name={'endDate'}
                                value={duration.endTime}
                                onChange={(e: any) => {
                                    setDuration({
                                        ...duration,
                                        endTime: e.target.value,
                                    })
                                }}
                            />

                            <ActionButton
                                Icon={BiCheck}
                                onClick={() => {
                                    if (isEdit) {
                                        updateCourseStartEndDate({
                                            ...duration,
                                            id: course?.timing[0]?.id,
                                        })
                                    } else {
                                        addCourseStartEndDate({
                                            ...duration,
                                            courseId: course?.id,
                                            studentId,
                                        })
                                    }
                                }}
                                variant={'info'}
                                loading={
                                    isEdit
                                        ? updateCourseStartEndDateResult.isLoading
                                        : addCourseStartEndDateResult.isLoading
                                }
                                disabled={
                                    isEdit
                                        ? updateCourseStartEndDateResult.isLoading
                                        : addCourseStartEndDateResult.isLoading
                                }
                                title={
                                    isEdit
                                        ? 'Update Course Time'
                                        : 'Add Course Time'
                                }
                            />
                            <ActionButton
                                Icon={IoClose}
                                onClick={() => {
                                    setAddDate(false)
                                }}
                                variant={'error'}
                                title={'Close'}
                            />
                        </div>
                    ) : course?.timing && course?.timing?.length > 0 ? (
                        <>
                            <div className="flex items-center gap-x-2">
                                <div>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        Start Date
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        {moment(
                                            course?.timing[0]?.startDate
                                        ).format('Do MMM YYYY')}
                                    </Typography>
                                </div>
                                <div className="border-2 border-gray-300 w-3" />
                                <div>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        End Date
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        {moment(
                                            course?.timing[0]?.endDate
                                        ).format('Do MMM YYYY')}
                                    </Typography>
                                </div>
                                <ActionButton
                                    Icon={BsPencilFill}
                                    onClick={() => {
                                        setAddDate(true)
                                        setIsEdit(true)
                                    }}
                                    variant={'info'}
                                    title={'Edit Course Time'}
                                />
                            </div>
                        </>
                    ) : (
                        <Button
                            variant={'secondary'}
                            text={'ADD START & FINISH DATE'}
                            onClick={() => {
                                setAddDate(true)
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
