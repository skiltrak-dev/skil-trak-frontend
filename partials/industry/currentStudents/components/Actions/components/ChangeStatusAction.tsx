import { useState } from 'react'

// components
import { Button } from '@components'

// query
import {
    useCompleteWorkplaceMutation,
    useTerminateWorkplaceMutation,
    useCancelWorkplaceMutation,
} from '@queries'

export const ChangeStatusAction = ({ industry }: any) => {
    const [changeStatus, setChangeStatus] = useState(false)

    // query
    const [completeWorkplace, completeWorkplaceResult] =
        useCompleteWorkplaceMutation()
    const [terminateWorkplace, terminateWorkplaceResult] =
        useTerminateWorkplaceMutation()
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceMutation()

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
        <div className="relative">
            <Button
                variant={'primary'}
                text={'CHANGE STATUS'}
                onClick={() => {
                    setChangeStatus(!changeStatus)
                }}
                loading={isLoading}
                disabled={isLoading}
            />
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
    )
}
