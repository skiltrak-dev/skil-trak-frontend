import { ActionButton, Modal } from '@components'
import { StudentAvailability } from '@partials/common/workplace'
import React, { ReactElement, useState } from 'react'

export const ViewAvailability = ({ availability }: { availability: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onViewAvailability = () => {
        setModal(
            <Modal
                title={'Student Availability'}
                subtitle={'Student Availability'}
                onCancelClick={onCancel}
                showActions={false}
            >
                <StudentAvailability availability={availability} />
            </Modal>
        )
    }
    return (
        <div>
            {modal}
            <ActionButton variant="info" simple onClick={onViewAvailability}>
                VIEW AVAILABILITY
            </ActionButton>
        </div>
    )
}
