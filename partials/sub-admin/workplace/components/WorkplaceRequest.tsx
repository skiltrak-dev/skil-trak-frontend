// Icons
import { RiBook2Fill } from 'react-icons/ri'
// components
import {
    ActionButton,
    Button,
    Card,
    InitialAvatar,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'

// utils
import {
    CourseSelectOption,
    WorkplaceCurrentStatus,
    ellipsisText,
    formatOptionLabel,
    getUserCredentials,
} from '@utils'

// hooks
import { GetFolders } from '../hooks'

// query
import { useContextBar, useNotification } from '@hooks'
import { ViewAgreement } from '@partials/common'
import {
    SubAdminApi,
    useCancelWorkplaceStatusMutation,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { Course } from '@types'
import { ReactElement, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { AssignToMe } from './AssignToMe'
import { Availability } from './Availability'
import { Industries } from './Industries'
import { Notes } from './Notes'
import { RequestType } from './RequestType'
import { RtoDetail } from './RtoDetail'
import { StudentDetail } from './StudentDetail'
import { WorkplaceFolders } from './WorkplaceFolders'
import { SmallDetail } from './SmallDetail'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import Link from 'next/link'
import { UserRoles } from '@constants'
import { BsDot } from 'react-icons/bs'
import { CancelWorkplaceModal } from '@partials/common/StudentProfileDetail/components'

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
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
                  item: course,
                  value: course?.id,
                  label: course?.title,
              }))
            : []

    const role = getUserCredentials()?.role

    const onCancelWorkplaceClicked = () => {
        setModal(
            <CancelWorkplaceModal
                onCancel={() => {
                    setModal(null)
                }}
                workplaceId={workplace?.id}
            />
        )
    }

    return (
        <>
            {modal}
            <Waypoint
                onEnter={() => setOnEnterWorkplace(true)}
                onLeave={() => setOnEnterWorkplace(false)}
            >
                <div>
                    <Card noPadding>
                        <ShowErrorNotifications
                            result={cancelWorkplaceResult}
                        />
                        <div
                            className={`w-full transition-all duration-700 overflow-hidden p-4 rounded-md shadow-lg ${
                                appliedIndustry?.isCompleted ? 'bg-gray-50' : ''
                            } ${isOpen ? 'max-h-[1000px]' : 'max-h-[500px]'}`}
                        >
                            <div>
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
                                                    <Typography
                                                        variant={'muted'}
                                                    >
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
                                                        workplaceId:
                                                            workplace?.id,
                                                    })
                                                }
                                            }}
                                            components={{
                                                Option: CourseSelectOption,
                                            }}
                                            formatOptionLabel={
                                                formatOptionLabel
                                            }
                                            loading={
                                                assignCourseResult.isLoading
                                            }
                                            disabled={
                                                assignCourseResult.isLoading
                                            }
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
                                                            workplace={
                                                                workplace
                                                            }
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
                                            isOpen={isOpen}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end ml-auto">
                                    <ActionButton
                                        variant="info"
                                        simple
                                        Icon={
                                            isOpen
                                                ? MdKeyboardArrowUp
                                                : MdKeyboardArrowDown
                                        }
                                        onClick={() => {
                                            setIsOpen(!isOpen)
                                            if (isOpened) {
                                                setTimeout(() => {
                                                    setIsOpened(!isOpened)
                                                }, 480)
                                            } else {
                                                setIsOpened(!isOpened)
                                            }
                                        }}
                                    >
                                        {isOpened ? 'Show Less' : 'Show More'}
                                    </ActionButton>
                                </div>
                            </div>

                            {/* Student Small Details */}
                            <div
                                className={`mt-3  gap-y-5 justify-between items-center ${
                                    isOpened
                                        ? 'flex flex-col md:flex-row'
                                        : 'grid grid-cols-2'
                                }`}
                            >
                                <StudentDetail data={workplace?.student} />

                                {!isOpened && (
                                    <div>
                                        {appliedIndustry ? (
                                            <>
                                                <Typography variant={'label'}>
                                                    Work Industry
                                                </Typography>
                                                <Link
                                                    href={
                                                        role === UserRoles.ADMIN
                                                            ? `/portals/admin/industry/${appliedIndustry?.industry?.id}?tab=sectors`
                                                            : role ===
                                                              UserRoles.SUBADMIN
                                                            ? `/portals/sub-admin/users/industries/${appliedIndustry?.industry?.id}?tab=overview`
                                                            : '#'
                                                    }
                                                    className="flex items-center gap-x-2 cursor-pointer bg-gray-100 py-1 px-2 rounded-md"
                                                >
                                                    {appliedIndustry?.industry
                                                        ?.user?.name && (
                                                        <InitialAvatar
                                                            name={
                                                                appliedIndustry
                                                                    ?.industry
                                                                    ?.user?.name
                                                            }
                                                            imageUrl={
                                                                appliedIndustry
                                                                    ?.industry
                                                                    ?.user
                                                                    ?.avatar
                                                            }
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="flex items-center gap-x-0.5">
                                                            <Typography
                                                                variant={
                                                                    'label'
                                                                }
                                                            >
                                                                <span className="cursor-pointer">
                                                                    {
                                                                        appliedIndustry
                                                                            ?.industry
                                                                            ?.user
                                                                            ?.name
                                                                    }
                                                                </span>
                                                            </Typography>
                                                            <BsDot />
                                                            <Typography
                                                                variant={'xs'}
                                                                color={
                                                                    'text-gray-500'
                                                                }
                                                            >
                                                                {Number(
                                                                    appliedIndustry?.distance
                                                                )?.toFixed(
                                                                    2
                                                                )}{' '}
                                                                Km Away
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            variant={'muted'}
                                                            color={'gray'}
                                                        >
                                                            {appliedIndustry?.location
                                                                ? `${appliedIndustry?.location?.suburb}, ${appliedIndustry?.location?.address}`
                                                                : `${appliedIndustry?.industry?.suburb}, ${appliedIndustry?.industry?.state}, ${appliedIndustry?.industry?.addressLine1}`}
                                                        </Typography>
                                                    </div>
                                                </Link>
                                            </>
                                        ) : null}
                                    </div>
                                )}

                                {/*  */}
                                <div className="ml-auto">
                                    <WorkplaceFolders
                                        workplace={workplace}
                                        // courseId={course?.id}
                                        // appliedIndustryId={appliedIndustry?.industry?.id}
                                        folders={folders}
                                    />
                                </div>
                            </div>

                            {/*  */}
                            {isOpened && (
                                <>
                                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                                        <SmallDetail
                                            currentWork={workplace?.currentWork}
                                            haveTransport={
                                                workplace?.haveTransport
                                            }
                                            haveDrivingLicense={
                                                workplace?.haveDrivingLicense
                                            }
                                            currentQualification={
                                                workplace?.currentQualification
                                            }
                                        />

                                        <div className="flex-shrink-0 flex justify-end ml-auto">
                                            <Availability
                                                wpId={workplace?.id}
                                            />
                                        </div>
                                    </div>
                                    {/* Industries and notes */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mt-4">
                                        {/* Industries */}
                                        <div>
                                            <Industries
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                                industries={
                                                    workplace?.industries
                                                }
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
                                                        onClick={() => {
                                                            onCancelWorkplaceClicked()
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
                                </>
                            )}
                        </div>
                    </Card>
                </div>
            </Waypoint>
        </>
    )
}
