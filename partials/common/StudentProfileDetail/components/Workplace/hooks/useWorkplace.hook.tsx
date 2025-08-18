import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
    AddFeedbackModal,
    AppointmentBookModal,
    AppointmentViewWPModal,
    BookAppointmentInfoModal,
    CancelWorkplaceModal,
    CancelWorkplaceRequestModal,
    GenerateEsignModal,
    LogbookNotReleasedModal,
    NoLogbookFoundModal,
    ReleaseLogbookModal,
    ShowRejectedRequestModal,
    UpdatePrvWPStatusModal,
    UpdateWorkplaceCourseModal,
    ViewPlacementStartedAnswersModal,
    ViewQuestionsModal,
} from '../modals'
import {
    SubAdminApi,
    useGetSubAdminStudentWorkplaceDetailQuery,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { useRouter } from 'next/router'
import { getUserCredentials, WorkplaceCurrentStatus } from '@utils'
import { InitiateSigningModal } from '@partials/sub-admin/assessmentEvidence/modal'
import { UserRoles } from '@constants'
import {
    IWorkplaceIndustries,
    WorkplaceWorkIndustriesType,
} from 'redux/queryTypes'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import { ForwardModal } from '@partials/sub-admin/workplace/modals'
import { ChangeStatusModal } from '@partials/admin/invoices'
import { Student } from '@types'
import moment from 'moment'

export const useWorkplaceHook = ({ student }: { student: Student }) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [modelId, setModelId] = useState<string>('')
    const [selectedWorkplace, setSelectedWorkplace] = useState<any>(null)
    const [showPreviousWorkplace, setShowPreviousWorkplace] = useState(false)

    const router = useRouter()

    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
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

    const rejectedWorkplaces =
        SubAdminApi.Student.useSubAdminStudentCancelledWorkplaces(
            {
                params: { courseId: selectedWorkplace?.courses?.[0]?.id },
                id: student?.id,
            },
            {
                skip: !student?.id || !student?.user?.id || !selectedWorkplace,
            }
        )

    const courses = SubAdminApi.Student.useCourses(Number(router?.query?.id), {
        skip: !router?.query?.id,
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
    const getWorkplaceAppointment = SubAdminApi.Student.getWorkplaceAppointment(
        selectedWorkplace?.id,
        {
            skip: !selectedWorkplace,
            refetchOnMountOrArgChange: true,
        }
    )

    const esignDocumentsFolders = SubAdminApi.Student.esignDocumentsFolders(
        Number(selectedWorkplace?.id),
        {
            skip: !selectedWorkplace,
            refetchOnMountOrArgChange: true,
        }
    )

    const folders = GetFolders(workplaceFolders)

    const role = getUserCredentials()?.role

    const excludedRoles = [UserRoles.RTO, UserRoles.OBSERVER]

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

    const latestWorkplaceApprovaleRequest = useMemo(() => {
        return selectedWorkplace?.workplaceApprovaleRequest?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            selectedWorkplace?.workplaceApprovaleRequest?.[0]
        )
    }, [selectedWorkplace?.workplaceApprovaleRequest])

    const latestWorkplaceApprovaleRequestRto = useMemo(() => {
        return selectedWorkplace?.workplaceApprovaleRequest?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            selectedWorkplace?.workplaceApprovaleRequest?.[0]
        )
    }, [selectedWorkplace?.workplaceApprovaleRequest])

    const allDocumentsInitiated =
        esignDocumentsFolders?.data && esignDocumentsFolders?.isSuccess
            ? esignDocumentsFolders?.data?.every((folder: any) =>
                  //   folder?.course?.esignTemplates?.[0]?.documents?.length > 0
                  folder?.course?.esignTemplates?.find(
                      (temp: any) => temp?.documents?.length > 0
                  )
              )
            : false

    useEffect(() => {
        return () => {
            setModal(null)
        }
    }, [])

    useEffect(() => {
        if (sortedWorkplace && sortedWorkplace?.length > 0) {
            // setWorkplaceRes(sortedWorkplace)
            // getWorkplaceLength(sortedWorkplace?.length)
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
        const isAppointmentBookedStatus =
            selectedWorkplace?.currentStatus ===
            WorkplaceCurrentStatus.AppointmentBooked
        const isAppointmentQueryReady =
            !getWorkplaceAppointment?.isFetching &&
            !getWorkplaceAppointment?.isLoading &&
            getWorkplaceAppointment?.isSuccess
        const hasNoValidAppointment =
            getWorkplaceAppointment?.data &&
            getWorkplaceAppointment?.data?.isSuccessfull === null
        const isAfterCutoffDate = moment().isSameOrAfter('2025-08-01', 'day')
        const isTodayAppointment = moment().isSame(
            getWorkplaceAppointment?.data?.date,
            'day'
        )

        const shouldShowAppointmentModal =
            selectedWorkplace &&
            isAppointmentBookedStatus &&
            isAppointmentQueryReady &&
            hasNoValidAppointment &&
            isAfterCutoffDate &&
            isTodayAppointment

        if (shouldShowAppointmentModal) {
            onAppointmentViewWPClicked()
            setModelId('appointmentView')
        } else if (
            modelId === 'appointmentView' &&
            !shouldShowAppointmentModal
        ) {
            setModal(null)
            setModelId('')
        }
    }, [selectedWorkplace, getWorkplaceAppointment])

    // Handle appointment booking modal for workplaces with booked appointments
    useEffect(() => {
        const isAppointmentBookedStatus =
            selectedWorkplace?.currentStatus ===
            WorkplaceCurrentStatus.AppointmentBooked
        const isAppointmentQueryReady =
            !getWorkplaceAppointment?.isFetching &&
            !getWorkplaceAppointment?.isLoading &&
            getWorkplaceAppointment?.isSuccess
        const hasNoValidAppointment =
            !getWorkplaceAppointment?.data ||
            getWorkplaceAppointment?.data?.isSuccessfull === false
        const isAfterCutoffDate = moment().isSameOrAfter('2025-08-01', 'day')

        const shouldShowAppointmentModal =
            selectedWorkplace &&
            isAppointmentBookedStatus &&
            isAppointmentQueryReady &&
            hasNoValidAppointment &&
            isAfterCutoffDate

        if (shouldShowAppointmentModal && modelId !== 'appointmentClicked') {
            onAppointmentClicked()
            setModelId('appointmentClicked')
        } else if (
            modelId === 'appointmentClicked' &&
            !shouldShowAppointmentModal
        ) {
            setModal(null)
            setModelId('')
        }
    }, [selectedWorkplace, getWorkplaceAppointment, modelId])

    // Handle e-signature document generation modal
    useEffect(() => {
        const hasSuccessfulAppointment =
            getWorkplaceAppointment?.data?.isSuccessfull === true
        const isAfterCutoffDate = moment().isSameOrAfter('2025-08-01', 'day')
        const isEsignQueryReady = esignDocumentsFolders?.isSuccess
        const needsDocumentInitiation = !allDocumentsInitiated
        const isValidStatus =
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AppointmentBooked ||
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AwaitingAgreementSigned

        const shouldShowEsignModal =
            getWorkplaceAppointment &&
            hasSuccessfulAppointment &&
            isAfterCutoffDate &&
            isEsignQueryReady &&
            needsDocumentInitiation &&
            isValidStatus

        if (shouldShowEsignModal && modelId !== 'generateEsign') {
            onGenerateEsignClicked()
            setModelId('generateEsign')
        } else if (modelId === 'generateEsign' && !shouldShowEsignModal) {
            setModal(null)
            setModelId('')
        }
    }, [
        selectedWorkplace,
        allDocumentsInitiated,
        esignDocumentsFolders,
        getWorkplaceAppointment,
        modelId,
    ])

    const onCancelModal = () => setModal(null)

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

    const ignoreCompletedWP = studentWorkplace?.data?.filter(
        (wp: IWorkplaceIndustries) =>
            wp?.currentStatus !== WorkplaceCurrentStatus.Completed
    )

    const firstWorkplaceCurrentStatus = ignoreCompletedWP?.[0]?.currentStatus

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

    const onAppointmentViewWPClicked = () => {
        setModal(
            <AppointmentViewWPModal
                onCancel={() => {
                    onCancelModal()
                }}
                appointment={getWorkplaceAppointment?.data}
            />
        )
    }
    const onAppointmentClicked = () => {
        setModal(
            <AppointmentBookModal
                onCancel={() => {
                    onCancelModal()
                }}
                student={student}
                courseId={selectedWorkplace?.courses?.[0]?.id}
                studentUser={student?.user?.id}
            />
        )
    }
    const onGenerateEsignClicked = () => {
        setModal(
            <GenerateEsignModal
                onCancel={() => {
                    onCancelModal()
                }}
                workplace={selectedWorkplace}
                courseId={selectedWorkplace?.courses?.[0]?.id}
            />
        )
    }

    const onStatusChangeClicked = (id: number) => {
        setModal(<ChangeStatusModal onCancel={onCancelModal} id={id} />)
    }

    const onAddAnotherWp = () => {
        if (
            [
                WorkplaceCurrentStatus.Completed,
                WorkplaceCurrentStatus.Terminated,
                WorkplaceCurrentStatus.PlacementStarted,
            ].includes(firstWorkplaceCurrentStatus)
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
    }

    return {
        modal,
        course,
        folders,
        courses,
        onAddAnotherWp,
        getCancelledWP,
        appliedIndustry,
        workplaceFolders,
        sortedWorkplace,
        studentWorkplace,
        onCancelWPClicked,
        ignoreCompletedWP,
        selectedWorkplace,
        rejectedWorkplaces,
        setSelectedWorkplace,
        onAppointmentClicked,
        showPreviousWorkplace,
        onStatusChangeClicked,
        workplaceStudentDetail,
        workplaceIndustryDetail,
        setShowPreviousWorkplace,
        onCancelWPRequestClicked,
        onViewWorkplaceQuestions,
        onShowRejectedRequestModal,
        onViewPlacementStartedAnswers,
        onUpdateWorkplaceCourseClicked,
        latestWorkplaceApprovaleRequest,
        latestWorkplaceApprovaleRequestRto,
        appointmentDetail: getWorkplaceAppointment?.data,
    }
}
