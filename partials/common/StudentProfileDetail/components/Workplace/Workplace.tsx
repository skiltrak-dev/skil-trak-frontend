import {
    ActionButton,
    AuthorizedUserComponent,
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import {
    AdminApi,
    SubAdminApi,
    useGetSubAdminStudentWorkplaceDetailQuery,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { FaInfoCircle } from 'react-icons/fa'
import ReactStars from 'react-stars'

import { useWorkplace } from '@hooks'
import { InitiateSigningModal } from '@partials/sub-admin/assessmentEvidence/modal'
import { ForwardModal } from '@partials/sub-admin/workplace/modals'
import { Student } from '@types'
import {
    checkStudentProfileCompletion,
    getUserCredentials,
    WorkplaceCurrentStatus,
} from '@utils'
import moment from 'moment'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri'
import {
    IWorkplaceIndustries,
    WorkplaceWorkIndustriesType,
} from 'redux/queryTypes'
import {
    AddWorkplaceAction,
    CancelledWorkplaceCard,
    ContactPersonDetail,
    IndustryStatus,
    ViewAvailability,
    WorkplaceApprovalReq,
    WorkplaceCoordinators,
    WorkplaceHistory,
    WorkplaceStatusView,
    WorkplaceTab,
} from './components'
import { IndustryDetail } from './components/IndustryDetail'
import {
    AddFeedbackModal,
    BookAppointmentInfoModal,
    CancelWorkplaceModal,
    CancelWorkplaceRequestModal,
    LogbookNotReleasedModal,
    NoLogbookFoundModal,
    ReleaseLogbookModal,
    ShowRejectedRequestModal,
    UpdatePrvWPStatusModal,
    UpdateWorkplaceCourseModal,
    ViewPlacementStartedAnswersModal,
    ViewQuestionsModal,
} from './modals'
import { ChangeStatusModal, paymentStatusData } from '@partials/admin/invoices'

const WPStatusForCancelButon = [
    WorkplaceCurrentStatus.Applied,
    WorkplaceCurrentStatus.Rejected,
    WorkplaceCurrentStatus.Interview,
    WorkplaceCurrentStatus.NoResponse,
    WorkplaceCurrentStatus.AwaitingStudentResponse,
    WorkplaceCurrentStatus.AppointmentBooked,
    WorkplaceCurrentStatus.CaseOfficerAssigned,
    WorkplaceCurrentStatus.AwaitingAgreementSigned,
    WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
]

export const Workplace = ({
    student,
    getWorkplaceLength,
}: {
    getWorkplaceLength: (length: number) => void
    student: Student
}) => {
    // TODO: If student expired, schedule is completed and student is in Incomplete Submission tab, then show Incomplete Submission tag in workplace section
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [selectedWorkplace, setSelectedWorkplace] = useState<any>(null)
    const [showPreviousWorkplace, setShowPreviousWorkplace] = useState(false)

    const { workplaceRto, setWorkplaceRes } = useWorkplace()

    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        student?.id,
        {
            skip: !student,
            refetchOnMountOrArgChange: true,
        }
    )
    const workplaceIndustryDetail = SubAdminApi.Student.workplaceIndustryDetail(
        selectedWorkplace?.id,
        {
            skip: !selectedWorkplace,
            refetchOnMountOrArgChange: true,
        }
    )

    const workplaceStudentDetail = SubAdminApi.Student.workplaceStudentDetail(
        selectedWorkplace?.id,
        {
            skip: !selectedWorkplace,
            refetchOnMountOrArgChange: true,
        }
    )
    const courses = SubAdminApi.Student.useCourses(Number(student?.id), {
        skip: !student?.id,
        refetchOnMountOrArgChange: true,
    })
    const getCancelledWP = SubAdminApi.Student.getCancelledWP(student?.id, {
        skip: !studentWorkplace?.isSuccess || !showPreviousWorkplace,
    })

    const appliedIndustry: WorkplaceWorkIndustriesType =
        workplaceIndustryDetail?.data?.find((i: any) => i.applied)

    const course = selectedWorkplace?.courses?.find((c: any) => c)

    const workplaceFolders = useGetWorkplaceFoldersQuery(
        {
            workplaceId: Number(selectedWorkplace?.id),
            appliedIndustryId: appliedIndustry?.industry?.id,
            courseId: course?.id,
        },
        { skip: !studentWorkplace || !appliedIndustry || !course }
    )
    const wpInvoiceStatus = AdminApi.Invoice.getInvoiceStatus(
        selectedWorkplace?.id,
        {
            skip: !selectedWorkplace,
        }
    )

    const folders = GetFolders(workplaceFolders)

    const sortedWorkplace =
        studentWorkplace?.data && studentWorkplace?.data?.length > 0
            ? [...studentWorkplace?.data].sort((a: any, b: any) => {
                  // Check if either status is "completed"
                  if (
                      a.currentStatus === WorkplaceCurrentStatus.Completed &&
                      b.currentStatus !== WorkplaceCurrentStatus.Completed
                  ) {
                      return 1 // a goes after b
                  }
                  if (
                      a.currentStatus !== WorkplaceCurrentStatus.Completed &&
                      b.currentStatus === WorkplaceCurrentStatus.Completed
                  ) {
                      return -1 // a goes before b
                  }
                  // If neither or both are "completed", sort by createdAt date
                  return Date.parse(a.createdAt) - Date.parse(b.createdAt)
              })
            : []

    useEffect(() => {
        if (sortedWorkplace && sortedWorkplace?.length > 0) {
            setWorkplaceRes(sortedWorkplace)
            getWorkplaceLength(sortedWorkplace?.length)
            setSelectedWorkplace(
                selectedWorkplace
                    ? studentWorkplace?.data?.find(
                          (w: any) => w?.id === selectedWorkplace?.id
                      )
                    : sortedWorkplace?.[0]
            )
        }
        return () => {
            setSelectedWorkplace(null)
        }
    }, [studentWorkplace?.data])

    const excludedRoles = [UserRoles.RTO, UserRoles.OBSERVER]
    const role = getUserCredentials()?.role

    const onCancelModal = () => setModal(null)

    useEffect(() => {
        if (
            selectedWorkplace &&
            appliedIndustry &&
            !appliedIndustry?.awaitingWorkplaceResponseDate &&
            selectedWorkplace?.assignedTo &&
            !selectedWorkplace?.studentProvidedWorkplace &&
            !excludedRoles.includes(role)
        ) {
            const onForwardClicked = () => {
                setModal(
                    <ForwardModal
                        industry={appliedIndustry}
                        workplaceId={selectedWorkplace?.id}
                        onCancel={() => onCancelModal()}
                    />
                )
            }
            onForwardClicked()
        }
    }, [selectedWorkplace, appliedIndustry])

    useEffect(() => {
        if (
            selectedWorkplace &&
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AgreementSigned &&
            !selectedWorkplace?.studentFeedBack &&
            appliedIndustry &&
            role === UserRoles.ADMIN &&
            role === UserRoles.SUBADMIN
        )
            setModal(
                <AddFeedbackModal
                    onCancel={onCancelModal}
                    id={appliedIndustry?.id}
                    agreementSigned={appliedIndustry?.AgreementSigned}
                    student={student}
                    course={selectedWorkplace?.courses?.[0]}
                    wpId={selectedWorkplace?.id}
                    industryId={appliedIndustry?.industry?.id}
                    isStartPlacement={false}
                />
            )
    }, [selectedWorkplace, appliedIndustry])

    useEffect(() => {
        if (
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AwaitingWorkplaceResponse &&
            !workplaceStudentDetail?.data?.appointmentBooked &&
            workplaceStudentDetail?.isSuccess &&
            !workplaceStudentDetail?.isLoading &&
            !workplaceStudentDetail?.isFetching &&
            role === UserRoles.ADMIN &&
            role === UserRoles.SUBADMIN
        ) {
            setModal(
                <BookAppointmentInfoModal
                    onCancel={onCancelModal}
                    courseId={selectedWorkplace?.courses?.[0]?.id}
                    studentUser={workplaceStudentDetail?.data?.user?.id}
                    approvalDate={latestWorkplaceApprovaleRequest?.approvalDate}
                />
            )
        }
    }, [
        selectedWorkplace,
        workplaceStudentDetail,
        workplaceStudentDetail?.data?.appointmentBooked,
    ])

    useEffect(() => {
        if (
            workplaceStudentDetail?.isSuccess &&
            !workplaceStudentDetail?.data?.agreementSigned &&
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AwaitingAgreementSigned &&
            role === UserRoles.ADMIN &&
            role === UserRoles.SUBADMIN
        ) {
            const onInitiateSigning = () => {
                setModal(
                    <InitiateSigningModal
                        onCancel={() => {
                            onCancelModal()
                        }}
                        courseId={selectedWorkplace?.courses[0]?.id}
                        rto={workplaceStudentDetail?.data?.student?.rto}
                        folder={
                            selectedWorkplace?.courses[0]
                                ?.assessmentEvidence?.[0]
                        }
                    />
                )
            }
            onInitiateSigning()
        }
    }, [selectedWorkplace, workplaceStudentDetail])

    useEffect(() => {
        if (
            selectedWorkplace &&
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.PlacementStarted &&
            !selectedWorkplace?.isLogBookReleased &&
            workplaceStudentDetail?.data?.rto?.assessmentTools?.length > 0 &&
            workplaceStudentDetail?.data &&
            workplaceStudentDetail?.data?.rto?.autoReleaseLogBook
        ) {
            setModal(
                <LogbookNotReleasedModal
                    onCancel={onCancelModal}
                    rto={workplaceStudentDetail?.data?.rto}
                    selectedWorkplaceId={selectedWorkplace?.id}
                />
            )
        }
    }, [selectedWorkplace, workplaceStudentDetail?.data])

    useEffect(() => {
        if (
            selectedWorkplace &&
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AgreementSigned &&
            !selectedWorkplace?.isLogBookReleased &&
            workplaceStudentDetail?.data?.rto?.assessmentTools?.length > 0 &&
            workplaceStudentDetail?.data &&
            workplaceStudentDetail?.data?.rto?.autoReleaseLogBook
        ) {
            setModal(
                <ReleaseLogbookModal
                    onCancel={onCancelModal}
                    selectedWorkplaceId={selectedWorkplace?.id}
                    rto={workplaceStudentDetail?.data?.rto}
                    course={selectedWorkplace?.courses?.[0]}
                />
            )
        }
    }, [selectedWorkplace, workplaceStudentDetail?.data])

    useEffect(() => {
        if (
            selectedWorkplace &&
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AgreementSigned &&
            !selectedWorkplace?.isLogBookReleased &&
            !workplaceStudentDetail?.data?.rto?.assessmentTools?.length &&
            workplaceStudentDetail?.data &&
            workplaceStudentDetail?.data?.rto?.autoReleaseLogBook
        ) {
            setModal(
                <NoLogbookFoundModal
                    onCancel={onCancelModal}
                    rto={workplaceStudentDetail?.data?.rto?.user?.name}
                    course={selectedWorkplace?.courses?.[0]?.title}
                />
            )
        }
    }, [selectedWorkplace, workplaceStudentDetail?.data])

    const onUpdateWorkplaceCourseClicked = (
        courseId: number,
        workplaceId: number
    ) => {
        setModal(
            <UpdateWorkplaceCourseModal
                onCancel={onCancelModal}
                {...{ courseId, workplaceId }}
            />
        )
    }

    const onViewWorkplaceQuestions = (wpId: number) => {
        setModal(
            <ViewQuestionsModal
                onCancel={() => {
                    onCancelModal()
                }}
                wpId={wpId}
            />
        )
    }

    const onViewPlacementStartedAnswers = (wpId: number) => {
        setModal(
            <ViewPlacementStartedAnswersModal
                onCancel={() => {
                    onCancelModal()
                }}
                wpId={wpId}
            />
        )
    }

    const onShowRejectedRequestModal = (content: string) => {
        setModal(
            <ShowRejectedRequestModal
                onCancel={() => {
                    onCancelModal()
                }}
                content={content}
            />
        )
    }

    const ignoreCompletedWP = studentWorkplace?.data?.filter(
        (wp: IWorkplaceIndustries) =>
            wp?.currentStatus !== WorkplaceCurrentStatus.Completed
    )

    const firstWorkplaceCurrentStatus = ignoreCompletedWP?.[0]?.currentStatus

    const values = {
        ...student,
        ...student?.user,
        courses: courses?.data,
        rto: workplaceRto,
    }

    // const keys = Object.keys(values)

    // useEffect(() => {
    //  setModal(
    //     <ReleaseLogbookModal
    //  )
    // }, [])

    const profileCompletion = checkStudentProfileCompletion(values)

    const onCancelWPClicked = () => {
        setModal(
            <CancelWorkplaceModal
                onCancel={onCancelModal}
                workplaceId={selectedWorkplace?.id}
            />
        )
    }
    const onCancelWPRequestClicked = () => {
        setModal(
            <CancelWorkplaceRequestModal
                onCancel={onCancelModal}
                workplaceId={selectedWorkplace?.id}
            />
        )
    }

    const latestWorkplaceApprovaleRequest = useMemo(() => {
        return selectedWorkplace?.workplaceApprovaleRequest?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            selectedWorkplace?.workplaceApprovaleRequest?.[0]
        )
    }, [selectedWorkplace?.workplaceApprovaleRequest])

    const togglePreviousWorkplace = () => {
        setShowPreviousWorkplace(!showPreviousWorkplace)
    }

    const onStatusChangeClicked = (id: number) => {
        setModal(<ChangeStatusModal onCancel={onCancelModal} id={id} />)
    }
    return (
        <>
            {modal}
            <Card noPadding fullHeight>
                <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                    <Typography variant="label" semibold>
                        Workplace
                        <span className="text-xs text-gray-500 font-normal">
                            {selectedWorkplace
                                ? selectedWorkplace?.studentProvidedWorkplace ||
                                  selectedWorkplace?.byExistingAbn
                                    ? '- Student Provided Workplace'
                                    : '- Requested Workplace'
                                : null}
                        </span>
                    </Typography>
                    <div className="flex items-center gap-x-2">
                        <div>
                            {/* {getCancelledWP?.data &&
                                getCancelledWP?.data?.length > 0 && ( */}
                            <Button
                                text={
                                    showPreviousWorkplace
                                        ? 'Current WP'
                                        : 'Cancelled WP'
                                }
                                variant={
                                    showPreviousWorkplace ? 'success' : 'error'
                                }
                                onClick={togglePreviousWorkplace}
                            />
                            {/* )} */}
                        </div>
                        <AuthorizedUserComponent
                            roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        >
                            <div>
                                {selectedWorkplace
                                    ? !selectedWorkplace?.studentProvidedWorkplace &&
                                      !selectedWorkplace?.byExistingAbn &&
                                      selectedWorkplace?.questions > 0 && (
                                          <ActionButton
                                              variant={'link'}
                                              onClick={() => {
                                                  onViewWorkplaceQuestions(
                                                      selectedWorkplace?.id
                                                  )
                                              }}
                                          >
                                              View Answers
                                          </ActionButton>
                                      )
                                    : null}
                            </div>
                        </AuthorizedUserComponent>
                        {ignoreCompletedWP &&
                        ignoreCompletedWP?.length === 1 ? (
                            <div className="">
                                <AuthorizedUserComponent
                                    roles={[UserRoles.SUBADMIN]}
                                >
                                    <AddWorkplaceAction
                                        id={student?.id}
                                        profileCompletion={100}
                                        text={'Add Another WP'}
                                        onButtonClick={() => {
                                            if (
                                                [
                                                    WorkplaceCurrentStatus.PlacementStarted,
                                                    WorkplaceCurrentStatus.Completed,
                                                ].includes(
                                                    firstWorkplaceCurrentStatus
                                                )
                                            ) {
                                                return false
                                            } else {
                                                setModal(
                                                    <UpdatePrvWPStatusModal
                                                        onCancel={() => {
                                                            onCancelModal()
                                                        }}
                                                    />
                                                )
                                                return true
                                            }
                                        }}
                                    />
                                </AuthorizedUserComponent>
                                {/* <Button
                                    onClick={() => {
                                        if (
                                            firstWorkplaceCurrentStatus ===
                                            WorkplaceCurrentStatus.PlacementStarted
                                        ) {
                                            contextBar.setContent(
                                                <AddSecondWPCB
                                                    studentId={student?.id}
                                                    studentUserId={
                                                        student?.user?.id
                                                    }
                                                />
                                            )
                                            contextBar.show(false)
                                        } else {
                                            setModal(
                                                <UpdatePrvWPStatusModal
                                                    onCancel={() => {
                                                        onCancelModal()
                                                    }}
                                                />
                                            )
                                        }
                                    }}
                                >
                                    Add Another Workplace
                                </Button> */}
                            </div>
                        ) : null}
                        {!ignoreCompletedWP?.length ? (
                            <AuthorizedUserComponent
                                roles={[UserRoles.SUBADMIN]}
                            >
                                <AddWorkplaceAction
                                    text="Add WP"
                                    id={student?.id}
                                    profileCompletion={profileCompletion}
                                />
                            </AuthorizedUserComponent>
                        ) : null}
                    </div>
                </div>

                {studentWorkplace?.isLoading ? (
                    <LoadingAnimation />
                ) : studentWorkplace?.data &&
                  studentWorkplace?.data?.length > 0 &&
                  !showPreviousWorkplace ? (
                    <>
                        {studentWorkplace?.data &&
                            studentWorkplace?.data?.length > 1 && (
                                <div className="border-b border-secondary-dark p-4 flex items-center gap-x-2.5 cursor-pointer">
                                    {sortedWorkplace?.map(
                                        (workplace: any, i: number) => (
                                            <WorkplaceTab
                                                index={i}
                                                key={workplace.id}
                                                active={
                                                    selectedWorkplace?.id ===
                                                    workplace?.id
                                                }
                                                onClick={() => {
                                                    setSelectedWorkplace(
                                                        workplace
                                                    )
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        {/*  */}
                        {studentWorkplace.isError ? (
                            <TechnicalError height="h-64" description={false} />
                        ) : null}
                        {studentWorkplace?.isLoading ? (
                            <div className="flex flex-col items-center justify-center h-60">
                                <LoadingAnimation size={60} />
                                <Typography variant="label">
                                    Workplace Loading...
                                </Typography>
                            </div>
                        ) : studentWorkplace?.data &&
                          studentWorkplace?.data?.length > 0 &&
                          studentWorkplace?.isSuccess ? (
                            latestWorkplaceApprovaleRequest &&
                            latestWorkplaceApprovaleRequest?.status ===
                                'pending' &&
                            workplaceStudentDetail?.isSuccess ? (
                                <>
                                    <div className="h-[380px] overflow-auto custom-scrollbar">
                                        <WorkplaceApprovalReq
                                            wpReqApproval={{
                                                ...latestWorkplaceApprovaleRequest,
                                                student: {
                                                    location:
                                                        workplaceStudentDetail
                                                            ?.data?.location,
                                                },
                                            }}
                                            coordinator={
                                                selectedWorkplace?.assignedTo
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-2">
                                        {!selectedWorkplace?.cancelledRequests
                                            ?.length ? (
                                            <div className="px-3 mt-1">
                                                <AuthorizedUserComponent
                                                    roles={[UserRoles.ADMIN]}
                                                >
                                                    <ActionButton
                                                        variant={'error'}
                                                        onClick={async () => {
                                                            onCancelWPClicked()
                                                        }}
                                                    >
                                                        Cancel Request
                                                    </ActionButton>
                                                </AuthorizedUserComponent>
                                                <AuthorizedUserComponent
                                                    roles={[UserRoles.SUBADMIN]}
                                                >
                                                    <ActionButton
                                                        variant={'error'}
                                                        onClick={async () => {
                                                            onCancelWPRequestClicked()
                                                        }}
                                                    >
                                                        Cancel Request
                                                    </ActionButton>
                                                </AuthorizedUserComponent>
                                            </div>
                                        ) : (
                                            <div className="w-64 px-3 mt-1">
                                                <Badge
                                                    variant="warning"
                                                    text="WP Cancelation Request Sent to Admin, wait for APPROVAL!"
                                                />
                                            </div>
                                        )}
                                        <Typography variant="small" medium>
                                            Recieved On:{' '}
                                            {moment(
                                                selectedWorkplace?.createdAt
                                            ).format('Do MMM, YYYY')}
                                        </Typography>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <div className="pt-2.5 pb-1 px-4 border-b border-secondary-dark flex flex-col lg:flex-row justify-between gap-x-4">
                                        <IndustryStatus
                                            folders={folders}
                                            workplace={selectedWorkplace}
                                            appliedIndustry={appliedIndustry}
                                            student={
                                                workplaceStudentDetail?.data
                                            }
                                        />

                                        <div className="w-full">
                                            <div className="flex justify-end divide-x-2 ">
                                                <AuthorizedUserComponent
                                                    excludeRoles={[
                                                        UserRoles.OBSERVER,
                                                    ]}
                                                >
                                                    <ContactPersonDetail
                                                        appliedIndustry={
                                                            appliedIndustry
                                                        }
                                                    />
                                                </AuthorizedUserComponent>
                                                <WorkplaceHistory
                                                    wpId={selectedWorkplace?.id}
                                                />
                                                <div className="">
                                                    <ViewAvailability
                                                        wpId={
                                                            selectedWorkplace?.id
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <WorkplaceStatusView
                                                currentStatus={
                                                    selectedWorkplace?.currentStatus
                                                }
                                            />
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-x-2">
                                                    <Typography
                                                        variant="xs"
                                                        semibold
                                                    >
                                                        Course :{' '}
                                                    </Typography>
                                                    <div className="flex items-center gap-x-1">
                                                        <div>
                                                            <Typography variant="xs">
                                                                {
                                                                    selectedWorkplace
                                                                        ?.courses?.[0]
                                                                        ?.code
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                semibold
                                                            >
                                                                {
                                                                    selectedWorkplace
                                                                        ?.courses?.[0]
                                                                        ?.title
                                                                }
                                                            </Typography>
                                                        </div>
                                                        <AuthorizedUserComponent
                                                            roles={[
                                                                UserRoles.ADMIN,
                                                            ]}
                                                        >
                                                            <ActionButton
                                                                Icon={
                                                                    RiPencilFill
                                                                }
                                                                mini
                                                                rounded
                                                                variant="info"
                                                                onClick={() =>
                                                                    onUpdateWorkplaceCourseClicked(
                                                                        selectedWorkplace
                                                                            ?.courses?.[0]
                                                                            ?.id,
                                                                        selectedWorkplace?.id
                                                                    )
                                                                }
                                                            />
                                                        </AuthorizedUserComponent>
                                                    </div>
                                                </div>
                                                {/*  */}
                                                {wpInvoiceStatus?.data && (
                                                    <AuthorizedUserComponent
                                                        excludeRoles={[
                                                            UserRoles.OBSERVER,
                                                        ]}
                                                    >
                                                        {wpInvoiceStatus?.data
                                                            ?.paymentStatus ? (
                                                            <div className="flex gap-x-2">
                                                                <Typography
                                                                    variant="xs"
                                                                    color={
                                                                        'text-gray-500'
                                                                    }
                                                                    medium
                                                                >
                                                                    Invoice
                                                                    Status :
                                                                </Typography>
                                                                <Badge
                                                                    text={
                                                                        paymentStatusData(
                                                                            wpInvoiceStatus
                                                                                ?.data
                                                                                ?.paymentStatus
                                                                        )
                                                                            ?.text +
                                                                        ''
                                                                    }
                                                                    variant={
                                                                        'error'
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <ActionButton
                                                                variant="info"
                                                                simple
                                                                onClick={() => {
                                                                    onStatusChangeClicked(
                                                                        selectedWorkplace?.id
                                                                    )
                                                                }}
                                                            >
                                                                Change Invoice
                                                                Status
                                                            </ActionButton>
                                                        )}
                                                    </AuthorizedUserComponent>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/*  */}
                                    <div className="p-4 grid grid-cols-1 lg:grid-cols-10 gap-y-4 gap-x-3 border-b border-secondary-dark">
                                        <div className="lg:col-span-3 h-full">
                                            <WorkplaceCoordinators
                                                appliedIndustryId={
                                                    appliedIndustry?.id
                                                }
                                                workplace={selectedWorkplace}
                                            />
                                        </div>
                                        <div className="lg:col-span-7 h-full">
                                            <IndustryDetail
                                                workplace={selectedWorkplace}
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                                wpIndustriesLength={
                                                    workplaceIndustryDetail
                                                        ?.data?.length
                                                }
                                                student={
                                                    workplaceStudentDetail?.data
                                                }
                                                course={course}
                                                approvalDate={
                                                    latestWorkplaceApprovaleRequest?.approvalDate
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-4">
                                        <div className="flex items-center gap-x-2.5">
                                            {WPStatusForCancelButon.includes(
                                                selectedWorkplace?.currentStatus
                                            ) ? (
                                                !selectedWorkplace
                                                    ?.cancelledRequests
                                                    ?.length ? (
                                                    <>
                                                        <AuthorizedUserComponent
                                                            roles={[
                                                                UserRoles.ADMIN,
                                                            ]}
                                                        >
                                                            <ActionButton
                                                                variant={
                                                                    'error'
                                                                }
                                                                onClick={async () => {
                                                                    onCancelWPClicked()
                                                                    // await cancelWorkplace(
                                                                    //     Number(
                                                                    //         selectedWorkplace?.id
                                                                    //     )
                                                                    // )
                                                                }}
                                                            >
                                                                Cancel Request
                                                            </ActionButton>
                                                        </AuthorizedUserComponent>
                                                        <AuthorizedUserComponent
                                                            roles={[
                                                                UserRoles.SUBADMIN,
                                                            ]}
                                                        >
                                                            <ActionButton
                                                                variant={
                                                                    'error'
                                                                }
                                                                onClick={async () => {
                                                                    onCancelWPRequestClicked()
                                                                    // await cancelWorkplace(
                                                                    //     Number(
                                                                    //         selectedWorkplace?.id
                                                                    //     )
                                                                    // )
                                                                }}
                                                            >
                                                                Cancel Request
                                                            </ActionButton>
                                                        </AuthorizedUserComponent>
                                                    </>
                                                ) : (
                                                    <div className="w-56">
                                                        <Badge
                                                            variant="warning"
                                                            text="WP Cancelation Request Sent to Admin, wait for APPROVAL!"
                                                        />
                                                    </div>
                                                )
                                            ) : null}
                                            {latestWorkplaceApprovaleRequest?.status ===
                                            'rejected' ? (
                                                <div className="w-48 flex items-center gap-x-2">
                                                    <Typography
                                                        variant="xs"
                                                        color={
                                                            'text-error-dark'
                                                        }
                                                    >
                                                        Workplace Approval
                                                        Request was cancelled by
                                                        student
                                                    </Typography>
                                                    <div>
                                                        <FaInfoCircle
                                                            onClick={() => {
                                                                onShowRejectedRequestModal(
                                                                    latestWorkplaceApprovaleRequest?.comment
                                                                )
                                                            }}
                                                            className="text-error-dark cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                            {selectedWorkplace
                                                ? selectedWorkplace?.studentFeedBack >
                                                      0 && (
                                                      <>
                                                          <ActionButton
                                                              variant={'link'}
                                                              onClick={() => {
                                                                  onViewPlacementStartedAnswers(
                                                                      selectedWorkplace?.id
                                                                  )
                                                              }}
                                                          >
                                                              Coordinators
                                                              Feedback
                                                          </ActionButton>
                                                          <div className="flex items-center gap-x-1">
                                                              <div className="flex items-center gap-x-2">
                                                                  <ReactStars
                                                                      count={5}
                                                                      value={
                                                                          selectedWorkplace
                                                                              ?.studentFeedBacks?.[0]
                                                                              ?.rating
                                                                      }
                                                                      edit={
                                                                          false
                                                                      }
                                                                      size={27}
                                                                      color2={
                                                                          '#ffd700'
                                                                      }
                                                                  />
                                                                  <Typography variant="label">
                                                                      {
                                                                          selectedWorkplace
                                                                              ?.studentFeedBacks?.[0]
                                                                              ?.rating
                                                                      }
                                                                  </Typography>
                                                              </div>
                                                          </div>
                                                      </>
                                                  )
                                                : null}
                                        </div>
                                        <Typography variant="small" medium>
                                            Recieved On:{' '}
                                            {moment(
                                                selectedWorkplace?.createdAt
                                            ).format('Do MMM, YYYY')}
                                        </Typography>
                                    </div>
                                </div>
                            )
                        ) : (
                            studentWorkplace?.isSuccess && (
                                <EmptyData
                                    imageUrl={'/images/workplace/icon.png'}
                                    title="No Workplace Found"
                                    description="Add a workplace to view workplace here"
                                    height="40vh"
                                />
                            )
                        )}
                    </>
                ) : (
                    studentWorkplace?.isSuccess &&
                    !showPreviousWorkplace && (
                        <EmptyData
                            imageUrl={'/images/workplace/icon.png'}
                            title="No Workplace Found"
                            description="Add a workplace to view workplace here"
                            height="40vh"
                        />
                    )
                )}

                {showPreviousWorkplace ? (
                    getCancelledWP?.data && getCancelledWP?.data?.length > 0 ? (
                        <div className="flex flex-col gap-y-2 h-[27rem] overflow-auto custom-scrollbar">
                            {getCancelledWP?.data?.map((cancelledWp: any) => (
                                <CancelledWorkplaceCard
                                    cancelledWp={cancelledWp}
                                />
                            ))}
                            {/* <CancelledWorkplaceTable
                        cancelledWp={getCancelledWP?.data}
                    /> */}
                        </div>
                    ) : (
                        studentWorkplace?.isSuccess && (
                            <EmptyData
                                imageUrl={'/images/workplace/icon.png'}
                                title="No Cancelled Workplace Found"
                                description="There is no cancelled workplace found for this student."
                                height="40vh"
                            />
                        )
                    )
                ) : null}
            </Card>
        </>
    )
}
