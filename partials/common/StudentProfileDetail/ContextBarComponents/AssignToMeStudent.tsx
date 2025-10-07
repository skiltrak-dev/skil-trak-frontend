import { ActionButton, Tooltip, Typography } from '@components'
import moment from 'moment'
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
    // Enable the action button only if assignToCoordinatorDate is within last 14 days.
    // If the date is missing or unparsable, keep the button enabled.
    const isWithin14Days = (() => {
        const dateStr = student?.assignToCoordinatorDate
        if (!dateStr) return true
        const assignedAt = moment(dateStr)
        if (!assignedAt.isValid()) return true
        return moment().diff(assignedAt, 'days') <= 14
    })()

    return (
        <div className="relative group">
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
                disabled={isWithin14Days}
            >
                {student?.subadmin ? 'Un-Assign' : 'Assign to me'}
            </ActionButton>

            {isWithin14Days ? (
                <Tooltip> Student cant unassign with in 14 days </Tooltip>
            ) : (
                ''
            )}
        </div>
    )
}
