import { ActionButton, Tooltip } from '@components'
import { UserRoles } from '@constants'
import {
    AssignStudentModal,
    UnAssignStudentModal,
} from '@partials/sub-admin/students/modals'
import { Student } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import { ReactElement, useState } from 'react'

export const AssignToMeStudent = ({ student }: { student: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

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
                disabled={
                    isWithin14Days &&
                    !!student?.subadmin &&
                    role !== UserRoles.ADMIN
                }
            >
                {student?.subadmin ? 'Un-Assign' : 'Assign to me'}
            </ActionButton>

            {isWithin14Days && student?.subadmin && role !== UserRoles.ADMIN ? (
                <Tooltip>
                    Students cannot be unassigned within 14 days of assignment
                </Tooltip>
            ) : (
                ''
            )}
        </div>
    )
}
