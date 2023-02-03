import React from 'react'

// components
import { ShowErrorNotifications, Modal } from '@components'

// types
import { Student } from '@types'

export const EditStudentDetail = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: Function
}) => {
    return (
        <div>
            <ShowErrorNotifications result={{}} />
            <Modal
                title={'Edit PassWord'}
                subtitle={'Edit Password'}
                onConfirmClick={onCancel}
                onCancelClick={onCancel}
            >
                <></>
            </Modal>
        </div>
    )
}
