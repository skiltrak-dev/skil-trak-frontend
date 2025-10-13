import { ActionButton, AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { Course, SubAdmin, Rto } from '@types'
import { useState } from 'react'
import { FaMinusCircle } from 'react-icons/fa'

interface AssignedCourseProps {
    rto: Rto
    onRemove: Function
    removeResult: any
}
export const AssignedRto = ({
    rto,
    onRemove,
    removeResult,
}: AssignedCourseProps) => {
    const [showUnassign, setShowUnassign] = useState(false)

    const onRemoveClicked = () => {
        setShowUnassign(true)
    }
    const onCancelClicked = () => {
        setShowUnassign(false)
    }

    const onUnassignClick = () => {
        onRemove(rto)
    }

    return (
        <div className="border-t py-2">
            {!showUnassign ? (
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm">{rto.user.name}</p>
                        <p className="text-xs text-gray-400">
                            {rto.user.email}
                        </p>
                    </div>

                    <AuthorizedUserComponent
                        excludeRoles={[UserRoles.SUBADMIN]}
                    >
                        <div>
                            <button
                                className="text-red-500 text-[11px] flex items-center gap-x-2 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-all
           duration-300"
                                onClick={() => {
                                    onRemoveClicked()
                                }}
                            >
                                <FaMinusCircle />
                                <span>Remove</span>
                            </button>
                        </div>
                    </AuthorizedUserComponent>
                </div>
            ) : (
                <div className="p-1">
                    <p className="text-xs mb-2">
                        You are about to unassign sub-admin{' '}
                        <span className="font-medium">{rto.user.name}</span>. Do
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
        </div>
    )
}
