import React, { ReactElement, useState } from 'react'
import {
    CompleteWorkplaceModal,
    ForwardModal,
    InterviewModal,
    MeetingModal,
    PlacementStartedModal,
    TerminateWorkplaceModal,
} from '@partials/sub-admin/workplace/modals'
import { WorkplaceCurrentStatus } from '@utils'
import { useNotification } from '@hooks'

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
        setModal(
            <PlacementStartedModal
                id={id}
                agreementSigned={appliedIndustry?.AgreementSigned}
                student={workplace?.student}
                onCancel={() => onModalCancelClicked()}
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
            primaryText: 'Agreement & Eligibility ',
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
            primaryText: 'Agreement & Eligibility ',
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
                if (workplace?.currentStatus === 'awaitingAgreementSigned') {
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
            onClick: () => {},
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
    return { requestTypeActions, modal }
}
