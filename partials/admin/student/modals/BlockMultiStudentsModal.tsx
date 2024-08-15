import { Student } from '@types'
import { useNotification } from '@hooks'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'
import { MultiActionModal, ShowErrorNotifications } from '@components'

export const BlockMultiStudentsModal = ({
    student,
    onCancel,
}: {
    student: Student[]
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const { onBlockMultiStudents, resultBulkAction } = useChangeStatus()

    const onConfirmClicked = () => {
        onBlockMultiStudents(student.map((id: any) => id?.user.id)).then(
            (res: any) => {
                if (res?.data) {
                    notification.error({
                        title: `Student Blocked`,
                        description: `Students has been blocked.`,
                    })
                    onCancel()
                }
            }
        )
    }

    return (
        <>
            <ShowErrorNotifications result={resultBulkAction} />
            <MultiActionModal
                variant={'error'}
                Icon={FaBan}
                description={
                    'Are you sure you want to block all selected Students'
                }
                onCancel={onCancel}
                onConfirm={onConfirmClicked}
                loading={resultBulkAction.isLoading}
            />
        </>
    )
}
