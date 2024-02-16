import { Typography } from '@components'
import { useNotification } from '@hooks'
import { useRequestType } from '@partials/common/StudentProfileDetail/hooks'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import OutsideClickHandler from 'react-outside-click-handler'

export const IndustryStatus = ({
    folders,
    workplace,
    appliedIndustry,
}: {
    folders: any
    workplace: any
    appliedIndustry?: any
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [selectedRequestType, setSelectedRequestType] = useState<
        number | null
    >(0)

    const { notification } = useNotification()

    const { modal, requestTypeActions } = useRequestType({
        folders,
        workplace,
        appliedIndustry,
    })

    const findStatusIndex = requestTypeActions.findIndex(
        (r) => r.status === workplace?.currentStatus
    )

    useEffect(() => {
        if (findStatusIndex) {
            setSelectedRequestType(findStatusIndex)
        }
    }, [findStatusIndex])

    return (
        <div className="flex flex-col gap-y-1.5">
            {modal}
            <Typography variant="label" medium>
                Industry Status
            </Typography>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setIsOpened(false)
                }}
            >
                <div className="w-40 mt-2 relative">
                    <div
                        onClick={() => {
                            if (workplace?.assignedTo) {
                                if (
                                    !appliedIndustry?.terminated ||
                                    !appliedIndustry?.isCompleted ||
                                    !appliedIndustry?.cancelled
                                ) {
                                    setIsOpened(!isOpened)
                                } else {
                                    notification.warning({
                                        title: 'Action cant perform',
                                        description: 'Action cant perform',
                                    })
                                }
                            } else {
                                notification.warning({
                                    title: 'Assign the workplace',
                                    description:
                                        'Assign the workplace before changing status',
                                })
                            }
                        }}
                        className="w-full relative cursor-pointer px-4 py-2.5 flex justify-evenly gap-x-2 rounded-md border border-[#128C7E] overflow-hidden"
                    >
                        <Typography
                            variant="small"
                            color="text-[#128C7E]"
                            semibold
                            uppercase
                        >
                            {
                                requestTypeActions[selectedRequestType as any]
                                    ?.primaryText
                            }
                        </Typography>

                        <IoIosArrowDown />
                    </div>
                    <div
                        className={`w-auto  bg-white shadow-md rounded-md z-10 absolute top-full left-0 overflow-auto custom-scrollbar transition-all duration-500 ${
                            isOpened ? 'max-h-72' : 'max-h-0'
                        }`}
                    >
                        {requestTypeActions.map((status, index) => (
                            <div
                                className={`px-2 border-b border-gray-100 py-2 w-full cursor-pointer hover:bg-gray-100 ${
                                    workplace?.currentStatus === status?.status
                                        ? 'bg-gray-200'
                                        : 'bg-white'
                                }`}
                                key={index}
                                onClick={() => {
                                    setIsOpened(false)
                                    if (findStatusIndex < index) {
                                        const isCleared = (clear = true) => {
                                            clear &&
                                                setSelectedRequestType(index)
                                        }

                                        status.onClick(isCleared)
                                    } else {
                                        notification.error({
                                            title: 'You already performed this action',
                                            description:
                                                'You already performed this action',
                                        })
                                    }
                                }}
                            >
                                <Typography variant="small" medium>
                                    {status.primaryText}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </OutsideClickHandler>
            {requestTypeActions[selectedRequestType as any]?.date && (
                <Typography>
                    <span className="text-[10px] font-semibold">
                        Status Updated :{' '}
                        {moment(
                            requestTypeActions[selectedRequestType as any]?.date
                        ).format('Do MMM YYYY')}
                    </span>
                </Typography>
            )}
        </div>
    )
}
