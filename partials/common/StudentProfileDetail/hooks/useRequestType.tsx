import React, { ReactElement, useState } from 'react'
import {
    ApproveRequestModal,
    CompleteWorkplaceModal,
    ForwardModal,
    InterviewModal,
    MeetingModal,
    PlacementStartedModal,
    TerminateWorkplaceModal,
} from '@partials/sub-admin/workplace/modals'
import { WorkplaceCurrentStatus } from '@utils'
import { useNotification } from '@hooks'
import { isClearedFunctionType } from '@partials/sub-admin/workplace/studentProvidedComponents/RequestTypeAbn'
import { UserStatus } from '@types'
import { AddFeedbackModal, CancelWorlplaceModal } from '../components'

export const useRequestType = ({
    appliedIndustry,
    workplace,
    folders,
}: {
    appliedIndustry: any
    workplace: any
    folders: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const onModalCancelClicked = () => setModal(null)

    const onForwardClicked = (industry: any) => {
        setModal(
            <ForwardModal
                industry={industry}
                workplaceId={workplace?.id}
                folders={folders}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onPlacementStartedClicked = (id: number) => {
        // setModal(
        //     <PlacementStartedModal
        //         id={id}
        //         agreementSigned={appliedIndustry?.AgreementSigned}
        //         student={workplace?.student}
        //         onCancel={() => onModalCancelClicked()}
        //     />
        // )
        setModal(
            <AddFeedbackModal
                onCancel={onModalCancelClicked}
                id={id}
                agreementSigned={appliedIndustry?.AgreementSigned}
                student={workplace?.student}
                course={workplace?.courses?.[0]}
                wpId={workplace?.id}
                industryId={appliedIndustry?.industry?.id}
            />
        )
    }

    const onCompleteClicked = () => {
        setModal(
            <CompleteWorkplaceModal
                appliedIndustryId={appliedIndustry?.id}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onTerminateClicked = () => {
        setModal(
            <TerminateWorkplaceModal
                appliedIndustryId={appliedIndustry?.id}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onInterviewClicked = () => {
        setModal(
            <InterviewModal
                workIndustry={appliedIndustry?.id}
                workplace={workplace?.id}
                onCancel={onModalCancelClicked}
                student={workplace?.student}
            />
        )
    }

    const onMeetingClicked = () => {
        setModal(
            <MeetingModal
                workIndustry={appliedIndustry?.id}
                workplace={workplace?.id}
                onCancel={onModalCancelClicked}
                student={workplace?.student}
            />
        )
    }

    const industryResponse = workplace?.industries?.find(
        (wp: any) => wp?.industryResponseDate
    )

    const onApproveModal = () => {
        setModal(
            <ApproveRequestModal
                appliedIndustryId={appliedIndustry?.id}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onCancelClicked = () => {
        setModal(
            <CancelWorlplaceModal
                onCancel={onModalCancelClicked}
                workplaceId={workplace?.id}
            />
        )
    }

    const requestTypeActions = [
        {
            primaryText: 'Request Sent',
            secondaryText: 'No Case Officer',
            color: 'text-primary-dark',
            onClick: () => {},
            status: WorkplaceCurrentStatus.Applied,
            date: appliedIndustry?.appliedDate,
        },
        {
            primaryText: 'Assigned',
            secondaryText: 'Case Officer',
            color: 'text-primary',
            onClick: () => {},
            status: WorkplaceCurrentStatus.CaseOfficerAssigned,
            date: appliedIndustry?.caseOfficerAssignedDate,
        },
        {
            primaryText: 'Interview',
            secondaryText: 'with Case Officer',
            color: 'text-primary-light',
            onClick: (isCleared: (bool: boolean) => void) => {
                isCleared(true)
                onInterviewClicked()
            },
            status: WorkplaceCurrentStatus.Interview,
            date: appliedIndustry?.interviewDate,
        },
        {
            primaryText: 'Meeting',
            secondaryText: 'with Workplace Supervisor (Orientation)',
            color: 'text-info-dark',
            onClick: (isCleared: (bool: boolean) => void) => {
                if (
                    workplace?.currentStatus ===
                    WorkplaceCurrentStatus.Interview
                ) {
                    isCleared(true)
                    onMeetingClicked()
                } else {
                    notification.error({
                        title: 'Take an Interview',
                        description: 'Take an Interview From Student',
                    })
                }
            },
            status: WorkplaceCurrentStatus.AppointmentBooked,
            date: appliedIndustry?.appointmentBookedDate,
        },
        {
            primaryText: 'Waiting',
            secondaryText: 'for Workplace Response',
            color: 'text-info-light',
            onClick: (isCleared: (bool: boolean) => void) => {
                if (appliedIndustry) {
                    if (appliedIndustry?.interview) {
                        onForwardClicked(appliedIndustry)
                        isCleared(true)
                    } else {
                        isCleared(false)
                        notification.error({
                            title: 'Take an Interview',
                            description:
                                'You Must have to take an Interview from student before sending request to industry',
                        })
                    }
                } else {
                    notification.error({
                        title: 'Apply on Industry',
                        description:
                            'Apply on Industry before forwarding request',
                    })
                }
            },
            status: WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
            date: appliedIndustry?.awaitingWorkplaceResponseDate,
        },
        {
            primaryText: 'Agreement & Eligibility (Pending)',
            secondaryText: 'Checklist Pending',
            color: 'text-info',
            onClick: (isCleared: (bool: boolean) => void) => {
                isCleared(false)
                if (workplace?.currentStatus === 'awaitingWorkplaceResponse') {
                    notification.info({
                        title: 'Approve or reject the Request',
                        description:
                            'Before uploading agreement you must have to Approve the workplace request',
                    })
                    isCleared(false)
                } else {
                    isCleared(false)
                    notification.error({
                        title: 'Forward the request to Industry',
                        description:
                            'You Must have to Forward the request to Industry before uploading agreement',
                    })
                }
            },
            status: WorkplaceCurrentStatus.AwaitingAgreementSigned,
            date: appliedIndustry?.awaitingAgreementSignedDate,
        },
        {
            primaryText: 'Agreement & Eligibility (Signed)',
            secondaryText: 'Checklist Signed',
            color: 'text-success',
            onClick: (isCleared: (bool: boolean) => void) => {
                if (workplace?.currentStatus === 'awaitingAgreementSigned') {
                    notification.info({
                        title: 'Agreement Sign',
                        description:
                            'Now You can upload the agreement file on th workplace which is provided by student or you can request to student to upload the agreement file',
                    })
                    isCleared(false)
                } else {
                    isCleared(false)
                    notification.error({
                        title: 'Approve or reject',
                        description:
                            'You must have to Approve the workplace request',
                    })
                }
            },
            status: WorkplaceCurrentStatus.AgreementSigned,
            date: appliedIndustry?.AgreementSignedDate,
        },
        {
            primaryText: 'Placement Started',
            secondaryText: 'Placement Started',
            color: 'text-success-dark',
            onClick: (isCleared: (bool: boolean) => void) => {
                if (
                    workplace?.currentStatus ===
                        WorkplaceCurrentStatus.AwaitingAgreementSigned ||
                    workplace?.currentStatus ===
                        WorkplaceCurrentStatus.AgreementSigned
                ) {
                    onPlacementStartedClicked(Number(appliedIndustry?.id))
                    isCleared(true)
                } else {
                    notification.error({
                        title: 'First Approve the workplace',
                        description:
                            'Placement cannot start without approving the workplace',
                    })
                    isCleared(false)
                }
            },
            status: WorkplaceCurrentStatus.PlacementStarted,
            date: appliedIndustry?.placementStartedDate,
        },
        {
            primaryText: 'Completed',
            secondaryText: 'Completed',
            color: 'text-error',
            onClick: () => {
                onCompleteClicked()
            },
            status: WorkplaceCurrentStatus.Completed,
            date: appliedIndustry?.isCompletedDate,
        },
        {
            primaryText: 'Cancelled',
            secondaryText: 'Cancelled',
            color: 'text-error',
            onClick: () => {
                onCancelClicked()
            },
            status: WorkplaceCurrentStatus.Cancelled,
            date: appliedIndustry?.cancelledDate,
        },
        {
            primaryText: 'Rejected',
            secondaryText: 'Rejected',
            color: 'text-error',
            onClick: () => {},
            status: WorkplaceCurrentStatus.Rejected,
            date: industryResponse?.industryResponseDate,
        },
        {
            primaryText: 'Terminated',
            secondaryText: 'Terminated',
            color: 'text-error',
            onClick: () => {
                onTerminateClicked()
            },
            status: WorkplaceCurrentStatus.Terminated,
            date: appliedIndustry?.terminatedDate,
        },
        {
            primaryText: 'No Response',
            secondaryText: 'No Response',
            color: 'text-error',
            onClick: () => {},
            status: WorkplaceCurrentStatus.NoResponse,
            date: industryResponse?.industryResponseDate,
        },
    ]

    const studentProvidedRequestTypeActions = [
        {
            primaryText: 'Request Sent',
            secondaryText: 'No Case Officer',
            color: 'text-primary-dark',
            onClick: () => {},
            status: 'applied',
            date: appliedIndustry?.appliedDate,
        },
        {
            primaryText: 'Assigned',
            secondaryText: 'Case Officer',
            color: 'text-primary',
            onClick: () => {},
            status: 'caseOfficerAssigned',
            date: appliedIndustry?.caseOfficerAssignedDate,
        },
        {
            primaryText: 'Interview',
            secondaryText: 'with Case Officer',
            color: 'text-primary-light',
            onClick: (isCleared: any) => {
                isCleared(true)
                // interView(appliedIndustry?.id)
                onInterviewClicked()
            },
            status: 'interview',
            date: appliedIndustry?.interviewDate,
        },
        {
            primaryText: 'Agreement & Eligibility (Pending)',
            secondaryText: 'Checklist Pending',
            color: 'text-info',
            onClick: (isCleared: any) => {
                isCleared(false)
                if (workplace?.currentStatus === 'awaitingWorkplaceResponse') {
                    notification.info({
                        title: 'Approve or reject the Request',
                        description:
                            'Before uploading agreement you must have to Approve the workplace request',
                    })
                    isCleared(false)
                } else {
                    isCleared(false)
                    notification.error({
                        title: 'Forward the request to Industry',
                        description:
                            'You Must have to Forward the request to Industry before uploading agreement',
                    })
                }
            },
            status: 'awaitingAgreementSigned',
            date: appliedIndustry?.awaitingAgreementSignedDate,
        },
        {
            primaryText: 'Agreement & Eligibility (Signed)',
            secondaryText: 'Checklist Signed',
            color: 'text-success',
            onClick: (isCleared: any) => {
                if (workplace?.currentStatus === 'awaitingAgreementSigned') {
                    notification.info({
                        title: 'Agreement Sign',
                        description:
                            'Now You can upload the agreement file on th workplace which is provided by student or you can request to student to upload the agreement file',
                    })
                    isCleared(false)
                } else {
                    isCleared(false)
                    notification.error({
                        title: 'Approve or reject',
                        description:
                            'You must have to Approve the workplace request',
                    })
                }
            },
            status: 'AgreementSigned',
            date: appliedIndustry?.AgreementSignedDate,
        },
        {
            primaryText: 'Placement Started',
            secondaryText: 'Placement Started',
            color: 'text-success-dark',
            onClick: (isCleared: any) => {
                if (workplace?.currentStatus === 'AgreementSigned') {
                    onPlacementStartedClicked(Number(appliedIndustry?.id))
                    isCleared(true)
                } else {
                    notification.error({
                        title: 'First Approve the workplace',
                        description:
                            'Placement cannot start without approving the workplace',
                    })
                    isCleared(false)
                }
            },
            status: 'placementStarted',
            date: appliedIndustry?.placementStartedDate,
        },
        {
            primaryText: 'Completed',
            secondaryText: 'Completed',
            color: 'text-error',
            onClick: () => {
                onCompleteClicked()
            },
            status: 'completed',
            date: appliedIndustry?.isCompletedDate,
        },
        {
            primaryText: 'Cancelled',
            secondaryText: 'Cancelled',
            color: 'text-error',
            onClick: () => {
                onCancelClicked()
            },
            status: 'cancelled',
            date: appliedIndustry?.cancelledDate,
        },
        {
            primaryText: 'Rejected',
            secondaryText: 'Rejected',
            color: 'text-error',
            onClick: () => {},
            status: 'rejected',
        },
        {
            primaryText: 'Terminated',
            secondaryText: 'Terminated',
            color: 'text-error',
            onClick: () => {
                onTerminateClicked()
            },
            status: 'terminated',
            date: appliedIndustry?.terminatedDate,
        },
    ]

    const abnRequestTypeActions = [
        {
            primaryText: 'Request Sent',
            secondaryText: 'No Case Officer',
            color: 'text-primary-dark',
            onClick: () => {},
            status: 'applied',
            date: appliedIndustry?.appliedDate,
        },
        {
            primaryText: 'Assigned',
            secondaryText: 'Case Officer',
            color: 'text-primary',
            onClick: () => {},
            status: 'caseOfficerAssigned',
            date: appliedIndustry?.caseOfficerAssignedDate,
        },
        {
            primaryText: 'Waiting',
            secondaryText: 'for Workplace Response',
            color: 'text-info-light',
            onClick: (isCleared: isClearedFunctionType) => {
                if (
                    workplace?.assignedTo &&
                    workplace?.industryStatus === UserStatus.Approved
                ) {
                    onForwardClicked(appliedIndustry)
                    isCleared(true)
                } else {
                    notification.warning({
                        title: 'Industry Not Approved',
                        description: 'Approve the Industry before Forward',
                    })
                }
            },
            status: 'awaitingWorkplaceResponse',
            date: appliedIndustry?.awaitingWorkplaceResponseDate,
        },
        {
            primaryText: 'Agreement & Eligibility (Pending)',
            secondaryText: 'Checklist Pending',
            color: 'text-info',
            onClick: (isCleared: isClearedFunctionType) => {
                isCleared(false)
                if (
                    workplace?.currentStatus ===
                    WorkplaceCurrentStatus.AwaitingWorkplaceResponse
                ) {
                    onApproveModal()
                    isCleared(false)
                } else {
                    isCleared(false)
                    notification.error({
                        title: 'Forward the request to Industry',
                        description:
                            'You Must have to Forward the request to Industry before uploading agreement',
                    })
                }
            },
            status: 'awaitingAgreementSigned',
            date: appliedIndustry?.awaitingAgreementSignedDate,
        },
        {
            primaryText: 'Agreement & Eligibility (Signed)',
            secondaryText: 'Checklist Signed',
            color: 'text-success',
            onClick: (isCleared: isClearedFunctionType) => {
                if (workplace?.currentStatus === 'awaitingAgreementSigned') {
                    notification.info({
                        title: 'Upload Agrement',
                        description:
                            'Upload Agrement on clicking sign agreement button',
                    })
                    isCleared(false)
                } else {
                    isCleared(false)
                    notification.info({
                        title: 'Upload Agrement',
                        description:
                            'Upload Agrement on clicking sign agreement button',
                    })
                }
            },
            status: 'AgreementSigned',
            date: appliedIndustry?.AgreementSignedDate,
        },
        {
            primaryText: 'Placement Started',
            secondaryText: 'Placement Started',
            color: 'text-success-dark',
            onClick: (isCleared: isClearedFunctionType) => {
                if (
                    workplace?.currentStatus === 'awaitingWorkplaceResponse' ||
                    workplace?.currentStatus === 'AgreementSigned' ||
                    workplace?.currentStatus === 'awaitingAgreementSigned'
                ) {
                    onPlacementStartedClicked(Number(appliedIndustry?.id))
                    isCleared(true)
                } else {
                    notification.error({
                        title: 'Forward the request to Industry',
                        description:
                            'You Must have to Forward the request to Industry before start placement',
                    })
                    isCleared(false)
                }
            },
            status: 'placementStarted',
            date: appliedIndustry?.placementStartedDate,
        },
        {
            primaryText: 'Completed',
            secondaryText: 'Completed',
            color: 'text-error',
            onClick: () => {
                onCompleteClicked()
            },
            status: 'completed',
            date: appliedIndustry?.isCompletedDate,
        },
        {
            primaryText: 'Cancelled',
            secondaryText: 'Cancelled',
            color: 'text-error',
            onClick: () => {
                onCancelClicked()
            },
            status: 'cancelled',
            date: appliedIndustry?.cancelledDate,
        },
        {
            primaryText: 'Rejected',
            secondaryText: 'Rejected',
            color: 'text-error',
            onClick: () => {},
            status: 'rejected',
        },
        {
            primaryText: 'Terminated',
            secondaryText: 'Terminated',
            color: 'text-error',
            onClick: () => {
                onTerminateClicked()
            },
            status: 'terminated',
            date: appliedIndustry?.terminatedDate,
        },
    ]
    return {
        modal,
        requestTypeActions,
        abnRequestTypeActions,
        studentProvidedRequestTypeActions,
    }
}
