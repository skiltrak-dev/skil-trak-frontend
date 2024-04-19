import { ActionButton, Modal } from '@components'
import { StudentAvailability } from '@partials/common'
import React, { useState } from 'react'

export const Availability = ({ wpId }: { wpId: number }) => {
    const [modal, setModal] = useState<any | null>(null)

    const onCancel = () => {
        setModal(null)
    }

    const onViewAvailability = () => {
        setModal(
            <Modal
                title={'Student Availability'}
                subtitle={'Student Availability'}
                onCancelClick={onCancel}
                onConfirmClick={onCancel}
                confirmText={'Viewed'}
            >
                <StudentAvailability wpId={wpId} />
            </Modal>
        )
    }
    return (
        <div>
            {modal && modal}
            <ActionButton simple variant="info" onClick={onViewAvailability}>
                View Availability
            </ActionButton>
        </div>
    )
}
