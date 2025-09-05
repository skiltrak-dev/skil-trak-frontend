import {
    AuthorizedUserComponent,
    Card,
    GlobalModal,
    InitialAvatar,
    NoData,
    Tooltip,
    Typography,
    VideoPreview,
} from '@components'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { UserRoles } from '@constants'
import { useContextBar, useNotification, useSubadminProfile } from '@hooks'
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
import { useAssessmentDocumentsView } from '../../../AssessmentsSubmission'
import {
    ShowPlacementCommentsModal,
    ViewContactedIndustryModal,
    WPProcessingListModal,
} from '../../modals'
import { AgreementView } from '../AgreementView'

import { ContactHistory, IndustryCard } from './components'
import { MapModal } from './components/MapModal'
import { StudentProvidedABNActions } from './StudentProvidedABNActions'
import { StudentProvidedActions } from './StudentProvidedActions'

import { Actions } from './Actions'
import { MdCancel } from 'react-icons/md'

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
    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const contextBar = useContextBar()
    const { notification } = useNotification()
    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const role = getUserCredentials()?.role
    const suggestedIndustries = workplace?.industries?.filter(
        (i: any) => !i.applied
    )

    const industry = workplace?.workplaceApprovaleRequest?.[0]?.industry

    const onCancelClicked = () => setModal(null)

    // TODO : When user copy the listing industry phone number track it in contacted history and make a separate tab in modal like From Listing Industries
    const onViewContactedIndustries = () => {
        setModal(
            <GlobalModal>
                {/* <ViewContactedIndustryModal
                workpaceId={Number(workplace?.id)}
                onCancel={onCancelClicked}
            /> */}
                <div className="flex justify-end">
                    <button
                        onClick={onCancelClicked}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        title="Close modal"
                    >
                        <MdCancel className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
                <ContactHistory wpId={workplace?.id} />
            </GlobalModal>
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
            // <div
            //     className={`bg-[#00000050] ${
            //         contextBar.isVisible ? 'w-[calc(100%-321px)]' : 'w-full'
            //     } h-screen flex items-center justify-center gap-x-2 fixed top-0 left-0 px-2 z-40`}
            // >
            //     <div
            //         className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:max-w-[320px]"
            //         style={{ zIndex: 111 }}
            //     >
            //         <ViewOnMapIndustriesModal
            //             workplace={{ ...workplace, student }}
            //             courseId={course?.id}
            //             onCancel={onCancelClicked}
            //             appliedIndustry={appliedIndustry}
            //             suggestedIndustries={suggestedIndustries}
            //             setSelectedBox={setSelectedBox}
            //             selectedBox={selectedBox}
            //         />
            //     </div>
            //     <div
            //         className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-[900px]"
            //         style={{ zIndex: 111 }}
            //     >
            //         <OnViewMapTabs
            //             workplaceId={workplace?.id}
            //             selectedBox={selectedBox}
            //         />
            //     </div>
            // </div>
            <MapModal
                workplace={{ ...workplace, student }}
                courseId={course?.id}
                onCancel={onCancelClicked}
                appliedIndustry={appliedIndustry}
                suggestedIndustries={suggestedIndustries}
                setSelectedBox={setSelectedBox}
                selectedBox={selectedBox}
                student={student}
                course={course}
            />
        )
    }

    const extension = workplace?.employmentDocument?.file
        ?.split('.')
        ?.reverse()?.[0]

    const wpDocKeys = {
        [WorkplaceEmploymentDocument.PAY_SLIP]: 'Pay Slip',
        [WorkplaceEmploymentDocument.EMPLOYMENT_CONTRACT]:
            'EMPLOYMENT CONTRACT',
    }

    const subadmin = useSubadminProfile()

    const onProcessMatchingLoader = () => {
        setModal(<WPProcessingListModal onCancel={onCancelClicked} />)
    }

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
                        {/* <div
                            onClick={() => {
                                onProcessMatchingLoader()
                            }}
                        >
                            <Typography
                                semibold
                                cursorPointer
                                variant={'small'}
                                color={'text-info'}
                            >
                                <span className="whitespace-pre hover:underline">
                                    Workplace Process Logs
                                </span>
                            </Typography>
                        </div> */}
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
                            isAssociatedWithRto={false}
                        >
                            <Typography variant={'small'} color={'text-info'}>
                                <span
                                    className="font-semibold cursor-pointer whitespace-pre hover:underline"
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
                                WorkplaceCurrentStatus.IndustryEligibility &&
                            workplace.studentProvidedWorkplace ? (
                                <Card>
                                    <Typography variant="label" center block>
                                        Waiting for HOD to approve the industry
                                        eligibility
                                    </Typography>
                                    <div>
                                        <Typography variant="small" center>
                                            Industry Detail:
                                        </Typography>
                                        <div className="flex items-center justify-center gap-x-2">
                                            {workplace
                                                ?.studentProvidedWorkplaceRequestApproval
                                                ?.industry?.user?.name && (
                                                <InitialAvatar
                                                    name={
                                                        workplace
                                                            ?.studentProvidedWorkplaceRequestApproval
                                                            ?.industry?.user
                                                            ?.name
                                                    }
                                                    imageUrl={
                                                        workplace
                                                            ?.studentProvidedWorkplaceRequestApproval
                                                            ?.industry?.user
                                                            ?.avatar
                                                    }
                                                />
                                            )}
                                            <Typography variant="label" bold>
                                                {
                                                    workplace
                                                        ?.studentProvidedWorkplaceRequestApproval
                                                        ?.industry?.user?.name
                                                }
                                            </Typography>
                                        </div>
                                    </div>
                                </Card>
                            ) : workplace?.currentStatus ===
                              WorkplaceCurrentStatus.AwaitingRtoResponse ? (
                                <Card noPadding fullHeight>
                                    <div className="flex flex-col justify-center items-center bg-yellow-100 p-5">
                                        <Typography
                                            variant="label"
                                            bold
                                            uppercase
                                        >
                                            Waiting For Rto to Approve the
                                            Industry
                                        </Typography>
                                        <div>
                                            <Typography variant="small">
                                                Industry Detail:
                                            </Typography>
                                            <div className="flex items-center justify-center gap-x-2">
                                                {industry?.user?.name && (
                                                    <InitialAvatar
                                                        name={
                                                            industry?.user?.name
                                                        }
                                                        imageUrl={
                                                            industry?.user
                                                                ?.avatar
                                                        }
                                                    />
                                                )}
                                                <Typography
                                                    variant="label"
                                                    bold
                                                >
                                                    {industry?.user?.name}
                                                </Typography>
                                            </div>
                                        </div>
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
                                        <AuthorizedUserComponent
                                            roles={[
                                                UserRoles.ADMIN,
                                                UserRoles.SUBADMIN,
                                            ]}
                                            isAssociatedWithRto={false}
                                        >
                                            <>
                                                <div className="mt-3">
                                                    <Typography
                                                        variant="small"
                                                        bold
                                                    >
                                                        Document Uploaded By
                                                        Student
                                                    </Typography>

                                                    <div className="cursor-pointer relative w-fit file-view-group ">
                                                        <div
                                                            className={` basis-1/6 border rounded py-2 px-1.5 bg-blue-100`}
                                                            onClick={() => {
                                                                onFileClicked({
                                                                    ...workplace?.employmentDocument,
                                                                    showEdit:
                                                                        false,
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
                                                                        extension +
                                                                            ''
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
                                                                        extension +
                                                                            ''
                                                                    ) && (
                                                                        <div className=" h-full flex justify-center items-center w-full text-gray-500">
                                                                            <IoMdDocument className="text-3xl text-gray" />
                                                                        </div>
                                                                    )}
                                                                    {/* Image Preview */}
                                                                    {getDocType(
                                                                        'images'
                                                                    )?.includes(
                                                                        extension +
                                                                            ''
                                                                    ) && (
                                                                        <div className="w-full h-[50px] relative">
                                                                            <Image
                                                                                src={
                                                                                    workplace
                                                                                        ?.employmentDocument
                                                                                        ?.file
                                                                                }
                                                                                alt={
                                                                                    ''
                                                                                }
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
                                            </>
                                        </AuthorizedUserComponent>
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
