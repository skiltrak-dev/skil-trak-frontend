import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
    status: any
}

export const ProgressStep = ({ status }: Props) => {
    const [industryCheckListStatus, setIndustryCheckListStatus] = useState<any>(
        []
    )

    // src={`/images/icons/placement-progress/checklist.png`}
    const progressStep = [
        {
            id: 1,
            title: 'Industry Checks',
            imageUrl: `/images/icons/placement-progress/checklist.png`,
            statusEnum: 'applied',
        },
        {
            id: 2,
            title: 'Case Officer Assigned',
            imageUrl: `/images/icons/placement-progress/digital-nomad.png`,
            statusEnum: 'caseOfficerAssigned',
        },
        {
            id: 3,
            title: 'Interview With Case Officer',
            imageUrl: `/images/icons/placement-progress/interview.png`,
            statusEnum: 'interview',
        },
        {
            id: 4,
            title: 'Appointment Booked',
            imageUrl: `/images/icons/placement-progress/appointment.png`,
            statusEnum: 'appointmentBooked',
        },
        {
            id: 5,
            title: 'Awaiting Workplace Response',
            imageUrl: `/images/icons/placement-progress/fast.png`,
            statusEnum: 'awaitingWorkplaceResponse',
        },
        {
            id: 6,
            title: 'Awaiting Agreement Sign',
            imageUrl: `/images/icons/placement-progress/contract.png`,
            statusEnum: 'awaitingAgreementSigned',
        },
        {
            id: 7,
            title: 'Agreement Signed',
            imageUrl: `/images/icons/placement-progress/contract.png`,
            statusEnum: 'AgreementSigned',
        },
        {
            id: 8,
            title: 'Placement Started',
            imageUrl: `/images/icons/placement-progress/goal.png`,
            statusEnum: 'placementStarted',
        },
    ]

    useEffect(() => {
        if (status) {
            setIndustryCheckListStatus((prev: any) => [...prev, status])
        }
    }, [status])

    const currentStatus = progressStep.findIndex(
        (item: any) => item.statusEnum === status
    )

    return (
        <>
            <div className="flex flex-col overflow-x-auto custom-scrollbar">
                <div className="mb-3 flex justify-between items-start gap-x-2">
                    {progressStep.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div className="flex flex-col items-center gap-y-1">
                                <div
                                    className={`w-12 h-12 bg-sky-50 overflow-hidden  rounded-full ${
                                        index <= currentStatus
                                            ? 'border-green-500 border-4'
                                            : 'border-gray-400 border-dashed border-2'
                                    }`}
                                >
                                    <Image
                                        className={`rounded-full ${
                                            index > currentStatus
                                                ? 'grayscale'
                                                : ''
                                        }`}
                                        src={item.imageUrl}
                                        width={48}
                                        height={48}
                                        alt={item.title}
                                    />
                                </div>

                                <p
                                    className={`${
                                        index <= currentStatus
                                            ? 'font-semibold text-gray-600'
                                            : 'text-gray-400'
                                    } text-[11px] text-center  w-[120px]`}
                                >
                                    {item?.title}
                                </p>
                            </div>
                            {index !== progressStep.length - 1 && (
                                <div
                                    className={`${
                                        index <= currentStatus
                                            ? 'border-orange-400'
                                            : 'border-gray-500'
                                    } w-full h-[1px] border border-dashed flex-shrink mt-4`}
                                >
                                    <div className="w-3" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}
