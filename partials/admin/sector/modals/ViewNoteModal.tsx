import { Modal } from '@components'
import { Sector } from '@types'
import React from 'react'

export const ViewNoteModal = ({
    sector,
    onCancel,
}: {
    sector: Sector
    onCancel: () => void
}) => {
    return (
        <Modal
            title="View Sector Note"
            subtitle=""
            onCancelClick={onCancel}
            showActions={false}
        >
            ViewNoteModal
        </Modal>
    )
}
