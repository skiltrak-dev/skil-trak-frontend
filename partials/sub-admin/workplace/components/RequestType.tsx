import { useEffect, useState } from 'react'

// Icons
import { IoMdArrowDropdown } from 'react-icons/io'

// components
import {
    Typography,
    LoadingAnimation,
    ShowErrorNotifications,
} from '@components'
import { requestType } from './requestTypeData'
import { SignAgreement } from './Industries/components/Actions/components/SignAgreement'

// query
import { useSendInterviewNotificationMutation } from '@queries'
import OutsideClickHandler from 'react-outside-click-handler'
import { useNotification } from '@hooks'
import { ForwardModal, PlacementStartedModal } from '../modals'

export const RequestType = ({
    workplace,
    folders,
    appliedIndustry,
}: {
    workplace: any
    folders: any
    appliedIndustry: any
}) => {
    const [modal, setModal] = useState<any>(null)
    const [visibleRequestType, setVisibleRequestType] = useState(false)
    const [selectedRequestType, setSelectedRequestType] = useState<
        number | null
    >(0)

    const [interView, interViewResult] = useSendInterviewNotificationMutation()

    const { notification } = useNotification()

    useEffect(() => {
        if (interViewResult.isSuccess) {
            notification.success({
                title: 'Interview Assigned to Student',
                description: 'Interview Assigned to Student',
            })
        }
    }, [interViewResult])

    const onModalCancelClicked = () => {
        setModal(null)
    }

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
            primaryText: 'Waiting',
            secondaryText: 'for Workplace Response',
            color: 'text-info-light',
            onClick: (isCleared: any) => {
                if (workplace?.currentStatus === 'interview') {
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
            },
            status: 'awaitingWorkplaceResponse',
        },
        {
            primaryText: 'Meeting',
            secondaryText: 'with Workplace Supervisor (Orientation)',
            color: 'text-info-dark',
            onClick: () => {},
            status: 'appointmentBooked',
        },
        {
            primaryText: 'Agreement & Eligibility ',
            secondaryText: 'Checklist Pending',
            color: 'text-info',
            onClick: (isCleared: any) => {
                isCleared(false)
                // if (workplace?.currentStatus === '') {
                // } else {
                //     notification.error({
                //         title: 'First Approve the workplace',
                //         description:
                //             'Placement cannot start without approving the workplace',
                //     })
                // }
            },
            status: 'awaitingAgreementSigned',
        },
        {
            primaryText: 'Agreement & Eligibility ',
            secondaryText: 'Checklist Signed',
            color: 'text-success',
            onClick: () => {},
            status: 'AgreementSigned',
        },
        {
            primaryText: 'Placement Started',
            secondaryText: 'Placement Started',
            color: 'text-success-dark',
            onClick: (isCleared: any) => {
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
            status: 'placementStarted',
        },
        {
            primaryText: 'Completed',
            secondaryText: 'Completed',
            color: 'text-error',
            onClick: () => {},
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
            onClick: () => {},
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

    const isLoading = interViewResult.isLoading

    return (
        <div className="relative">
            {modal && modal}

            <div className="hidden">
                <SignAgreement
                    studentId={workplace?.student?.id}
                    appliedIndustryId={appliedIndustry?.id}
                />
            </div>
            <ShowErrorNotifications result={interViewResult} />
            <OutsideClickHandler
                onOutsideClick={() => {
                    setVisibleRequestType(false)
                }}
            >
                <div
                    className={`border border-dashed border-gray-400 rounded-lg w-56 px-4 py-1 flex items-center justify-between gap-x-1 cursor-pointer relative`}
                    onClick={() => {
                        if (workplace?.assignedTo) {
                            setVisibleRequestType(!visibleRequestType)
                        } else {
                            notification.warning({
                                title: 'Assign the workplace',
                                description:
                                    'Assign the workplace before changing status',
                            })
                        }
                    }}
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
                                    // if (findStatusIndex < i) {
                                    const isCleared = (clear = true) => {
                                        clear && setSelectedRequestType(i)
                                    }

                                    type.onClick(isCleared)
                                    // } else {
                                    //     notification.error({
                                    //         title: 'You already performed this action',
                                    //         description:
                                    //             'You already performed this action',
                                    //     })
                                    // }
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
