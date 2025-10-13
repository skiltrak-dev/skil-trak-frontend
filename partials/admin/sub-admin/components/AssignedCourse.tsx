import { Course } from '@types'
import { useState } from 'react'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { FaMinusCircle } from 'react-icons/fa'
import {
    ActionButton,
    AuthorizedUserComponent,
    ShowErrorNotifications,
} from '@components'
import { PulseLoader } from 'react-spinners'
import { UserRoles } from '@constants'

interface AssignedCourseProps {
    course: Course
    subAdminId: number
}
export const AssignedCourse = ({ course, subAdminId }: AssignedCourseProps) => {
    const [showUnassign, setShowUnassign] = useState<boolean>(false)
    const [unassignCourse, unassignCourseResult] =
        AdminApi.SubAdmins.useUnassignCourse()

    const { notification } = useNotification()

    const onRemoveClicked = () => {
        setShowUnassign(true)
    }
    const onCancelClicked = () => {
        setShowUnassign(false)
    }

    const onCourseRemove = async () => {
        await unassignCourse({
            id: subAdminId,
            course: course.id,
        }).then((res: any) => {
            if (res?.data) {
                notification.info({
                    title: 'Courses Unassigned',
                    description: 'Courses have been unassigned to Sub Admin',
                })
                setShowUnassign(false)
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={unassignCourseResult} />
            {!showUnassign ? (
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs text-gray-400">{course.code}</p>
                        <p
                            className={`text-sm ${
                                course.isSuperseded && 'line-through'
                            }`}
                        >
                            {course.title}
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
                                    //  onRemove(course)
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
                <div className="bg-gray-50 p-1">
                    <p className="text-xs mb-2">
                        You are about to unassign course{' '}
                        <span className="font-medium">{course.title}</span>. Do
                        you wish to continue?
                    </p>

                    <div className="flex gap-x-1">
                        <ActionButton
                            variant="error"
                            onClick={onCourseRemove}
                            loading={unassignCourseResult?.isLoading}
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
