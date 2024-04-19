import { ActionButton, Typography } from '@components'
import {
    AssignStudentModal,
    UnAssignStudentModal,
} from '@partials/sub-admin/students/modals'
import { Student } from '@types'
import React, { ReactElement, useState } from 'react'

export const AssignToMeStudent = ({ student }: { student: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancelClicked = () => setModal(null)

    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <AssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onUnAssignStudentClicked = (student: Student) => {
        setModal(
            <UnAssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    return (
        <div>
            {modal}
            <ActionButton
                onClick={() => {
                    if (student?.subadmin) {
                        onUnAssignStudentClicked(student)
                    } else {
                        onAssignStudentClicked(student)
                    }
                }}
                simple
                variant="info"
            >
                {student?.subadmin ? 'Un-Assign' : 'Assign to me'}
            </ActionButton>
        </div>
    )
}
