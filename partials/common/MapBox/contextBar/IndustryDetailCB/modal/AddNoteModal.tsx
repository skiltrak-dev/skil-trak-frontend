import { ActionButton, Button, CreateNote, Modal } from '@components'
import React from 'react'

export const AddNoteModal = ({
    userId,
    viewNote,
    onCancel,
}: {
    viewNote: any
    userId: number
    onCancel: () => void
}) => {
    return (
        <div>
            <Modal
                title="Create Note"
                subtitle="Create Note"
                showActions={false}
                onCancelClick={onCancel}
            >
                <div className="pb-2 flex justify-end">
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            viewNote()
                        }}
                    >
                        View Note
                    </ActionButton>
                </div>

                <div className="h-[90vh] lg:h-[67vh] overflow-auto custom-scrollbar">
                    <CreateNote
                        onCancel={onCancel}
                        receiverId={Number(userId)}
                    />
                </div>
            </Modal>
        </div>
    )
}
