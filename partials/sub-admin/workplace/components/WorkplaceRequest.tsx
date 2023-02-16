import moment from 'moment'

// Icons
import { RiBook2Fill } from 'react-icons/ri'
// components
import { Card, Typography, Button, ActionButton, Select } from '@components'

// utils
import { ellipsisText, userStatus } from '@utils'

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
import { useContextBar } from '@hooks'
import { AssignToMe } from './AssignToMe'
import { RequestType } from './RequestType'
import { StudentDetail } from './StudentDetail'
import { WorkplaceFolders } from './WorkplaceFolders'
import { Industries } from './Industries'
import { Notes } from './Notes'
import { SmallDetail } from './smallDetail'
import { ViewAgreement } from '../contextBar'
import { RtoDetail } from './RtoDetail'
import { Availability } from './Availability'
import { Course } from '@types'
export const WorkplaceRequest = ({ workplace }: any) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [course, setCourse] = useState<any | null>(null)

    const { setContent, show } = useContextBar()

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
        { skip: !workplace || !appliedIndustry || !course }
    )

    const folders = GetFolders(workplaceFolders)

    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
        setCourse(workplace?.courses ? workplace?.courses[0] : {})
    }, [workplace])

    const courseOptions =
        workplace?.student?.courses?.length > 0
            ? workplace?.student?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
              }))
            : []
    return (
        <Card noPadding>
            <div
                className={`w-full h-full p-4 rounded-md shadow-lg ${
                    appliedIndustry?.isCompleted ? 'bg-gray-50' : ''
                } `}
            >
                <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
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
                                    <Typography color={'black'} variant={'xs'}>
                                        {course?.sector?.name}
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        {course?.code} -{' '}
                                        {ellipsisText(course?.title, 15)}
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
                    <div className="flex items-center gap-x-2">
                        {appliedIndustry?.AgreementSigned && (
                            <Button
                                variant={'info'}
                                text={'View Agreement'}
                                onClick={() => {
                                    setContent(
                                        <ViewAgreement
                                            agreement={
                                                workplace?.student?.agreement
                                            }
                                        />
                                    )
                                    show()
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
                        // workplace={workplace}
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
                            availability={workplace?.generalAvailability}
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
                        {!appliedIndustry?.cancelled &&
                            appliedIndustry?.industryResponse !== 'rejected' &&
                            !appliedIndustry?.isCompleted &&
                            !appliedIndustry?.terminated && (
                                <div className="mt-3">
                                    <ActionButton
                                        variant={'error'}
                                        onClick={async () => {
                                            await cancelWorkplace(
                                                Number(appliedIndustry?.id)
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
                    </div>

                    {/* Notes */}
                    <Notes workplace={workplace} />
                </div>
            </div>
        </Card>
    )
}
