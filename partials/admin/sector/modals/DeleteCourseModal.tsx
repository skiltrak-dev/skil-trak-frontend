import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course } from '@types'
import { FaTrash } from 'react-icons/fa'

export const DeleteCourseModal = ({
    course,
    onCancel,
}: {
    course: Course
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.Courses.useRemoveMutation()

    const onConfirmClicked = async (course: Course) => {
        const res: any = await remove(course.id)
        if (res?.data) {
            notification.error({
                title: `Course Deleted`,
                description: `Course "${course.title}" has been deleted.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${course.title}". Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={course.title}
                actionObject={course}
                loading={removeResult.isLoading}
            />
        </>
    )
}
