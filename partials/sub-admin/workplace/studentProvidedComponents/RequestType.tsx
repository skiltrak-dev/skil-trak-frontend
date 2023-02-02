import { useEffect, useState } from 'react'

// Icons
import { IoMdArrowDropdown } from 'react-icons/io'

// components
import {
    LoadingAnimation,
    ShowErrorNotifications,
    Typography,
} from '@components'

// query
import { useNotification } from '@hooks'
import { useSendInterviewNotificationMutation } from '@queries'
import { HiCheckBadge } from 'react-icons/hi2'
import OutsideClickHandler from 'react-outside-click-handler'
import {
    ActionModal,
    CompleteWorkplaceModal,
    PlacementStartedModal,
    TerminateWorkplaceModal,
} from '../modals'
import { UserStatus } from '@types'

export const RequestType = ({
    appliedIndustry,
    workplace,
}: {
    appliedIndustry: any
    workplace: any
}) => {
    const [visibleRequestType, setVisibleRequestType] = useState(false)
    const [selectedRequestType, setSelectedRequestType] = useState<
        number | null
    >(0)
    const [modal, setModal] = useState<any>(null)

    const [interView, interViewResult] = useSendInterviewNotificationMutation()

    const { notification } = useNotification()

    useEffect(() => {
        if (interViewResult.isSuccess) {
            notification.success({
                title: 'Interview Assigned to Student',
                description: 'Interview Assigned to Student',
            })
            setModal(
                <ActionModal
                    Icon={HiCheckBadge}
                    title={'Successfully Interview'}
                    subtitle={'Now You can forward the request to Industry'}
                    onCancel={onModalCancelClicked}
                    confirmText={'OK'}
                />
            )
        }
    }, [interViewResult])

    const onModalCancelClicked = () => {
        setModal(null)
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

    useEffect(() => {
        if (interViewResult.isSuccess) {
            notification.success({
                title: 'Interview Assigned to Student',
                description: 'Interview Assigned to Student',
            })
        }
    }, [interViewResult])

    const requestTypeActions = [
        {
            primaryText: 'Request Sent',
            secondaryText: 'No Case Officer',
            color: 'text-primary-dark',
            onClick: () => {},
            status: 'applied',
        },
        {
            primaryText: 'Assigned',
            secondaryText: 'Case Officer',
            color: 'text-primary',
            onClick: () => {},
            status: 'caseOfficerAssigned',
        },
        {
            primaryText: 'Interview',
            secondaryText: 'with Case Officer',
            color: 'text-primary-light',
            onClick: (isCleared: any) => {
                isCleared(true)
                interView(appliedIndustry?.id)
            },
            status: 'interview',
        },
        {
            primaryText: 'Agreement & Eligibility ',
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
        },
        {
            primaryText: 'Agreement & Eligibility ',
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
        },
        {
            primaryText: 'Completed',
            secondaryText: 'Completed',
            color: 'text-error',
            onClick: () => {
                onCompleteClicked()
            },
            status: 'completed',
        },
        {
            primaryText: 'Cancelled',
            secondaryText: 'Cancelled',
            color: 'text-error',
            onClick: () => {},
            status: 'cancelled',
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
        },
    ]

    const findStatusIndex = requestTypeActions.findIndex(
        (r) => r.status === workplace.currentStatus
    )

    useEffect(() => {
        if (appliedIndustry?.industryResponse === 'rejected') {
            setSelectedRequestType(requestTypeActions.length - 1)
        } else {
            setSelectedRequestType(findStatusIndex)
        }

        // if (data?.caseOfficerAssigned) {
        //     setSelectedRequestType(1)
        // }
        // if (data?.interview) {
        //     setSelectedRequestType(2)
        // }
        // if (data?.awaitingWorkplaceResponse) {
        //     setSelectedRequestType(3)
        // }
        // if (data?.awaitingAgreementSigned) {
        //     setSelectedRequestType(5)
        // }
        // if (data?.AgreementSigned) {
        //     setSelectedRequestType(6)
        // }
    }, [appliedIndustry])
    console.log('appliedIndustry', appliedIndustry)

    const isLoading = interViewResult.isLoading

    const onRequestClicked = () => {
        if (workplace?.assignedTo) {
            if (workplace.industryStatus === UserStatus.Approved) {
                if (
                    !appliedIndustry?.terminated &&
                    !appliedIndustry?.isCompleted &&
                    !appliedIndustry?.cancelled
                ) {
                    setVisibleRequestType(!visibleRequestType)
                } else {
                    notification.warning({
                        title: 'Action cant perform',
                        description: 'Action cant perform',
                    })
                }
            } else {
                notification.error({
                    title: 'Industry Not Approved',
                    description: 'Approve the Industry before changing status',
                })
            }
        } else {
            notification.warning({
                title: 'Assign the workplace',
                description: 'Assign the workplace before changing status',
            })
        }
    }

    return (
        <div className="relative">
            {modal && modal}
            <ShowErrorNotifications result={interViewResult} />
            <OutsideClickHandler
                onOutsideClick={() => {
                    setVisibleRequestType(false)
                }}
            >
                <div
                    className={`${
                        appliedIndustry?.terminated ||
                        appliedIndustry?.isCompleted ||
                        appliedIndustry?.cancelled
                            ? 'bg-gray-100 cursor-default'
                            : ''
                    }  border border-dashed border-gray-400 rounded-lg w-56 px-4 py-1 flex items-center justify-between gap-x-1 cursor-pointer relative`}
                    onClick={onRequestClicked}
                >
                    {isLoading && (
                        <div className="absolute top-0 left-0 w-full h-full bg-[#00000010]">
                            <LoadingAnimation size={40} />
                        </div>
                    )}

                    <div>
                        <Typography
                            variant={'label'}
                            color={
                                requestTypeActions[selectedRequestType as any]
                                    ?.color
                            }
                        >
                            {
                                requestTypeActions[selectedRequestType as any]
                                    ?.primaryText
                            }
                        </Typography>
                        <Typography variant={'xs'} color={'text-gray-300'}>
                            {
                                requestTypeActions[selectedRequestType as any]
                                    ?.secondaryText
                            }
                        </Typography>
                    </div>
                    <IoMdArrowDropdown
                        className={`${
                            visibleRequestType ? 'rotate-180' : 'rotate-0'
                        } transition-all`}
                    />
                </div>

                {visibleRequestType && (
                    <div className="shadow absolute z-10 w-full bg-white rounded-md py-2 mt-1">
                        {requestTypeActions.map((type, i) => (
                            <div
                                key={`request_type_${i}`}
                                className="pb-2 cursor-pointer hover:bg-gray-100 px-2"
                                onClick={() => {
                                    setVisibleRequestType(false)
                                    if (findStatusIndex < i) {
                                        const isCleared = (clear = true) => {
                                            clear && setSelectedRequestType(i)
                                        }

                                        type.onClick(isCleared)
                                    } else {
                                        notification.error({
                                            title: 'You already performed this action',
                                            description:
                                                'You already performed this action',
                                        })
                                    }
                                }}
                            >
                                <Typography
                                    variant={'label'}
                                    color={type.color}
                                >
                                    {type.primaryText}
                                </Typography>
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-300'}
                                >
                                    {type.secondaryText}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
            </OutsideClickHandler>
        </div>
    )
}
