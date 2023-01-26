import { useEffect, useState } from 'react'

// components
import { Button, ShowErrorNotifications } from '@components'

// query
import {
    useCompleteWorkplaceMutation,
    useTerminateWorkplaceMutation,
    useCancelWorkplaceMutation,
} from '@queries'
import { useNotification } from '@hooks'
import { MdArrowDropDown } from 'react-icons/md'

export const ChangeStatusAction = ({
    industry,
    workplace,
}: {
    industry: any
    workplace: any
}) => {
    const [changeStatus, setChangeStatus] = useState(false)

    // hooks
    const { notification } = useNotification()

    // query
    const [completeWorkplace, completeWorkplaceResult] =
        useCompleteWorkplaceMutation()
    const [terminateWorkplace, terminateWorkplaceResult] =
        useTerminateWorkplaceMutation()
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceMutation()

    useEffect(() => {
        if (completeWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Workplace Completed',
                description: 'Workplace Completed Successfully',
            })
        }
        if (terminateWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Student Terminated',
                description: 'Student Terminated Successfully',
            })
        }
        if (cancelWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Workplace Cancelled',
                description: 'Workplace Cancelled Successfully',
            })
        }
    }, [
        completeWorkplaceResult,
        terminateWorkplaceResult,
        cancelWorkplaceResult,
    ])

    const changeStatusAction = [
        {
            text: 'Complete',
            onClick: () => {
                completeWorkplace(industry.id)
            },
        },
        {
            text: 'Terminate',
            onClick: () => {
                terminateWorkplace(industry.id)
            },
        },
        {
            text: 'Cancel',
            onClick: () => {
                cancelWorkplace(industry.id)
            },
        },
    ]

    const isLoading =
        completeWorkplaceResult.isLoading ||
        terminateWorkplaceResult.isLoading ||
        cancelWorkplaceResult.isLoading
    return (
        <>
            <ShowErrorNotifications result={completeWorkplaceResult} />
            <ShowErrorNotifications result={terminateWorkplaceResult} />
            <ShowErrorNotifications result={cancelWorkplaceResult} />
            <div className="relative">
                <Button
                    variant={'primary'}
                    onClick={() => {
                        setChangeStatus(!changeStatus)
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    <span className="flex items-center gap-x-1">
                        CHANGE STATUS
                        <MdArrowDropDown
                            className={`${
                                changeStatus ? 'rotate-180' : ''
                            } text-lg transition-all`}
                        />
                    </span>
                </Button>
                {changeStatus && (
                    <div className="absolute z-20 mt-2 bg-white py-2 shadow-lg rounded w-full">
                        {changeStatusAction.map(({ text, onClick }) => (
                            <p
                                key={text}
                                className="text-xs text-gray-600 font-medium py-1 border-b border-gray-200 cursor-pointer px-2 hover:bg-gray-200"
                                onClick={() => {
                                    onClick()
                                    setChangeStatus(false)
                                }}
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
