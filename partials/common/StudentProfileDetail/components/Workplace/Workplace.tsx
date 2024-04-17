import {
    Card,
    EmptyData,
    Typography,
    TechnicalError,
    LoadingAnimation,
    AuthorizedUserComponent,
    ActionButton,
    ShowErrorNotifications,
    Button,
} from '@components'
import { UserRoles } from '@constants'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import {
    useGetWorkplaceFoldersQuery,
    useGetSubAdminStudentWorkplaceDetailQuery,
    useCancelWorkplaceStatusMutation,
} from '@queries'
import moment from 'moment'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import {
    WorkplaceTab,
    AgreementView,
    IndustryStatus,
    ViewAvailability,
    WorkplaceHistory,
    AddWorkplaceAction,
    WorkplaceStatusView,
    WorkplaceCoordinators,
    ContactPersonDetail,
} from './components'
import { IndustryDetail } from './components/IndustryDetail'
import { AddSecondWPCB } from '@partials/sub-admin/students/contextBar'
import { useContextBar } from '@hooks'
import { WorkplaceCurrentStatus } from '@utils'
import { ViewQuestionsModal } from './modals'
import { WorkplaceQuestionType } from 'redux/queryTypes'

const WPStatusForCancelButon = [
    WorkplaceCurrentStatus.Applied,
    WorkplaceCurrentStatus.CaseOfficerAssigned,
    WorkplaceCurrentStatus.Interview,
    WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
    WorkplaceCurrentStatus.AppointmentBooked,
    WorkplaceCurrentStatus.AwaitingAgreementSigned,
    WorkplaceCurrentStatus.NoResponse,
    WorkplaceCurrentStatus.Rejected,
]

export const Workplace = ({
    studentId,
    studentUserId,
    getWorkplaceLength,
}: {
    getWorkplaceLength: (length: number) => void
    studentUserId: number
    studentId: number
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [selectedWorkplace, setSelectedWorkplace] = useState<any>(null)

    const contextBar = useContextBar()

    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        studentId,
        {
            skip: !studentId,
        }
    )
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceStatusMutation()

    const appliedIndustry = selectedWorkplace?.industries?.find(
        (i: any) => i.applied
    )

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

    useEffect(() => {
        if (
            studentWorkplace?.data &&
            studentWorkplace?.isSuccess &&
            studentWorkplace?.data?.length > 0
        ) {
            getWorkplaceLength(studentWorkplace?.data?.length)
            setSelectedWorkplace(
                selectedWorkplace
                    ? studentWorkplace?.data?.find(
                          (w: any) => w?.id === selectedWorkplace?.id
                      )
                    : studentWorkplace?.data?.[0]
            )
        }
    }, [studentWorkplace])

    const onCancelModal = () => setModal(null)

    const onViewWorkplaceQuestions = (questions: WorkplaceQuestionType[]) => {
        setModal(
            <ViewQuestionsModal
                questions={questions}
                onCancel={() => {
                    onCancelModal()
                }}
            />
        )
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={cancelWorkplaceResult} />
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
                              !selectedWorkplace?.byExistingAbn && (
                                  <ActionButton
                                      variant={'link'}
                                      onClick={() => {
                                          onViewWorkplaceQuestions(
                                              selectedWorkplace?.questions
                                          )
                                      }}
                                  >
                                      View Answers
                                  </ActionButton>
                              )
                            : null}
                        {studentWorkplace?.data &&
                        studentWorkplace?.data?.length === 1 ? (
                            <div className="whitespace-pre">
                                <Button
                                    onClick={() => {
                                        contextBar.setContent(
                                            <AddSecondWPCB
                                                studentId={studentId}
                                                studentUserId={studentUserId}
                                            />
                                        )
                                        contextBar.show(false)
                                    }}
                                >
                                    Add Another Workplace
                                </Button>
                            </div>
                        ) : studentWorkplace?.data?.length === 0 ? (
                            <AuthorizedUserComponent
                                roles={[UserRoles.SUBADMIN]}
                            >
                                <AddWorkplaceAction id={studentId} />
                            </AuthorizedUserComponent>
                        ) : null}
                    </div>
                </div>

                {studentWorkplace?.data &&
                    studentWorkplace?.data?.length > 1 && (
                        <div className="border-b border-secondary-dark p-4 flex items-center gap-x-2.5 cursor-pointer">
                            {studentWorkplace?.data?.map(
                                (workplace: any, i: number) => (
                                    <WorkplaceTab
                                        index={i}
                                        key={workplace.id}
                                        active={
                                            selectedWorkplace?.id ===
                                            workplace?.id
                                        }
                                        onClick={() => {
                                            setSelectedWorkplace(workplace)
                                        }}
                                    />
                                )
                            )}
                        </div>
                    )}

                {/*  */}
                {studentWorkplace.isError ? (
                    <TechnicalError description={false} />
                ) : null}
                {studentWorkplace?.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Workplace Loading...
                        </Typography>
                    </div>
                ) : studentWorkplace?.data &&
                  studentWorkplace?.data?.length > 0 ? (
                    <div>
                        <div className="py-2.5 px-4 border-b border-secondary-dark flex justify-between gap-x-4">
                            <IndustryStatus
                                folders={folders}
                                workplace={selectedWorkplace}
                                appliedIndustry={appliedIndustry}
                            />
                            <div className="w-full">
                                <div className="flex justify-end divide-x-2 mb-1">
                                    <ContactPersonDetail
                                        appliedIndustry={appliedIndustry}
                                    />
                                    <WorkplaceHistory />
                                    <div className="">
                                        <ViewAvailability
                                            availability={
                                                selectedWorkplace?.generalAvailability
                                            }
                                        />
                                    </div>
                                </div>
                                <WorkplaceStatusView
                                    currentStatus={
                                        selectedWorkplace?.currentStatus
                                    }
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="p-4 grid grid-cols-10 gap-x-3 h-64 border-b border-secondary-dark">
                            <div className="col-span-3 h-full">
                                <WorkplaceCoordinators
                                    appliedIndustryId={appliedIndustry?.id}
                                    workplace={selectedWorkplace}
                                />
                            </div>
                            <div className="col-span-7 h-full">
                                <IndustryDetail
                                    workplace={selectedWorkplace}
                                    appliedIndustry={appliedIndustry}
                                    course={course}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4">
                            <div>
                                {WPStatusForCancelButon.includes(
                                    selectedWorkplace?.currentStatus
                                ) && (
                                    <ActionButton
                                        variant={'error'}
                                        onClick={async () => {
                                            await cancelWorkplace(
                                                Number(selectedWorkplace?.id)
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
                                )}
                            </div>
                            <Typography variant="small" medium>
                                Recieved On:{' '}
                                {moment(selectedWorkplace?.createdAt).format(
                                    'Do MMM, YYYY'
                                )}
                            </Typography>
                        </div>
                    </div>
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
