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
    SubAdminApi,
    useGetSubAdminStudentWorkplaceDetailQuery,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import ReactStars from 'react-stars'
import { FaInfoCircle } from 'react-icons/fa'

import { useContextBar } from '@hooks'
import { AddSecondWPCB } from '@partials/sub-admin/students/contextBar'
import { ForwardModal } from '@partials/sub-admin/workplace/modals'
import { Student } from '@types'
import {
    checkStudentProfileCompletion,
    getUserCredentials,
    WorkplaceCurrentStatus,
} from '@utils'
import moment from 'moment'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
    IWorkplaceIndustries,
    WorkplaceWorkIndustriesType,
} from 'redux/queryTypes'
import {
    AddWorkplaceAction,
    CancelledWorkplaceTable,
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
    CancelWorkplaceModal,
    CancelWorkplaceRequestModal,
    ShowRejectedRequestModal,
    UpdatePrvWPStatusModal,
    ViewPlacementStartedAnswersModal,
    ViewQuestionsModal,
} from './modals'

const WPStatusForCancelButon = [
    WorkplaceCurrentStatus.Applied,
    WorkplaceCurrentStatus.Rejected,
    WorkplaceCurrentStatus.Interview,
    WorkplaceCurrentStatus.NoResponse,
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
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [selectedWorkplace, setSelectedWorkplace] = useState<any>(null)

    const contextBar = useContextBar()

    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        student?.id,
        {
            skip: !student,
            refetchOnMountOrArgChange: true,
        }
    )
    const courses = SubAdminApi.Student.useCourses(Number(student?.id), {
        skip: !student?.id,
        refetchOnMountOrArgChange: true,
    })
    const getCancelledWP = SubAdminApi.Student.getCancelledWP(student?.id, {
        skip:
            !studentWorkplace?.isSuccess && studentWorkplace?.data?.length > 0,
    })

    const appliedIndustry: WorkplaceWorkIndustriesType =
        selectedWorkplace?.industries?.find((i: any) => i.applied)

    const course = selectedWorkplace?.courses?.find((c: any) => c)

    const workplaceFolders = useGetWorkplaceFoldersQuery(
        {
            workplaceId: Number(selectedWorkplace?.id),
            appliedIndustryId: appliedIndustry?.industry?.id,
            courseId: course?.id,
        },
        { skip: !studentWorkplace || !appliedIndustry || !course }
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
            getWorkplaceLength(sortedWorkplace?.length)
            setSelectedWorkplace(
                selectedWorkplace
                    ? studentWorkplace?.data?.find(
                          (w: any) => w?.id === selectedWorkplace?.id
                      )
                    : sortedWorkplace?.[0]
            )
        }
    }, [sortedWorkplace])

    const excludedRoles = [UserRoles.RTO, UserRoles.OBSERVER]
    const role = getUserCredentials()?.role

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

    const onCancelModal = () => setModal(null)

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

    const values = { ...student, ...student?.user, courses: courses?.data }

    // const keys = Object.keys(values)

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

    console.log({ latestWorkplaceApprovaleRequest })

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
                        {ignoreCompletedWP &&
                        ignoreCompletedWP?.length === 1 ? (
                            <div className="">
                                <AuthorizedUserComponent
                                    roles={[UserRoles.SUBADMIN]}
                                >
                                    <AddWorkplaceAction
                                        id={student?.id}
                                        profileCompletion={100}
                                        text={'Add Another Workplace'}
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
                  studentWorkplace?.data?.length > 0 ? (
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
                                'pending' ? (
                                <>
                                    <div className="h-[380px] overflow-auto custom-scrollbar">
                                        <WorkplaceApprovalReq
                                            wpReqApproval={{
                                                ...latestWorkplaceApprovaleRequest,
                                                student: {
                                                    location:
                                                        selectedWorkplace
                                                            ?.student?.location,
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
                                                    roles={[
                                                        UserRoles.ADMIN,
                                                        UserRoles.RTO,
                                                    ]}
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
                                                    text="WP Cancelation Request Sent to Admin, wait for approval!"
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
                                            <div className="flex items-center gap-x-2">
                                                <Typography
                                                    variant="xs"
                                                    semibold
                                                >
                                                    Course :{' '}
                                                </Typography>
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
                                            ) || true ? (
                                                !selectedWorkplace
                                                    ?.cancelledRequests
                                                    ?.length ? (
                                                    <>
                                                        <AuthorizedUserComponent
                                                            roles={[
                                                                UserRoles.ADMIN,
                                                                UserRoles.RTO,
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
                                                            text="WP Cancelation Request Sent to Admin, wait for approval!"
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
                                                ? appliedIndustry?.placementStarted &&
                                                  selectedWorkplace?.studentFeedBack >
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
                ) : getCancelledWP?.data && getCancelledWP?.data?.length > 0 ? (
                    <CancelledWorkplaceTable
                        cancelledWp={getCancelledWP?.data}
                    />
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
            </Card>
        </>
    )
}
