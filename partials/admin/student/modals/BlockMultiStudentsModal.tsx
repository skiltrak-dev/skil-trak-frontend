import { ActionAlert, ActionModal, Modal, MultiActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan, FaTimes } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const BlockMultiStudentsModal = ({
    student,
    onCancel,
    setResult,
}: {
    student: Student[]
    onCancel: Function
    setResult?: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onBlockMultiStudents, resultBulkAction } = useChangeStatus()

    const onConfirmClicked = () => {
        onBlockMultiStudents(student.map((id: any) => id?.user.id))
    }

    useEffect(() => {
        if (setResult) {
            setResult(resultBulkAction)
        }
    }, [resultBulkAction])

    useEffect(() => {
        if (resultBulkAction.isSuccess) {
            alert.error({
                title: `Student Blocked`,
                description: `Students has been blocked.`,
            })
            onCancel()
        }
        if (resultBulkAction.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for blocking Student was failed`,
            })
        }
    }, [resultBulkAction])

    return (
        <MultiActionModal
            variant={'error'}
            Icon={FaBan}
            description={'Are you sure you want to block all selected Students'}
            onCancel={onCancel}
            onConfirm={onConfirmClicked}
        />
    )
}
