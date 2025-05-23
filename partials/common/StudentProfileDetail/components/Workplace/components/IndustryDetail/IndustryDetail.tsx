import {
    AuthorizedUserComponent,
    Card,
    NoData,
    Tooltip,
    Typography,
    VideoPreview,
} from '@components'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { UserRoles } from '@constants'
import { useContextBar, useNotification, useSubadminProfile } from '@hooks'
import { ViewOnMapIndustriesModal } from '@partials/common/MapBox'
import {
    WorkplaceEmploymentDocument,
    WorkplaceMapBoxView,
} from '@partials/student'
import { AvailabelMeetingDate } from '@partials/student/workplace/components/WorkplaceApproval/AvailabelMeetingDate'
import { AddIndustryCB } from '@partials/sub-admin/workplace/contextBar'
import { Course, Student } from '@types'
import { getUserCredentials, WorkplaceCurrentStatus } from '@utils'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { IoIosWarning, IoMdDocument } from 'react-icons/io'
import {
    IWorkplaceIndustries,
    WorkplaceWorkIndustriesType,
} from 'redux/queryTypes'
import {
    ShowPlacementCommentsModal,
    ViewContactedIndustryModal,
} from '../../modals'
import { Actions } from './Actions'
import { AgreementView } from '../AgreementView'
import { StudentProvidedActions } from './StudentProvidedActions'
import { IndustryCard, StudentInterviewDetail } from './components'
import { StudentProvidedABNActions } from './StudentProvidedABNActions'
import { useAssessmentDocumentsView } from '../../../AssessmentsSubmission'

export const IndustryDetail = ({
    student,
    course,
    wpIndustriesLength,
    workplace,
    appliedIndustry,
    approvalDate,
}: {
    student: Student
    wpIndustriesLength: number
    approvalDate: string
    course: Course
    workplace: IWorkplaceIndustries
    appliedIndustry: WorkplaceWorkIndustriesType
}) => {
    const contextBar = useContextBar()
    const { notification } = useNotification()
    const [showMap, setShowMap] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const role = getUserCredentials()?.role

    const suggestedIndustries = workplace?.industries?.filter(
        (i: any) => !i.applied
    )

    const onCancelClicked = () => setModal(null)

    // TODO : When user copy the listing industry phone number track it in contacted history and make a separate tab in modal like From Listing Industries
    const onViewContactedIndustries = () => {
        setModal(
            <ViewContactedIndustryModal
                workpaceId={Number(workplace?.id)}
                onCancel={onCancelClicked}
            />
        )
    }

    const onShowComments = () => {
        setModal(
            <ShowPlacementCommentsModal
                onCancel={onCancelClicked}
                warnings={appliedIndustry?.workplaceRequest?.warnings}
            />
        )
    }

    const onViewOnMap = () => {
        setModal(
            <div
                className={`bg-[#00000050] ${
                    contextBar.isVisible ? 'w-[calc(100%-321px)]' : 'w-full'
                } h-screen flex items-center justify-center gap-x-2 fixed top-0 left-0 px-2 z-40`}
            >
                <div
                    className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:min-w-[420px]"
                    style={{ zIndex: 111 }}
                >
                    <ViewOnMapIndustriesModal
                        workplace={{ ...workplace, student }}
                        courseId={course?.id}
                        onCancel={onCancelClicked}
                        appliedIndustry={appliedIndustry}
                        suggestedIndustries={suggestedIndustries}
                    />
                </div>
                <div
                    className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:max-w-[388px]"
                    style={{ zIndex: 111 }}
                >
                    <StudentInterviewDetail
                        workplaceId={Number(workplace?.id)}
                    />
                </div>
            </div>
        )
    }
    // useEffect(() => {
    //     if (appliedIndustry && suggestedIndustries?.length) {
    //         onCancelClicked()
    //     }
    // }, [appliedIndustry, suggestedIndustries])

    let fileName: any = workplace?.employmentDocument?.file
    // ? workplace?.employmentDocument?.file?.split('\\')
    // : ''
    // if (fileName?.length === 1) {
    //     fileName = workplace?.employmentDocument?.file?.split('/') + ''

    //     if (fileName.length > 1) {
    //         fileName = fileName[fileName?.length - 1]
    //     }
    // }

    const extension = workplace?.employmentDocument?.file
        ?.split('.')
        ?.reverse()?.[0]
    // ?.replaceAll('{"', '')
    // .replaceAll('"}', '')
    // ?.split('.')
    // .reverse()[0]

    const wpDocKeys = {
        [WorkplaceEmploymentDocument.PAY_SLIP]: 'Pay Slip',
        [WorkplaceEmploymentDocument.EMPLOYMENT_CONTRACT]:
            'EMPLOYMENT CONTRACT',
    }

    const subadmin = useSubadminProfile()

    return (
        <>
            {modal}
            {documentsViewModal}
            <div className="h-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-between w-full">
                        <Typography variant="small" capitalize semibold>
                            Industry Detail
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-3">
                        {appliedIndustry?.workplaceRequest?.warnings &&
                        appliedIndustry?.workplaceRequest?.warnings?.length >
                            0 ? (
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => {
                                    onShowComments()
                                }}
                            >
                                <IoIosWarning
                                    className="text-primary"
                                    size={20}
                                />
                                <Tooltip>Placement Comments</Tooltip>
                            </div>
                        ) : null}
                        {appliedIndustry?.AgreementSigned && (
                            <AgreementView workplace={workplace} />
                        )}
                        <AuthorizedUserComponent
                            roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        >
                            <Typography variant={'small'} color={'text-info'}>
                                <span
                                    className="font-semibold cursor-pointer whitespace-pre"
                                    onClick={() => {
                                        if (
                                            role === UserRoles.ADMIN ||
                                            !appliedIndustry ||
                                            subadmin?.departmentMember?.isHod ||
                                            subadmin?.isManager
                                        ) {
                                            onViewContactedIndustries()
                                        } else {
                                            notification.warning({
                                                title: 'Already Applied',
                                                description:
                                                    'Student have already applied to industry',
                                            })
                                        }
                                    }}
                                >
                                    View Contacted Industry
                                </span>
                            </Typography>
                        </AuthorizedUserComponent>
                        {!appliedIndustry &&
                        !workplace?.byExistingAbn &&
                        !workplace?.studentProvidedWorkplace &&
                        role !== UserRoles.RTO ? (
                            <>
                                {/* <Typography
                                    variant={'small'}
                                    color={'text-info'}
                                >
                                    <span
                                        className="font-semibold cursor-pointer whitespace-pre"
                                        onClick={() => {
                                            if (!appliedIndustry) {
                                                onViewMoreIndustries()
                                            } else {
                                                notification.warning({
                                                    title: 'Already Applied',
                                                    description:
                                                        'Student have already applied to industry',
                                                })
                                            }
                                        }}
                                    >
                                        View More Industry
                                    </span>
                                </Typography> */}
                                {process.env.NODE_ENV === 'development' ? (
                                    <Typography
                                        variant={'small'}
                                        color={'text-info'}
                                    >
                                        <span
                                            className="font-semibold cursor-pointer whitespace-pre"
                                            onClick={() => {
                                                if (!appliedIndustry) {
                                                    contextBar.setContent(
                                                        <AddIndustryCB
                                                            studentId={
                                                                student?.id
                                                            }
                                                            workplaceId={
                                                                workplace?.id
                                                            }
                                                            courseId={
                                                                course?.id
                                                            }
                                                        />
                                                    )
                                                    contextBar.show()
                                                } else {
                                                    notification.warning({
                                                        title: 'Already Applied',
                                                        description:
                                                            'Student have already applied to industry',
                                                    })
                                                }
                                            }}
                                        >
                                            + Add Industry
                                        </span>
                                    </Typography>
                                ) : null}
                                {/* <button
                                    onClick={onViewOnMap}
                                    className="text-blue-500 underline text-sm whitespace-nowrap"
                                >
                                    VIEW ON MAP
                                </button> */}
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="h-48 overflow-auto custom-scrollbar flex flex-col gap-y-2 border border-[#6B7280] rounded-md  mt-2.5">
                    {!appliedIndustry ? (
                        // <div onClick={onViewOnMap}>

                        //     <ViewOnMapIndustriesModal
                        //         suggestedIndustries={suggestedIndustries}
                        //         onCancel={onCancelClicked}
                        //         workplace={workplace}
                        //         courseId={course?.id}
                        //     />
                        // </div>
                        // <button
                        //     onClick={onViewOnMap}
                        //     className="text-blue-500 underline text-sm whitespace-nowrap"
                        // >
                        //     VIEW ON MAP
                        // </button>
                        <div className="relative w-full h-full">
                            {workplace?.currentStatus ===
                            WorkplaceCurrentStatus.AwaitingRtoResponse ? (
                                <Card noPadding fullHeight>
                                    <div className="flex justify-center items-center bg-yellow-100 p-5">
                                        <Typography
                                            variant="label"
                                            bold
                                            uppercase
                                        >
                                            Waiting For Rto to Approve the
                                            Industry
                                        </Typography>
                                    </div>
                                </Card>
                            ) : (
                                <div className="px-4 absolute top-0 left-0 w-full h-full bg-[#00000095] flex flex-col gap-y-1.5 justify-center">
                                    <AuthorizedUserComponent
                                        excludeRoles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        <Typography
                                            variant="small"
                                            color={'text-white'}
                                            center
                                        >
                                            Click here to view nearby industries
                                            on the map, facilitating your search
                                            for potential workplaces to apply
                                            for student.
                                        </Typography>
                                    </AuthorizedUserComponent>
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        <Typography
                                            variant="small"
                                            color={'text-white'}
                                            center
                                        >
                                            Skiltrak coordinators are actively
                                            working to find the best suitable
                                            workplace for student. Thank you
                                            for your patience!
                                        </Typography>{' '}
                                    </AuthorizedUserComponent>
                                    <AuthorizedUserComponent
                                        excludeRoles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        <p
                                            className={
                                                'underline text-white text-center text-[15px] cursor-pointer'
                                            }
                                            onClick={() => {
                                                onViewOnMap()
                                            }}
                                        >
                                            VIEW MAP
                                        </p>
                                    </AuthorizedUserComponent>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-2.5">
                            {!wpIndustriesLength ? (
                                <NoData text="No Industries were found!" />
                            ) : (
                                ''
                            )}
                            {appliedIndustry && (
                                <>
                                    <IndustryCard
                                        industry={appliedIndustry}
                                        workplace={workplace}
                                        applied
                                        student={student}
                                        courseId={course?.id}
                                    />
                                    {/*  */}
                                    <AuthorizedUserComponent
                                        excludeRoles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        {workplace.studentProvidedWorkplace ? (
                                            <StudentProvidedActions
                                                workplace={workplace}
                                                student={student}
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                                courses={
                                                    workplace?.courses as Course[]
                                                }
                                            />
                                        ) : workplace?.byExistingAbn ? (
                                            <StudentProvidedABNActions
                                                workplace={workplace}
                                                student={student}
                                                courses={
                                                    workplace?.courses as Course[]
                                                }
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                            />
                                        ) : (
                                            <Actions
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                                currentStatus={
                                                    workplace?.currentStatus
                                                }
                                                student={student}
                                                courses={
                                                    workplace?.courses as Course[]
                                                }
                                                workplace={workplace}
                                            />
                                        )}
                                    </AuthorizedUserComponent>

                                    {workplace?.employmentDocument ? (
                                        <div className="mt-3">
                                            <Typography variant="small" bold>
                                                Document Uploaded By Student
                                            </Typography>

                                            <div className="cursor-pointer relative w-fit file-view-group ">
                                                <div
                                                    className={` basis-1/6 border rounded py-2 px-1.5 bg-blue-100`}
                                                    onClick={() => {
                                                        onFileClicked({
                                                            ...workplace?.employmentDocument,
                                                            showEdit: false,
                                                            file: workplace?.employmentDocument?.file
                                                                .replaceAll(
                                                                    '{"',
                                                                    ''
                                                                )
                                                                .replaceAll(
                                                                    '"}',
                                                                    ''
                                                                ),
                                                            extension,
                                                            type: 'all',
                                                        })
                                                    }}
                                                >
                                                    {workplace
                                                        ?.employmentDocument
                                                        ?.file && (
                                                        <div className="relative w-full min-h-[40px] flex flex-col gap-y-1.5">
                                                            {/* Video Preview */}
                                                            {getDocType(
                                                                'video'
                                                            )?.includes(
                                                                extension + ''
                                                            ) && (
                                                                // Preview Video
                                                                <div className="bg-black w-24 h-24 overflow-hidden">
                                                                    <div className="w-full h-full">
                                                                        <VideoPreview
                                                                            url={
                                                                                workplace
                                                                                    ?.employmentDocument
                                                                                    ?.file
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {/* PDF Preview */}
                                                            {getDocType(
                                                                'docs'
                                                            )?.includes(
                                                                extension + ''
                                                            ) && (
                                                                <div className=" h-full flex justify-center items-center w-full text-gray-500">
                                                                    <IoMdDocument className="text-3xl text-gray" />
                                                                </div>
                                                            )}
                                                            {/* Image Preview */}
                                                            {getDocType(
                                                                'images'
                                                            )?.includes(
                                                                extension + ''
                                                            ) && (
                                                                <div className="w-full h-[50px] relative">
                                                                    <Image
                                                                        src={
                                                                            workplace
                                                                                ?.employmentDocument
                                                                                ?.file
                                                                        }
                                                                        alt={''}
                                                                        width={
                                                                            50
                                                                        }
                                                                        height={
                                                                            50
                                                                        }
                                                                        // fill
                                                                        className="object-cover"
                                                                        blurDataURL={
                                                                            '/images/blur_image.png'
                                                                        }
                                                                        placeholder="blur"
                                                                    />
                                                                </div>
                                                            )}

                                                            <Typography
                                                                variant="xxs"
                                                                medium
                                                                uppercase
                                                            >
                                                                {
                                                                    wpDocKeys[
                                                                        workplace
                                                                            ?.employmentDocument
                                                                            ?.key as keyof typeof wpDocKeys
                                                                    ]
                                                                }
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {approvalDate ? (
                                        <div className="mt-3 w-fit">
                                            <Typography
                                                variant="xs"
                                                color={'text-gray-600'}
                                            >
                                                Student has accepted the
                                                industry approval request and
                                                requested an appointment for
                                            </Typography>
                                            <div className="w-fit">
                                                <AvailabelMeetingDate
                                                    date={approvalDate}
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                    {appliedIndustry &&
                                        student &&
                                        appliedIndustry?.industry?.location &&
                                        student?.location && (
                                            <div className="mt-2">
                                                <WorkplaceMapBoxView
                                                    industryLocation={appliedIndustry?.industry?.location?.split(
                                                        ','
                                                    )}
                                                    studentLocation={student?.location?.split(
                                                        ','
                                                    )}
                                                    workplaceName={
                                                        appliedIndustry
                                                            ?.industry?.user
                                                            ?.name
                                                    }
                                                    showMap={
                                                        !!appliedIndustry
                                                            ?.industry
                                                            ?.location &&
                                                        !!student?.location
                                                    }
                                                />
                                            </div>
                                        )}
                                </>
                            )}

                            {suggestedIndustries?.map(
                                (industry: any, index: number) => (
                                    <IndustryCard
                                        key={industry?.id}
                                        student={student}
                                        industry={industry}
                                        workplace={workplace}
                                        courseId={course?.id}
                                        appliedIndustry={appliedIndustry}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
