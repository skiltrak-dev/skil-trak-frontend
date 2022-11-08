import { useEffect, useState } from 'react'

// Icons
import { IoMdArrowDropdown } from 'react-icons/io'

// components
import { Typography } from '@components'
import { requestType } from './requestTypeData'

// query
import { useSendInterviewNotificationMutation } from '@queries'

export const RequestType = ({ data }: { data: any }) => {
    const [visibleRequestType, setVisibleRequestType] = useState(false)
    const [selectedRequestType, setSelectedRequestType] = useState(0)

    const [interView, interViewResult] = useSendInterviewNotificationMutation()

    useEffect(() => {
        if (data?.caseOfficerAssigned) {
            setSelectedRequestType(1)
        }
        if (data?.interview) {
            setSelectedRequestType(2)
        }
        if (data?.awaitingWorkplaceResponse) {
            setSelectedRequestType(3)
        }
        if (data?.awaitingAgreementSigned) {
            setSelectedRequestType(5)
        }
        if (data?.AgreementSigned) {
            setSelectedRequestType(6)
        }
    }, [data])

    return (
        <div className="relative">
            <div
                className="border border-dashed border-gray-400 rounded-lg w-56 px-4 py-1 flex items-center justify-between gap-x-1 cursor-pointer"
                onClick={() => {
                    setVisibleRequestType(!visibleRequestType)
                }}
            >
                <div>
                    <Typography
                        variant={'label'}
                        color={requestType[selectedRequestType].color}
                    >
                        {requestType[selectedRequestType].primaryText}
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
                    {requestType.map((type, i) => (
                        <div
                            key={type.primaryText}
                            className="pb-2 cursor-pointer hover:bg-gray-100 px-2"
                            onClick={() => {
                                setSelectedRequestType(i)
                                setVisibleRequestType(false)
                                interView(data?.industry?.id)
                            }}
                        >
                            <Typography variant={'label'} color={type.color}>
                                {type.primaryText}
                            </Typography>
                            <Typography variant={'xs'} color={'text-gray-300'}>
                                {type.secondaryText}
                            </Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
