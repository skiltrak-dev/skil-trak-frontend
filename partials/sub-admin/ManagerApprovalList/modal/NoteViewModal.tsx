import { Modal, Typography } from '@components'
import React from 'react'

export const NoteViewModal = ({
    note,
    onCancel,
}: {
    note: string
    onCancel: () => void
}) => {
    return (
        <Modal
            onCancelClick={onCancel}
            showActions={false}
            title={'Note'}
            subtitle={'Note added by the coordinator.'}
        >
            <div className="max-w-3xl flex flex-col gap-y-3">
                <Typography variant="label">{note}</Typography>
            </div>
        </Modal>
    )
}
