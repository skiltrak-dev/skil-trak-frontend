import { ActionButton } from '@components'
import { Course } from '@types'
import { useState } from 'react'
import { FaMinusCircle } from 'react-icons/fa'

interface AssignedCourseProps {
    course: Course
    onRemove: Function
    result: any
}
export const AssignedCourse = ({
    course,
    result,
    onRemove,
}: AssignedCourseProps) => {
    const [showUnassign, setShowUnassign] = useState(false)

    const onRemoveClicked = () => {
        setShowUnassign(true)
    }
    const onCancelClicked = () => {
        setShowUnassign(false)
    }

    const onUnassignClick = () => {
        onRemove(course)
    }

    return !showUnassign ? (
        <div className="flex items-start justify-between">
            <div>
                <p className="text-xs text-gray-400">{course.code}</p>
                <p className="text-sm">{course.title}</p>
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
                You are about to unassign course{' '}
                <span className="font-medium">{course.title}</span>. Do you wish
                to continue?
            </p>

            <div className="flex gap-x-1">
                <ActionButton
                    variant="error"
                    onClick={onUnassignClick}
                    loading={result.isLoading}
                    disabled={result.isLoading}
                >
                    Unassign
                </ActionButton>
                <ActionButton onClick={onCancelClicked}>Cancel</ActionButton>
            </div>
        </div>
    )
}
