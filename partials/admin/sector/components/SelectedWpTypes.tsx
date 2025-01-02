import React, { useState } from 'react'
import { FaMinusCircle } from 'react-icons/fa'
import { AdminApi } from '@queries'
import { ActionButton, ShowErrorNotifications } from '@components'

export const SelectedWpTypes = ({ wpType }: { wpType: any }) => {
    const [showUnassign, setShowUnassign] = useState(false)

    const [remove, removeResult] = AdminApi.Courses.removeWpTypesFromCourse()

    const onRemoveClicked = () => {
        setShowUnassign(true)
    }
    const onCancelClicked = () => {
        setShowUnassign(false)
    }

    const onUnassignClick = () => {
        remove(wpType?.id)
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            {!showUnassign ? (
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm">{wpType?.name}</p>
                    </div>

                    <div>
                        <button
                            className="text-red-500 text-[11px] flex items-center gap-x-2 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-all
                    duration-300"
                            onClick={() => {
                                //  onRemove(course)
                                onRemoveClicked()
                            }}
                        >
                            <FaMinusCircle />
                            <span>Remove</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 p-1">
                    <p className="text-xs mb-2">
                        You are about to unassign workplace type{' '}
                        <span className="font-medium">{wpType?.name}</span>. Do
                        you wish to continue?
                    </p>

                    <div className="flex gap-x-1">
                        <ActionButton
                            variant="error"
                            onClick={onUnassignClick}
                            loading={removeResult.isLoading}
                            disabled={removeResult.isLoading}
                        >
                            Unassign
                        </ActionButton>
                        <ActionButton onClick={onCancelClicked}>
                            Cancel
                        </ActionButton>
                    </div>
                </div>
            )}
        </>
    )
}
