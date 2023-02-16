import {
    Card,
    InitialAvatar,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { ProgressCell } from '@partials/admin/student/components'
import {
    Industries,
    RequestType,
    StudentDetail,
} from '@partials/sub-admin/workplace/components'

import { AdminApi } from '@queries'
import { Course } from '@types'
import { checkWorkplaceStatus } from '@utils'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import { AssignWorkplace } from '../AssignWorkplace'
type Props = {
    workplace: any
}

export const AdminWorkplaceRequest = ({ workplace }: Props) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)

    // notification
    const { notification } = useNotification()

    // query
    const [assignCourse, assignCourseResult] = AdminApi.Workplace.assignCourse()

    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
    }, [workplace])

    useEffect(() => {
        if (assignCourseResult.isSuccess) {
            notification.success({
                title: 'Course Assigned',
                description: 'Course Assigned Successfully',
            })
        }
    }, [assignCourseResult])

    const steps = checkWorkplaceStatus(workplace?.currentStatus)

    const courseOptions =
        workplace?.student?.courses?.length > 0
            ? workplace?.student?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
              }))
            : []

    return (
        <div>
            <ShowErrorNotifications result={assignCourseResult} />
            <Card>
                <div className="grid grid-cols-4 gap-x-5 items-center pb-2.5 border-b border-dashed">
                    <AssignWorkplace workplace={workplace} />
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <InitialAvatar
                                name={workplace?.student?.user?.name}
                                imageUrl={workplace?.student?.user?.avatar}
                            />
                            <div>
                                <Typography color={'black'} variant={'small'}>
                                    {workplace?.student?.user?.name}
                                </Typography>
                                <div className="flex flex-col  gap-x-2">
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        <span className="break-all">
                                            {workplace?.student?.user?.email}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        <span className="break-all">
                                            {workplace?.student?.phone}
                                        </span>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    {workplace?.courses?.length > 0 ? (
                        <div className="flex items-center relative">
                            <div className="flex items-center gap-x-2">
                                <RiBook2Fill className="text-gray-400 text-2xl" />
                                <div>
                                    <Typography color={'black'} variant={'xs'}>
                                        {workplace?.courses[0]?.sector?.name}
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        <span className="break-all">
                                            {workplace?.courses[0]?.code}{' '}
                                        </span>
                                        -{' '}
                                        <span className="break-all">
                                            {workplace?.courses[0]?.title}
                                        </span>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Select
                            label={'Course'}
                            name={'course'}
                            options={courseOptions}
                            placeholder={'Select Course...'}
                            onChange={(e: any) => {
                                if (e?.value) {
                                    assignCourse({
                                        courseId: e?.value,
                                        workplaceId: workplace?.id,
                                    })
                                }
                            }}
                            loading={assignCourseResult.isLoading}
                            disabled={assignCourseResult.isLoading}
                        />
                    )}

                    <ProgressCell
                        step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    />
                </div>

                {/* Student Small Details */}
                <div className="mt-3 flex justify-between items-center">
                    <StudentDetail data={workplace?.student} />

                    {/*  */}
                    <div className="flex items-center gap-x-5">
                        {/* <div className="flex flex-col items-end gap-y-1">
                            <Typography variant={'small'}>
                                <span className="bg-primary-light text-primary rounded-md p-1">
                                    Documents Pending
                                </span>
                            </Typography>
                            <Typography variant={'small'} color={'text-info'}>
                                <span className="font-semibold">
                                    View Folders
                                </span>
                            </Typography>
                        </div> */}
                        <div>
                            <Typography variant={'xs'}>Recieved On:</Typography>
                            <Typography variant={'small'}>
                                <span className="font-semibold">
                                    {moment(
                                        workplace?.createdAt,
                                        'YYYY-MM-DD hh:mm:ss Z'
                                    ).format('Do MMM, YYYY')}
                                </span>
                                Date
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Industries and notes */}
                <div className="grid grid-cols-2 gap-x-3 mt-4">
                    {/* Industries */}
                    <Industries
                        appliedIndustry={appliedIndustry}
                        industries={workplace?.industries}
                        workplaceId={workplace?.id}
                        workplace={workplace}
                        admin
                    />

                    {/* Notes */}
                    {/* <Notes /> */}
                </div>
            </Card>
        </div>
    )
}
