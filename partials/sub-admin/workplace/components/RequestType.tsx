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

// query
import { useSendInterviewNotificationMutation } from '@queries'
import OutsideClickHandler from 'react-outside-click-handler'
import { useNotification } from '@hooks'

export const RequestType = ({
    data,
    workplace,
}: {
    data: any
    workplace: any
}) => {
    // console.log('data', data.id)
    const [visibleRequestType, setVisibleRequestType] = useState(false)
    const [selectedRequestType, setSelectedRequestType] = useState(0)

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
            onClick: () => {
                interView(data?.id)
            },
            status: 'interview',
        },
        {
            primaryText: 'Waiting',
            secondaryText: 'for Workplace Response',
            color: 'text-info-light',
            onClick: () => {},
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
            onClick: () => {},
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
            secondaryText: '',
            color: 'text-success-dark',
            onClick: () => {},
            status: 'placementStarted',
        },
    ]

    const findStatusIndex = requestTypeActions.findIndex(
        (r) => r.status === workplace.currentStatus
    )

    useEffect(() => {
        setSelectedRequestType(findStatusIndex)

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
    }, [data])

    const isLoading = interViewResult.isLoading

    console.log('findStatusIndex', findStatusIndex)

    return (
        <div className="relative">
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
                                requestTypeActions[selectedRequestType].color
                            }
                        >
                            {
                                requestTypeActions[selectedRequestType]
                                    .primaryText
                            }
                        </Typography>
                        <Typography variant={'xs'} color={'text-gray-300'}>
                            {requestType[selectedRequestType].secondaryText}
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
                                        setSelectedRequestType(i)
                                        type.onClick()
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
