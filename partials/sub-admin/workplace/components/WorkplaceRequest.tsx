import moment from 'moment'

// Icons
import { RiBook2Fill } from 'react-icons/ri'
// components
import {
    Card,
    Typography,
    Button,
    ActionButton,
    Select,
    ShowErrorNotifications,
} from '@components'

// utils
import { WorkplaceCurrentStatus, ellipsisText, userStatus } from '@utils'

// hooks
import { GetFolders } from '../hooks'

// query
import {
    SubAdminApi,
    useAssignToSubAdminMutation,
    useCancelWorkplaceStatusMutation,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { useEffect, useState } from 'react'
import { useContextBar, useNotification } from '@hooks'
import { AssignToMe } from './AssignToMe'
import { RequestType } from './RequestType'
import { StudentDetail } from './StudentDetail'
import { WorkplaceFolders } from './WorkplaceFolders'
import { Industries } from './Industries'
import { Notes } from './Notes'
import { SmallDetail } from './smallDetail'
import { RtoDetail } from './RtoDetail'
import { Availability } from './Availability'
import { Course } from '@types'
import { ViewAgreement } from '@partials/common'
import { Waypoint } from 'react-waypoint'

export const WPStatusForCancelButon = [
    WorkplaceCurrentStatus.Applied,
    WorkplaceCurrentStatus.CaseOfficerAssigned,
    WorkplaceCurrentStatus.Interview,
    WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
    WorkplaceCurrentStatus.AppointmentBooked,
    WorkplaceCurrentStatus.AwaitingAgreementSigned,
    WorkplaceCurrentStatus.NoResponse,
    WorkplaceCurrentStatus.Rejected,
]
export const WorkplaceRequest = ({ workplace }: any) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [course, setCourse] = useState<any | null>(null)
    const [onEnterWorkplace, setOnEnterWorkplace] = useState<boolean>(false)

    const { setContent, show } = useContextBar()
    const { notification } = useNotification()

    // query
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceStatusMutation()
    const [assignCourse, assignCourseResult] =
        SubAdminApi.Workplace.assignCourse()

    // query
    const workplaceFolders = useGetWorkplaceFoldersQuery(
        {
            workplaceId: Number(workplace?.id),
            appliedIndustryId: appliedIndustry?.industry?.id,
            courseId: course?.id,
        },
        { skip: !workplace || !appliedIndustry || !course || !onEnterWorkplace }
    )

    const folders = GetFolders(workplaceFolders)

    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
        setCourse(workplace?.courses ? workplace?.courses[0] : {})
    }, [workplace])

    useEffect(() => {
        if (cancelWorkplaceResult.isSuccess) {
            notification.error({
                title: 'Workplace Cancelled',
                description: 'Workplace Cancelled Successfully',
            })
        }
    }, [cancelWorkplaceResult])

    const courseOptions =
        workplace?.student?.courses?.length > 0
            ? workplace?.student?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
              }))
            : []

    return (
        <Waypoint
            onEnter={() => setOnEnterWorkplace(true)}
            onLeave={() => setOnEnterWorkplace(false)}
        >
            <div>
                <Card noPadding>
                    <ShowErrorNotifications result={cancelWorkplaceResult} />
                    <div
                        className={`w-full h-full p-4 rounded-md shadow-lg ${
                            appliedIndustry?.isCompleted ? 'bg-gray-50' : ''
                        } `}
                    >
                        <div className="flex justify-between items-center flex-wrap gap-5 pb-2.5 border-b border-dashed">
                            <AssignToMe
                                workplace={workplace}
                                appliedIndustry={appliedIndustry}
                            />

                            <RtoDetail rto={workplace?.student?.rto} />

                            {/*  */}
                            {workplace?.courses?.length > 0 ? (
                                <div className="flex items-center relative">
                                    <div className="flex items-center gap-x-2">
                                        <RiBook2Fill className="text-gray-400 text-2xl" />
                                        <div>
                                            <Typography
                                                color={'black'}
                                                variant={'xs'}
                                            >
                                                {course?.sector?.name}
                                            </Typography>
                                            <Typography variant={'muted'}>
                                                {course?.code} -{' '}
                                                {ellipsisText(
                                                    course?.title,
                                                    15
                                                )}
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

                            {/* Request Type Selection */}
                            <div className="flex items-center justify-end gap-x-2">
                                {appliedIndustry?.AgreementSigned && (
                                    <Button
                                        variant={'info'}
                                        text={'View Agreement'}
                                        onClick={() => {
                                            setContent(
                                                <ViewAgreement
                                                    workplace={workplace}
                                                />
                                            )
                                            show(false)
                                        }}
                                    />
                                )}
                                <RequestType
                                    folders={folders}
                                    workplace={workplace}
                                    appliedIndustry={appliedIndustry}
                                />
                            </div>
                        </div>

                        {/* Student Small Details */}
                        <div className="mt-3 flex justify-between items-center">
                            <StudentDetail data={workplace?.student} />

                            {/*  */}
                            <WorkplaceFolders
                                workplace={workplace}
                                // courseId={course?.id}
                                // appliedIndustryId={appliedIndustry?.industry?.id}
                                folders={folders}
                            />
                        </div>

                        {/*  */}
                        <div className="w-full flex justify-between items-center">
                            {workplace?.currentWork &&
                                workplace?.currentQualification && (
                                    <SmallDetail
                                        currentWork={workplace?.currentWork}
                                        haveTransport={workplace?.haveTransport}
                                        haveDrivingLicense={
                                            workplace?.haveDrivingLicense
                                        }
                                        currentQualification={
                                            workplace?.currentQualification
                                        }
                                    />
                                )}

                            <div className="flex-shrink-0 flex justify-end ml-auto">
                                <Availability
                                    availability={
                                        workplace?.generalAvailability
                                    }
                                />
                            </div>
                        </div>

                        {/* Industries and notes */}
                        <div className="grid grid-cols-2 gap-x-3 mt-4">
                            {/* Industries */}
                            <div>
                                <Industries
                                    appliedIndustry={appliedIndustry}
                                    industries={workplace?.industries}
                                    workplaceId={workplace?.id}
                                    workplace={workplace}
                                    courseId={course?.id}
                                    folders={folders}
                                    student={workplace?.student}
                                />

                                {WPStatusForCancelButon.includes(
                                    workplace?.currentStatus
                                ) && (
                                    <div className="mt-3">
                                        <ActionButton
                                            variant={'error'}
                                            onClick={async () => {
                                                await cancelWorkplace(
                                                    Number(workplace?.id)
                                                )
                                            }}
                                            loading={
                                                cancelWorkplaceResult.isLoading
                                            }
                                            disabled={
                                                cancelWorkplaceResult.isLoading
                                            }
                                        >
                                            Cancel Request
                                        </ActionButton>
                                    </div>
                                )}
                                {/* {workplace?.currentStatus !==
                            WorkplaceCurrentStatus.Cancelled &&
                            !appliedIndustry?.cancelled &&
                            appliedIndustry?.industryResponse !== 'rejected' &&
                            !appliedIndustry?.isCompleted &&
                            !appliedIndustry?.terminated && (
                                
                            )} */}
                            </div>

                            {/* Notes */}
                            <Notes workplace={workplace} />
                        </div>
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
