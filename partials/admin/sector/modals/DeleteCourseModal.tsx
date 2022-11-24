import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteCourseModal = ({
  course,
  onCancel,
}: {
  course: Course
  onCancel: Function
}) => {
  const { alert } = useAlert()
  const { notification } = useNotification()
  const [remove, removeResult] = AdminApi.Courses.useRemoveMutation()

  const onConfirmClicked = async (course: Course) => {
    await remove(course.id)
  }

  useEffect(() => {
    if (removeResult.isSuccess) {
      alert.error({
        title: `Course Deleted`,
        description: `Course "${course.title}" has been deleted.`,
      })
      onCancel()
    }
    if (removeResult.isError) {
      notification.error({
        title: 'Request Failed',
        description: `Your request for deleting Course was failed`,
      })
    }
  }, [removeResult])

  return (
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
    />
  )
}
